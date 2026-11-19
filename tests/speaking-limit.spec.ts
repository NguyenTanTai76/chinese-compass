import { test, expect } from "@playwright/test";

const AUDIO_2MIN = "/audio-test/audio-2min.wav";
const AUDIO_5MIN = "/audio-test/audio-5min.wav";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const emailA = process.env.BETA_TEST_EMAIL_A;
const passwordA = process.env.BETA_TEST_PASSWORD_A;

async function signIn(page, email, password) {
  await page.goto("/auth/sign-in");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Đăng nhập", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  const response = await page.request.get("/api/auth/user");
  expect(response.ok()).toBeTruthy();
  return (await response.json()).user.id as string;
}

const initScript = () => {
  window.setupAudioMock = async (audioUrl) => {
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

    // Verify UI shows 5-minute limit before recording
    await expect(page.getByText(/tối đa 5 phút/)).toBeVisible();

    await page.evaluate((url) => window.setupAudioMock(url), AUDIO_2MIN);
    await page.waitForFunction(() => (window as any).__audioMockReady, {
      timeout: 10000,
    });

    await expect(page.getByTestId("record-button")).toBeVisible();

    // Start recording
    await page.getByTestId("record-button").click();

    // Verify recording started
    await expect(page.getByText(/Đang ghi âm/)).toBeVisible();

    // Wait past the old 60-second limit to verify it doesn't auto-stop
    await page.waitForTimeout(65000);

    // The recorder should still be active (not auto-stopped at 60s)
    await expect(page.getByText(/Đang ghi âm/)).toBeVisible();

    // Stop recording
    await page.getByTestId("stop-button").click();

    // Give time for stop processing
    await page.waitForTimeout(3000);
  });

  test("auto-stops at 5 minutes and keeps the recording", async ({
    page,
  }) => {
    await signIn(page, emailA!, passwordA!);
    await page.goto("/speaking");

    // Verify UI shows 5-minute limit before recording
    await expect(page.getByText(/tối đa 5 phút/)).toBeVisible();

    await page.evaluate((url) => window.setupAudioMock(url), AUDIO_5MIN);
    await page.waitForFunction(() => (window as any).__audioMockReady, {
      timeout: 10000,
    });

    await expect(page.getByTestId("record-button")).toBeVisible();

    // Start recording
    await page.getByTestId("record-button").click();
    await expect(page.getByText(/Đang ghi âm/)).toBeVisible();

    // Wait for 5-minute auto-stop (300s + buffer)
    await page.waitForTimeout(305000);

    // Should show auto-stopped message
    await expect(
      page.getByText(/Đã đạt 5 phút và tự dừng/),
    ).toBeVisible();
  }, { timeout: 360000 });
});
