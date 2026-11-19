import { expect, test, type Page } from "@playwright/test";

const localMock = process.env.BETA_LOCAL_MOCK === "1";

async function signIn(page: Page) {
  await page.goto("/auth/sign-in");
  await page.locator("#email").fill(process.env.BETA_TEST_EMAIL_A ?? "qa@example.test");
  await page.locator("#password").fill(process.env.BETA_TEST_PASSWORD_A ?? "test-only");
  await page.getByRole("button", { name: "Đăng nhập", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test("learner can plan, finish a lesson, change the plan and reach periodic form 2", async ({ page }) => {
  test.skip(!localMock, "Requires local mock Auth and Data API");
  await signIn(page);
  const panel = page.getByRole("region", { name: "Học tiếp" });
  await panel.getByRole("link", { name: "Tạo lịch 7 ngày" }).click();
  await page.getByRole("button", { name: "10 phút", exact: true }).click();
  await page.getByRole("button", { name: "Tạo lịch 7 ngày" }).click();
  await page.getByRole("link", { name: "Xem lịch 7 ngày" }).click();
  await expect(page.getByText("0/7 bài hoàn thành")).toBeVisible();
  await page.getByRole("link", { name: "Học tiếp", exact: true }).click();
  const previousTask = new URL(page.url()).searchParams.get("task");
  await page.getByRole("button", { name: "Đánh dấu đã học" }).click();
  await expect(page.getByText("Đã hoàn thành bài học")).toBeVisible();
  await page.getByRole("link", { name: "Về lịch học" }).click();
  await page.getByRole("link", { name: "Đổi lịch học" }).click();
  await page.getByText("Thi HSK / định kỳ", { exact: true }).click();
  await page.getByRole("button", { name: "30 phút", exact: true }).click();
  await page.getByText("Đọc", { exact: true }).click();
  await page.getByRole("button", { name: "Tạo lịch 7 ngày" }).click();
  await page.getByRole("link", { name: "Xem lịch 7 ngày" }).click();
  await expect(page.getByText(/1\/\d+ bài hoàn thành/)).toBeVisible();
  await page.getByRole("link", { name: "Trang chính", exact: true }).click();
  await expect(panel.getByText(/Thử thách tuần/)).toBeVisible();
  const next = await panel.getByRole("link", { name: "Mở bài học" }).getAttribute("href");
  expect(new URL(next!, page.url()).searchParams.get("task")).not.toBe(previousTask);
  await page.goto("/progress-test?lesson=periodic-hsk1-form-2");
  await expect(page.getByRole("heading", { name: "Kiểm tra định kỳ · Đề 2" })).toBeVisible();
  for (let index = 1; index <= 20; index++) {
    await expect(page.getByText(`Câu ${index}/20`, { exact: true })).toBeVisible();
    if (index >= 16) await expect(page.getByRole("button", { name: "Nghe câu hỏi" })).toBeVisible();
    await page.locator("section div.grid button").first().click();
    await page.getByRole("button", { name: index === 20 ? "Xem kết quả" : "Câu tiếp" }).click();
  }
  await expect(page.getByRole("heading", { name: "Lịch sử kiểm tra" })).toBeVisible();
  await expect(page.getByText(/Đề 2 · \d+\/20/)).toBeVisible();
});

test("advanced writing retains the draft on provider failure and displays feedback on retry", async ({ page }) => {
  test.skip(!localMock, "Requires local mock authentication");
  await signIn(page);
  await page.goto("/writing-practice");
  await page.getByLabel("Mức tham khảo").selectOption({ label: "HSK 7–9" });
  const draft = "我认为学生应该能够解释自己的选择。";
  await page.getByLabel("Bản nháp tiếng Trung").fill(draft);
  let calls = 0;
  await page.route("**/api/writing-feedback", route => {
    calls += 1;
    return calls === 1
      ? route.fulfill({ status: 503, json: { error: "AI tạm thời bận." } })
      : route.fulfill({ json: { strengths: "Có luận điểm.", revision: draft, explanation: "Cần thêm phản biện." } });
  });
  await page.getByRole("button", { name: "Gửi bài cho AI góp ý" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "AI tạm thời bận." })).toBeVisible();
  await expect(page.getByLabel("Bản nháp tiếng Trung")).toHaveValue(draft);
  await page.getByRole("button", { name: "Gửi bài cho AI góp ý" }).click();
  await expect(page.getByText("Cần thêm phản biện.")).toBeVisible();
  await page.goto("/reading?lesson=hsk79-disclosure");
  await expect(page.getByRole("heading", { name: "Công khai cách dùng công cụ" })).toBeVisible();
  await page.getByRole("button", { name: "Tập trung vào các khâu ảnh hưởng nhất tới kết luận" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Chính xác." })).toBeVisible();
});
