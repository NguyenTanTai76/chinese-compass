# Tình trạng beta Chinese Compass

Cập nhật 19/11/2026. Phạm vi mở beta 50 người là Nhập môn → HSK 1. Các cấp HSK 2–9, Hán Việt, lộ trình cá nhân, AI, thi thử và cộng đồng vẫn thuộc lộ trình năm mốc. Giữ nghiệm thu học liệu Nhập môn → HSK 1 đã bàn giao và dùng các mục dưới đây để theo dõi điều kiện phát hành bản tích hợp.

## Đã có

- Web/PWA có Pinyin, từ vựng SM-2, luyện viết, phản xạ, nghe chép, ngữ pháp, đọc hiểu, shadowing, Speaking và dashboard. PWA có manifest và service worker.
- Next.js đã khớp giữa manifest và lockfile ở `14.2.15`. Baseline thư mục chính trước tích hợp là `60baf6d`.
- Speaking có sáu tình huống và chế độ tự do, thu âm giới hạn 5 phút, STT, phản hồi theo lượt, tổng kết, giới hạn yêu cầu và xử lý dự phòng nhà cung cấp.

## Đã tích hợp

- Platform `85f3c19` gồm Auth/callback, tiến độ theo tài khoản, migration `002_beta_progress.sql`, kiểm thử RLS A/B và hợp đồng tích hợp. Kế thừa kết quả Platform đã bàn giao cho migration 001/002, SQL A/B local và Playwright mock. Phạm vi nghiệm thu staging nằm trong [BETA_PLATFORM_HANDOFF.md](BETA_PLATFORM_HANDOFF.md).
- Curriculum `d406063` và trạng thái sau khi nhập Platform ở `e1d79dd`. Đã giữ các thay đổi chưa commit, gồm trang `/intro`, liên kết bài theo ID, thao tác hoàn thành, lưu lịch có kiểm tra phiên bản và dashboard **Học tiếp**. Bốn worktree trong pool Kilo sạch tại `60baf6d`.
- Kiểm kê mã nguồn cho thấy 7 bài nhập môn, 20 câu xếp trình độ, 45 mục Hán Việt, 200 câu ngữ pháp, 31 bài đọc và 200 câu phản xạ. Ngân hàng ngữ pháp đạt mục tiêu 200 và bài đọc đạt mục tiêu 30. Số lượng này bao gồm học liệu HSK 2.
- Speaking dùng phần đã có trong thư mục chính. Worktree cũ `../chinese-compass-speaking` ở `beta/speaking` giữ bản thử nâng Next trong `package.json` và `package-lock.json` chưa commit. Hai file đó là phần đang dở KiloCode cần đối chiếu. Trong thư mục chính, bản sửa đang làm ở `tests/speaking-limit.spec.ts` thêm đăng nhập bằng tài khoản QA. Bản sửa này nằm ngoài checkpoint Platform/Curriculum. Các chỉnh sửa phát sinh ở Pinyin, Dictation, Reflex, Shadowing, Writing và `src/app/error.tsx` cũng giữ tại thư mục chính để người đang làm tiếp tục.

## Vừa làm

- Luồng xếp trình độ hoặc onboarding → lịch tuần 7 ngày → mở bài thật → đánh dấu đã học → dashboard **Học tiếp**. Với hồ sơ 10 phút chọn nghe–nói, lịch ưu tiên nghe chép và phản xạ. Với hồ sơ 30 phút chọn đọc và mục tiêu thi, lịch ưu tiên đọc và xếp bài kiểm tra vào ngày học cuối. Đổi lịch giữ bài đã hoàn thành, kể cả khi bỏ ngày đó khỏi lịch mới.
- Kết nối lịch với bài định kỳ HSK 1 gồm 8 câu từ vựng, 7 câu ngữ pháp và 5 câu nghe bằng TTS. Lượt thi lưu điểm gốc dưới mã `periodic-hsk1-v2`. Kết quả cũ giữ mã đề cũ. Đề mô phỏng HSK 1 40 câu và bài cuối đơn vị còn trong backlog.
- Mở 7 bài Nhập môn từ menu, sửa lỗi chữ trên onboarding/xếp trình độ và hiển thị âm Hán Việt cùng nghĩa tiếng Việt trên flashcard có mục đối chiếu.
- Build và typecheck của checkpoint đã đạt trên bản sao kiểm thử trong thư mục build. Lint các file thuộc checkpoint đạt. Playwright đạt 4 bài, bỏ qua A/B staging do thiếu tài khoản QA. Node đạt 3 bài tiến độ. Chromium với Auth/Data API giả lập đã đi hết luồng đăng nhập → tạo lịch → hoàn thành → đổi lịch → Học tiếp → nộp đủ 20 câu, gồm 5 lần phát tiếng Trung qua TTS giả lập.

## Chưa xác minh

- **Chặn mở beta 50** vì chưa có Supabase staging riêng được xác nhận và hai tài khoản QA. Cần kiểm tra Auth, Data API/RLS A/B, đổi tài khoản, reload và đồng bộ lịch giữa thiết bị. Dùng project dành riêng cho Chinese Compass theo phần nghiệm thu staging trong tài liệu Platform. Migration chỉ áp dụng sau khi xác nhận project và kiểm kê schema.
- Cần nghe giọng TTS tiếng Trung thật trên thiết bị beta, rà sư phạm phần học liệu bổ sung và kiểm tra cài PWA/offline trên desktop và Android.
- KiloCode chạy `npx playwright test speaking-limit.spec.ts` với phiên học viên và app đang chạy. Bộ spec kiểm tra giới hạn thu 5 phút bằng fixture. Lint toàn bộ thư mục test đã báo hai chỗ dùng `any` trong spec Speaking. Kiểm tra riêng bản ghi thật 2/5 phút đi qua STT → phản hồi → tổng kết, giữ câu cuối, chống gửi lặp và xử lý khi nhà cung cấp hết quota. Các điểm vào là `src/app/(app)/speaking/page.tsx`, `src/hooks/use-recorder.ts`, `src/app/api/speaking/` và `src/lib/ai/whisper.ts`.


### Backlog sau checkpoint

- Hoàn tất nghiệm thu staging và Speaking trước khi chốt các tính năng công bố cho beta.
- Theo dõi đề mô phỏng HSK 1, bài cuối đơn vị, tìm kiếm học liệu, đồng bộ SM-2 theo thiết bị, phản hồi lỗi và quan sát hệ thống trong các mốc tiếp theo.
- Bản kiểm kê trước tích hợp được lưu trong lịch sử Git. [BETA_READINESS.md tại baseline 60baf6d](https://github.com/NguyenTanTai76/chinese-compass/blob/60baf6df0c0fbdddd13c4ec7ced2080c8e53ab77/docs/BETA_READINESS.md)
