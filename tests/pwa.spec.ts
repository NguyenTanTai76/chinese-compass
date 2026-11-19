import { expect, test } from "@playwright/test";

test("mobile offline navigation shows the public fallback without caching account pages", async ({ page, context }) => {
  test.skip(process.env.BETA_PWA_PRODUCTION !== "1", "Requires a local production build with service workers enabled");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/auth/sign-in");
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  const manifest = await (await page.request.get("/manifest.webmanifest")).json();
  expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  expect(await page.evaluate(async () => {
    const signIn = await caches.match("/auth/sign-in");
    const dashboard = await caches.match("/dashboard");
    return !signIn && !dashboard;
  })).toBe(true);
  await context.setOffline(true);
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Đang ngoại tuyến" })).toBeVisible();
});
