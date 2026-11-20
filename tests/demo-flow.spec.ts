import { expect, test } from "@playwright/test";

test("demo: full flow — open plan, open HSK 1 lesson, grade card, mark done, reload, progress persists", async ({ page }) => {
  // 1. Mở trang demo (không cần đăng nhập)
  await page.goto("/demo");
  await expect(page.getByText(/Demo — Học tiếng Trung/)).toBeVisible();
  await expect(page.getByText(/Kế hoạch 7 ngày/)).toBeVisible();
  await page.waitForFunction(() => document.querySelectorAll("li").length > 0, { timeout: 10000 });

  // 2. Mở bài HSK 1 đầu tiên (click vào tiêu đề bài)
  const firstTask = page.getByRole("listitem").first();
  await expect(firstTask).toBeVisible();
  const firstTitle = await firstTask.textContent();

  // Click vào tiêu đề (Link trong item) để mở bài học
  const titleLink = firstTask.getByRole("link").first();
  await expect(titleLink).toBeVisible();
  await titleLink.click();
  await page.waitForURL(/demo\/vocab/, { timeout: 10000 });

  // 3. Ôn và chấm một thẻ
  await expect(page.getByRole("button", { name: /Lật thẻ/ })).toBeVisible({ timeout: 10000 });
  await page.getByRole("button", { name: /Lật thẻ/ }).click();
  await expect(page.getByRole("button", { name: /Quên/ })).toBeVisible();
  await page.getByRole("button", { name: /Quên/ }).click();
  await page.waitForTimeout(1000);

  // 4. Quay lại /demo và đánh dấu bài đầu tiên là hoàn thành (bấm nút check, không chuyển trang)
  await page.goto("/demo");
  await page.waitForFunction(() => document.querySelectorAll("li").length > 0, { timeout: 10000 });
  const checkBtn = page.locator("button[aria-label='Đánh dấu hoàn thành']").first();
  await expect(checkBtn).toBeVisible();
  await checkBtn.click({ force: true });

  // 5. Reload trang /demo
  await page.reload();
  await expect(page.getByText(/Kế hoạch 7 ngày/)).toBeVisible();

  // 6. Kiểm tra trạng thái hoàn thành vẫn còn (gạch nganh trên tiêu đề bài)
  const firstTaskAfter = page.getByRole("listitem").first();
  await expect(firstTaskAfter).toBeVisible();
  const doneLink = firstTaskAfter.getByRole("link").first();
  await expect(doneLink.locator("span.line-through")).toBeVisible();
});

test("demo: review progress persists after reload on vocab page", async ({ page }) => {
  // Mở bài vocab HSK 1 trực tiếp
  await page.goto("/demo/vocab?lesson=%E4%BD%A0%E5%A5%BD");
  await page.waitForTimeout(2000);

  // Lật thẻ và đánh giá "Quên"
  await expect(page.getByRole("button", { name: /Lật thẻ/ })).toBeVisible({ timeout: 10000 });
  await page.getByRole("button", { name: /Lật thẻ/ }).click();
  await expect(page.getByRole("button", { name: /Quên/ })).toBeVisible();
  await page.getByRole("button", { name: /Quên/ }).click();
  await page.waitForTimeout(1000);

  // Reload trang vocab
  await page.reload();
  await page.waitForURL(/demo\/vocab/, { timeout: 10000 });

  // Kiểm tra đã có ít nhất 1 từ trong reviews (hiển thị "đã ôn")
  await expect(page.locator("text=đã ôn")).toBeVisible({ timeout: 5000 });
});
