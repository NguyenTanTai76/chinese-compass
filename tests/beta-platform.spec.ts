import { expect, test, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import type { ProgressEvent } from "../src/lib/progress-model";
import { VOCAB } from "../src/lib/content/vocab";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const emailA = process.env.BETA_TEST_EMAIL_A;
const passwordA = process.env.BETA_TEST_PASSWORD_A;
const emailB = process.env.BETA_TEST_EMAIL_B;
const passwordB = process.env.BETA_TEST_PASSWORD_B;

async function signIn(page: Page, email: string, password: string) {
  await page.goto("/auth/sign-in");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Đăng nhập", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Học tiếp" })).toBeVisible();
  const response = await page.request.get("/api/auth/user");
  expect(response.ok()).toBeTruthy();
  return (await response.json()).user.id as string;
}

async function progress(page: Page) {
  const response = await page.request.get("/api/progress");
  expect(response.ok()).toBeTruthy();
  return (await response.json()).events as ProgressEvent[];
}

test("guest is sent to the real sign-in page and cannot read progress", async ({ page }) => {
  await page.goto("/dashboard?from=beta");
  await expect(page).toHaveURL(/\/auth\/sign-in\?callbackUrl=/);
  expect(new URL(page.url()).searchParams.get("callbackUrl")).toBe("/dashboard?from=beta");
  await expect(page.locator("#email")).toBeVisible();
  expect((await page.request.get("/api/progress")).status()).toBe(401);
  expect((await page.request.post("/api/speaking", { data: {} })).status()).toBe(401);
  expect((await page.request.post("/api/stt")).status()).toBe(401);
  expect((await page.request.post("/api/writing-feedback", { data: {} })).status()).toBe(401);
});

test("A/B isolation, switch in the same browser and reload from a clean browser", async ({ page, browser }) => {
  test.skip(!(url && anonKey && emailA && passwordA && emailB && passwordB),
    "Configure a local or confirmed staging Supabase and two QA accounts");
  test.setTimeout(120_000);

  const ownerA = await signIn(page, emailA!, passwordA!);
  const before = new Set((await progress(page)).map((event) => event.id));

  await page.goto("/vocab");
  await page.getByRole("button", { name: "Lật thẻ" }).click();
  await page.getByRole("button", { name: "Tạm ổn" }).click();

  await page.goto("/reading");
  const terms = page.locator("p.hanzi button");
  await expect(terms.first()).toBeVisible();
  const words = new Set((await progress(page)).flatMap((event) => event.kind === "save" ? [event.card.hanzi] : []));
  const knownWords = new Set(VOCAB.filter((word) => word.pinyin && word.meaningVi).map((word) => word.hanzi));
  const candidate = (await terms.allTextContents()).map((word) => word.trim())
    .find((word) => knownWords.has(word) && !words.has(word));
  expect(candidate, "QA account A needs a word it has not saved").toBeTruthy();
  await page.locator("p.hanzi").getByRole("button", { name: candidate!.trim(), exact: true }).first().click();
  await page.getByRole("button", { name: "Lưu flashcard" }).click();

  await page.goto("/progress-test");
  for (let index = 0; index < 20; index++) {
    await page.locator("main section").getByRole("button").filter({ hasNotText: /Nghe câu hỏi/ }).first().click();
    await page.getByRole("button", { name: index < 19 ? "Câu tiếp" : "Xem kết quả" }).click();
  }
  const scoreText = await page.getByText(/Đúng \d+\/20 câu/).textContent();
  const score = Number(scoreText?.match(/Đúng (\d+)\/20 câu/)?.[1]);

  await expect.poll(async () => {
    const added = (await progress(page)).filter((event) => !before.has(event.id));
    return [...new Set(added.map((event) => event.kind))].sort();
  }).toEqual(["review", "save", "session", "xp"]);

  const written = (await progress(page)).filter((event) => !before.has(event.id));
  const attempt = written.find((event) => event.kind === "session");
  expect(attempt).toMatchObject({
    kind: "session",
    result: { type: "test", score, total: 20, examId: "periodic-hsk1-v3", examKind: "periodic" },
  });
  const replay = await page.request.post("/api/progress/sync", { data: { owner: ownerA, events: written } });
  expect(replay.ok()).toBeTruthy();
  expect((await progress(page)).filter((event) => event.id === attempt!.id)).toHaveLength(1);

  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Đăng xuất" }).click();
  await expect(page).toHaveURL(/\/auth\/sign-in/);

  const ownerB = await signIn(page, emailB!, passwordB!);
  expect(ownerB).not.toBe(ownerA);
  await expect(page.getByRole("button", { name: /Đã đồng bộ/ })).toBeVisible();
  const aIds = new Set(written.map((event) => event.id));
  expect((await progress(page)).some((event) => aIds.has(event.id))).toBe(false);
  await expect(page.getByText(candidate!.trim(), { exact: true })).toHaveCount(0);
  expect((await page.request.post("/api/progress/sync", { data: { owner: ownerA, events: written } })).status()).toBe(409);

  const clientB = createClient(url!, anonKey!, { auth: { persistSession: false, autoRefreshToken: false } });
  expect((await clientB.auth.signInWithPassword({ email: emailB!, password: passwordB! })).error).toBeNull();
  const crossRead = await clientB.from("ProgressEvent").select("id").eq("user_id", ownerA);
  expect(crossRead.error).toBeNull();
  expect(crossRead.data).toEqual([]);
  const crossWrite = await clientB.from("ProgressEvent").insert({ user_id: ownerA, id: attempt!.id, event: attempt });
  expect(crossWrite.error?.code).toBe("42501");

  const clean = await browser.newContext();
  try {
    const freshPage = await clean.newPage();
    expect(await signIn(freshPage, emailA!, passwordA!)).toBe(ownerA);
    expect((await progress(freshPage)).find((event) => event.id === attempt!.id)).toEqual(attempt);
    await expect(freshPage.getByText(candidate!.trim(), { exact: true }).first()).toBeVisible();
    await freshPage.reload();
    await expect(freshPage.getByText(candidate!.trim(), { exact: true }).first()).toBeVisible();
  } finally {
    await clean.close();
    await clientB.auth.signOut({ scope: "local" });
  }
});
