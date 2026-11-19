import { test, expect, type Page } from "@playwright/test";

const AUDIO_2MIN = "/audio-test/audio-2min.wav";
const AUDIO_5MIN = "/audio-test/audio-5min.wav";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const emailA = process.env.BETA_TEST_EMAIL_A;
const passwordA = process.env.BETA_TEST_PASSWORD_A;

async function signIn(page: Page, email: string, password: string) {
  await page.goto("/auth/sign-in");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Đăng nhập", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  const response = await page.request.get("/api/auth/user");
  expect(response.ok()).toBeTruthy();
  return (await response.json()).user.id as string;
}

declare global {
  interface Window {
    setupAudioMock: (url: string) => Promise<void>;
    __audioMockReady?: boolean;
    webkitAudioContext?: typeof AudioContext;
  }
}

const initScript = () => {
  window.setupAudioMock = async (audioUrl: string) => {
    try {
      const response = await fetch(audioUrl);
      if (!response.ok) return;
      const arrayBuffer = await response.arrayBuffer();

      const AudioContext =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext({ sampleRate: 16000 });

      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      const dest = audioCtx.createMediaStreamDestination();
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(dest);

      const originalGUM = navigator.mediaDevices.getUserMedia.bind(
        navigator.mediaDevices,
      );
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        if (constraints && constraints.audio) {
          source.start(0);
          return dest.stream;
        }
        return originalGUM(constraints);
      };

      window.__audioMockReady = true;
    } catch (e) {
      console.error("audio mock setup failed:", e);
    }
  };
};

test.describe("speaking recorder 5-minute limit", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(initScript);
  });

  test.skip(!(url && anonKey && emailA && passwordA), "Configure a local or confirmed staging Supabase and a QA account");

  test("shows 5-minute limit in UI and does not cut recording at 60 seconds", async ({
    page,
  }) => {
    await signIn(page, emailA!, passwordA!);
    await page.goto("/speaking");
    await page.route("**/api/stt", route => route.fulfill({ json: { text: "我今天练习中文。最后一句是蓝色的。"} }));
    await page.clock.install();

    // Verify UI shows 5-minute limit before recording
    await expect(page.getByText(/tối đa 5 phút/)).toBeVisible();

    await page.evaluate((url) => window.setupAudioMock(url), AUDIO_2MIN);
    await page.waitForFunction(() => window.__audioMockReady, {
      timeout: 10000,
    });

    await expect(page.getByTestId("record-button")).toBeVisible();

    // Start recording
    await page.getByTestId("record-button").click();

    // Verify recording started
    await expect(page.getByText(/Đang ghi âm/)).toBeVisible();

    // Wait past the old 60-second limit to verify it doesn't auto-stop
    await page.clock.runFor(65000);

    // The recorder should still be active (not auto-stopped at 60s)
    await expect(page.getByText(/Đang ghi âm/)).toBeVisible();

    // Stop recording
    await page.getByTestId("stop-button").click();

    await expect(page.locator("textarea")).toHaveValue(/最后一句是蓝色的/);
    const requests: { idempotencyKey: string; transcript: string }[] = [];
    await page.route("**/api/speaking", async route => {
      requests.push(route.request().postDataJSON());
      if (requests.length === 1) {
        await route.fulfill({ status: 503, json: { error: "AI tạm thời bận" } });
        return;
      }
      await route.fulfill({
        json: { reply: { zh: "好的，请继续。", pinyin: "Hǎo de, qǐng jìxù.", vi: "Được, bạn nói tiếp nhé." } },
      });
    });
    const edited = "我正在练习中文。最后一句是蓝色的。";
    await page.locator("textarea").fill(edited);
    await page.getByTestId("send-transcript-button").click();
    await expect(page.getByText("AI tạm thời bận")).toBeVisible();
    await expect(page.locator("textarea")).toHaveValue(edited);
    await page.getByTestId("send-transcript-button").click();
    await expect(page.getByText(edited, { exact: true })).toHaveCount(1);
    await expect(page.getByText("好的，请继续。", { exact: true })).toHaveCount(1);
    expect(requests).toHaveLength(2);
    expect(requests[0].transcript).toBe(edited);
    expect(requests[0].idempotencyKey).toBe(requests[1].idempotencyKey);

    await page.route("**/api/speaking/summary", route => route.fulfill({
      json: { overview: "Đã hoàn thành lượt nói.", strengths: "Giữ đúng ý.", topErrors: [], practice: [], encouragement: "Hãy tiếp tục luyện tập." },
    }));
    await page.getByRole("button", { name: "Kết thúc buổi" }).click();
    await expect(page.getByRole("heading", { name: "Tổng kết buổi luyện" })).toBeVisible();
  });

  test("auto-stops at 5 minutes and keeps the recording", async ({
    page,
  }) => {
    await signIn(page, emailA!, passwordA!);
    await page.goto("/speaking");
    await page.route("**/api/stt", route => route.fulfill({ json: { text: "我今天练习中文。最后一句是蓝色的。"} }));
    await page.clock.install();

    // Verify UI shows 5-minute limit before recording
    await expect(page.getByText(/tối đa 5 phút/)).toBeVisible();

    await page.evaluate((url) => window.setupAudioMock(url), AUDIO_5MIN);
    await page.waitForFunction(() => window.__audioMockReady, {
      timeout: 10000,
    });

    await expect(page.getByTestId("record-button")).toBeVisible();

    // Start recording
    await page.getByTestId("record-button").click();
    await expect(page.getByText(/Đang ghi âm/)).toBeVisible();

    // Wait for 5-minute auto-stop (300s + buffer)
    await page.clock.runFor(300000);

    // Should show auto-stopped message
    await expect(
      page.getByText(/Đã đạt 5 phút và tự dừng/),
    ).toBeVisible();
    await page.getByTestId("send-recording-button").click();
    await expect(page.locator("textarea")).toHaveValue(/最后一句是蓝色的/);
  });
});
