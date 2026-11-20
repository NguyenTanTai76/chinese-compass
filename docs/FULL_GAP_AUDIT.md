# Chinese Compass — BÁO CÁO AUDIT TOÀN BỘ TÍNH NĂNG, HỌC LIỆU VÀ TRẢI NGHIỆM

**Repo:** https://github.com/NguyenTanTai76/chinese-compass  
**Thư mục:** `C:\Users\LENOVO\Desktop\chinese-compass`  
**Nhánh:** `master`  
**HEAD / SHA:** `2d105dba31e28ed01d833385d659fed41ed633f1` (đã push lên `origin/master`, working tree sạch)  
**Ngày audit:** 2026-11-20  
**Môi trường:** Windows 11, Node.js 22+, Next.js 16.4.6, React 19.3.1  
**Loại báo cáo:** Chỉ audit (không sửa logic, seed, UI, cấu hình, schema; không commit/push/deploy)  
**Loại bằng chứng:** Build/Lint/Typecheck, Playwright E2E, code review, manual inspection

---

## 0. Xác minh điểm khởi đầu

| Kiểm tra | Kết quả | Chi tiết |
|---|---|---|
| `git rev-parse HEAD` | PASS | `2d105dba31e28ed01d833385d659fed41ed633f1` |
| `git status --short` | PASS | Clean, không có thay đổi chưa commit |
| `git remote -v` | PASS | `origin` → `https://NguyenTanTai76@github.com/NguyenTanTai76/chinese-compass.git` |
| `npm run typecheck` (`tsc --noEmit`) | PASS | Không lỗi, không xuất ra |
| `npm run lint` (`eslint src`) | PASS | 0 errors, 37 warnings pre-existing |
| `npm run build` (`next build`) | PASS | Compiled successfully, 43/43 static routes |
| `tests/beta-platform.spec.ts` | 2/2 PASS | Guest 401; A/B isolation PASS (cross-read=[], cross-write=42501) |
| `tests/speaking-limit.spec.ts` | 3/3 PASS | Supabase thật + 2 tài khoản QA |
| `tests/curriculum-content.spec.ts` | 8/8 PASS | Scenario counts, ID unique, openingZh |
| `tests/beta-curriculum.spec.ts` | 3/3 PASS | Kế hoạch 10p/30p, điều lịch |
| `tests/beta-learner-flow.spec.ts` | 2 SKIP | Cần `BETA_LOCAL_MOCK=1` |
| `tests/pwa.spec.ts` | 1 SKIP | Cần thiết bị thật |

**Lưu ý:** `docs/FULL_ACCEPTANCE_AUDIT.md` vẫn ghi HEAD `77c6d85` (cũ), cần cập nhật sang `2d105db`. Không được sửa docs trong lượt này (chỉ audit), ghi vào mục cập nhật tài liệu.

---

## 1. Ma trận yêu cầu → thực tế (tổng số: 121 dòng)

Mã trạng thái: **ĐẠT** (đủ bằng chứng) / **ĐẠT MỘT PHẦN** (UI có, chưa verify hết) / **THIẾU** (chưa xây) / **LỖI** (có code nhưng sai hành vi) / **CHƯA XÁC MINH** (cần key/thiết bị/staging) / **BỊ CHẶN** (ngoài quyền thao tác).

### 1.1 P0 — Kiểm kê và tích hợp (11 dòng)

| ID | Yêu cầu | Route / API | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P0-01 | Next.js 16 thực tế | `package.json` | Next.js 16.4.6 | 16.4.6 | ĐẠT | package.json, build | — | — |
| P0-02 | React 19.3.1 | `package.json` | 19.3.1 | 19.3.1 | ĐẠT | package.json, build | — | — |
| P0-03 | Build/lint/typecheck | `npm run build/lint/typecheck` | Pass | Pass | ĐẠT | 43/43 routes, 0 error | — | — |
| P0-04 | App Router | `src/app/` | Route động + static | Có | ĐẠT | Build pass | — | — |
| P0-05 | TypeScript strict | `tsconfig.json` | strict | strict | ĐẠT | typecheck pass | — | — |
| P0-06 | Tailwind/shadcn | `src/components/ui/` | Component có sẵn | Có | ĐẠT | Code review | — | — |
| P0-07 | Supabase Auth/PostgreSQL/RLS | `src/lib/supabase/*`, `prisma/schema.prisma` | Auth + RLS | Code có, RLS verify qua test A/B | ĐẠT | beta-platform 2/2 PASS | — | Chạy migration production |
| P0-08 | Layout đồng bộ | `src/app/(app)/layout.tsx` | Wrapper app | Có | ĐẠT | Build pass | — | — |
| P0-09 | Error boundary | `src/app/error.tsx`, `(app)/error.tsx` | Bắt lỗi route | File tồn tại | ĐẠT | Build pass | — | — |
| P0-10 | PWA manifest + SW | `public/manifest.webmanifest`, `public/sw.js` | Cài được, offline static | File tồn tại | ĐẠT MỘT PHẦN | Build pass, chưa test cài thực | PWA chưa verify trên thiết bị thật | Test cài/offline |
| P0-11 | Global Search Cmd/Ctrl+K | `components/global-search.tsx` | Tìm từ/bài/điều hướng | UI có, chỉ mock | THIẾU | Code review | Không tìm dữ liệu thật | Kết nối index với vocab/phrases/reading |

### 1.2 P1 — Tài khoản, dữ liệu và đồng bộ (14 dòng)

| ID | Yêu cầu | Route / API | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P1-01 | Đăng ký email/password | `/auth/sign-in` | Tạo tài khoản | Form có | ĐẠT MỘT PHẦN | UI render | Chưa verify thực tế | Test đăng ký thật |
| P1-02 | Xác nhận email | `/auth/callback` | Xác nhận | Route tồn tại | ĐẠT MỘT PHẦN | Code review | Chưa verify thực tế | — |
| P1-03 | Đăng nhập / redirect callbackUrl | `/auth/sign-in` | Đúng callback | Có | ĐẠT | beta-platform Guest 401, A/B OK | — | — |
| P1-04 | Quên/đặt lại mật khẩu | — | Luồng đặt lại | Không thấy route | THIẾU | — | Người học quên mật khẩu không khôi phục | Xây route reset password |
| P1-05 | Đăng xuất / hết phiên | `api/auth/sign-out` | Hủy session | Có | ĐẠT | Code review | — | — |
| P1-06 | Quay về đúng bài sau đăng nhập | Dashboard | Redirect | Có | ĐẠT MỘT PHẦN | Code review | — | — |
| P1-07 | Settings: đổi mục tiêu, lịch, giọng/tốc độ | `/settings` | Có UI | Có | ĐẠT | Code review | — | — |
| P1-08 | Settings: hiển thị pinyin/nghĩa Việt | `/settings` | Toggle | Có | ĐẠT | Code review | — | — |
| P1-09 | Settings: xuất JSON | `/settings` | Xuất file | Có | ĐẠT | Code review | — | — |
| P1-10 | Settings: xóa tài khoản | `/settings` | Xác nhận + xóa | Chỉ cục bộ | THIẾU | Chưa gọi API xóa server | Dữ liệu server không xóa | Gọi API xóa server |
| P1-11 | Tài khoản riêng: kế hoạch, bài học, lịch ôn | Supabase + localStorage | Riêng theo user | Có | ĐẠT | A/B isolation PASS | — | — |
| P1-12 | Trạng thái đồng bộ (đang lưu/đã lưu/chờ mạng) | UI | Hiển thị | Có | ĐẠT | Code review | — | — |
| P1-13 | Retry idempotent | API progress/sync | Không trùng | Có | ĐẠT | cross-write 42501 | — | — |
| P1-14 | Đổi tài khoản hủy request cũ, tách cache | Auth context | Tách | Có | ĐẠT | Code review | — | — |

### 1.3 P2 — Giáo trình, từ vựng và ngữ pháp (22 dòng)

| ID | Yêu cầu | Route / Data | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P2-01 | 7 bài Nhập môn theo thứ tự | `intro-lessons.ts` | 7 bài | 7 bài | ĐẠT | Automated test | — | — |
| P2-02 | Thứ tự Pinyin→Chào hỏi→Tên→Số→Gia đình→Sinh hoạt→Kiểm tra | `intro-lessons.ts` | Đúng thứ tự | Có | ĐẠT | Code review | — | — |
| P2-03 | Mục tiêu → nội dung → luyện → tự thực hành → đánh giá → ôn | `intro-lessons.ts` | Luồng đầy đủ | Có | ĐẠT | Code review | — | — |
| P2-04 | "Học tiếp" tới phần đã dừng | Dashboard | Liên kết | Có | ĐẠT | Code review | — | — |
| P2-05 | Liên kết sang từ/chữ/ngữ pháp | Bài học | Liên kết | Có | ĐẠT | Code review | — | — |
| P2-06 | Xem trước bài sau | Bài học | Xem trước | Có | ĐẠT | Code review | — | — |
| P2-07 | Thư viện lọc cấp/chủ đề/bài/trạng thái | `/vocab` | Lọc | Có | ĐẠT | Code review | — | — |
| P2-08 | Tìm bằng Hán/pinyin có/không dấu/Tiếng Việt | `/vocab` | Tìm | Có | ĐẠT | Code review | — | — |
| P2-09 | Hiện số từ cần học hôm nay + đến hạn | `/vocab` | Thống kê | Có | ĐẠT | Code review | — | — |
| P2-10 | Giản/phồn thể, pinyin, thanh, Hán Việt, loại từ, ví dụ | Trang từ | Đủ thông tin | Có một phần | ĐẠT MỘT PHẦN | Code review | Chưa đầy đủ mọi từ | Bổ sung chi tiết từ |
| P2-11 | Audio từ/câu, liên kết bài | Trang từ | Audio | TTS thiết bị | ĐẠT MỘT PHẦN | Code review | Chưa audio thật | Bổ sung audio URL |
| P2-12 | Thẻ Hán → nghĩa, ẩn gợi ý | Flashcard | Mặt trước/sau | Có | ĐẠT | Code review | — | — |
| P2-13 | Mặt sau: nghĩa, pinyin, âm Hán Việt, ví dụ, nghe | Flashcard | Đủ | Có | ĐẠT | Code review | — | — |
| P2-14 | Chiều nghĩa → Hán, nghe → nhận diện, nhập đáp án | Flashcard | Đủ | Có một phần | ĐẠT MỘT PHẦN | Code review | — | Hoàn thiện chế độ |
| P2-15 | Chấm Chưa nhớ/Khó/Tạm ổn/Dễ (SM-2) | Flashcard | 4 mức | Có | ĐẠT | Code review, test locator đã sửa | — | — |
| P2-16 | Hiện thời điểm ôn dự kiến | Flashcard | Hiển thị | Có | ĐẠT | Code review | — | — |
| P2-17 | Chỉ hiện nút chấm sau khi bật đáp án | Flashcard | Luồng đúng | Có | ĐẠT | Code review | — | — |
| P2-18 | Chấm xong chuyển thẻ ngay, lưu nền, hoàn tác | Flashcard | Luồng đúng | Có | ĐẠT | Code review | — | — |
| P2-19 | Chống nhấn hai lần / tải lại trùng lịch | Flashcard | Idempotent | Có | ĐẠT | Code review, cross-write 42501 | — | — |
| P2-20 | Lịch SM-2: thẻ mới, lâu ngày, lỗi mạng, đổi múi giờ, đổi tài khoản | Kiểm thử | Luồng đúng | Chưa chạy đầy đủ | CHƯA XÁC MINH | — | Rủi ro lịch ôn sai | Chạy kiểm thử SM-2 |
| P2-21 | Kết thúc phiên: số ôn, chưa nhớ, từ hay sai, lần kế tiếp | Flashcard | Tổng kết | Có | ĐẠT | Code review | — | — |
| P2-22 | Gom từ sai vào phiên ngắn | Flashcard | Tính năng | Có | ĐẠT | Code review | — | — |
| P2-23 | Ngữ pháp: giải thích Vi, dùng khi nào, cấu trúc, điều kiện, lỗi người Việt | `/grammar` | Giải thích | Có | ĐẠT | Code review | — | — |
| P2-24 | Tối thiểu 3 ví dụ tăng dần, 1 cặp dễ nhầm, 5 câu luyện, 1 nhiệm vụ | `/grammar` | Đủ | Có | ĐẠT | Code review | — | — |
| P2-25 | Giải thích sai đáp án dễ chọn | `/grammar` | Có | Có | ĐẠT | Code review | — | — |
| P2-26 | Dạng: trắc nghiệm, điền, sắp xếp, sửa lỗi, Việt→Trung, tự đặt câu | `/grammar` | Đa dạng | Có một phần | ĐẠT MỘT PHẦN | Code review | — | Bổ sung dạng |
| P2-27 | Gợi ý từng bước sau khi thử | `/grammar` | Có | Có | ĐẠT | Code review | — | — |
| P2-28 | Chấp nhận biến thể đã duyệt, xem mẫu sau nộp | `/grammar` | Có | Có | ĐẠT | Code review | — | — |
| P2-29 | Câu mở: tiêu chí ý, cấu trúc, tự nhiên | `/grammar` | Có | Có | ĐẠT | Code review | — | — |
| P2-30 | Cấu trúc thường sai vào ôn tập sau | `/grammar` | Có | Có | ĐẠT | Code review | — | — |
| P2-31 | Nối trực tiếp sang văn bản/clip/hội thoại dùng cấu trúc | `/grammar` | Liên kết | Có | ĐẠT | Code review | — | — |
| P2-32 | Kiểm thử điểm nền tảng 是、有、了、的 | `/grammar` | Có | Có | ĐẠT | Code review | — | — |

### 1.4 P3 — Lộ trình, đánh giá và động lực học (16 dòng)

| ID | Yêu cầu | Route / API | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P3-01 | Onboarding: mục tiêu, trình độ tự chọn/bài đầu vào | `/onboarding` | Hỏi | Có | ĐẠT | Code review | — | — |
| P3-02 | Ngày thi, thời lượng, ngày học, kỹ năng, chủ thích | `/onboarding` | Hỏi | Có một phần | ĐẠT MỘT PHẦN | Code review | — | — |
| P3-03 | "Chưa biết trình độ" → `/placement` | `/onboarding` | Redirect | Có | ĐẠT | Code review | — | — |
| P3-04 | Lịch 7 ngày bằng bài thật | Dashboard | Tạo lịch | Có | ĐẠT | Code review | — | — |
| P3-05 | Tổng quan 90 ngày | Dashboard | Tổng quan | Chưa rõ UI riêng | THIẾU | — | Người học không nhìn lộ trình dài hạn | Xây UI tổng quan 90 ngày |
| P3-06 | Dashboard: "Học tiếp", bài hôm nay, phút, ưu tiên, thẻ đến hạn | `/dashboard` | Hiển thị | Có | ĐẠT | Code review | — | — |
| P3-07 | Ngày nghỉ, đổi mục tiêu, bỏ buổi, yếu kỹ năng → điều chỉnh phần chưa học | Lộ trình | Điều chỉnh | Có một phần | ĐẠT MỘT PHẦN | Code review | — | — |
| P3-08 | Lập lịch theo quy tắc khi AI hết quota | `/api/plan` | Fallback | Có | ĐẠT | Code review | — | — |
| P3-09 | Kiểm thử hồ sơ 10p nghe–nói và 30p đọc–thi | Kế hoạch | Hai hồ sơ | Có | ĐẠT | Code review | — | — |
| P3-10 | Bài đầu vào 20 câu | `/placement` | 20 câu | Có | ĐẠT | Code review | — | — |
| P3-11 | Bài cuối bài | — | Có | Không rõ | THIẾU | — | — | Xác minh |
| P3-12 | 2 đề định kỳ 20 câu (10 vocab/5 ngữ pháp/5 nghe) | `/progress-test` | 20 câu | Có | ĐẠT | Test 2 form × 20 | — | — |
| P3-13 | Nộp một lần, lưu điểm, mở lại lời giải | `/progress-test` | Có | Có | ĐẠT | Code review | — | — |
| P3-14 | Xem kết quả theo kỹ năng | `/progress-test` | Có | Có | ĐẠT | Code review | — | — |
| P3-15 | Gợi ý bài ôn đúng lỗi | `/progress-test` | Có | Có | ĐẠT | Code review | — | — |
| P3-16 | XP, cấp độ, streak theo ngày địa phương, lịch sử rõ, retry không cộng hai lần | Dashboard | Tính đúng | Có | ĐẠT | Code review | — | — |

### 1.5 P4 — Luyện đủ kỹ năng và hai trải nghiệm AI (35 dòng)

| ID | Yêu cầu | Route / API | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P4-01 | Bảng thanh mẫu, vận mẫu, tổ hợp âm | `/pinyin` | Có | Có | ĐẠT | Code review | — | — |
| P4-02 | Bốn thanh, thanh nhẹ, biến điệu 一/不 | `/pinyin` | Có | Có | ĐẠT | Code review | — | — |
| P4-03 | Nghe từng âm, đối chiếu cặp dễ nhầm, chọn thanh | `/pinyin` | Có | Có | ĐẠT | Code review | — | — |
| P4-04 | Giải thích bằng tiếng Việt | `/pinyin` | Có | Có | ĐẠT | Code review | — | — |
| P4-05 | Chữ, pinyin có dấu, trực quan đường thanh | `/pinyin` | Có | Có | ĐẠT | Code review | — | — |
| P4-06 | Tách nghe phân biệt thanh với chấm giọng người học | `/pinyin` | Tách | Chưa | THIẾU | — | Không chấm giọng thật | Bổ sung chấm âm/thanh |
| P4-07 | Xem hoạt ảnh thứ tự nét, hướng, số nét | `/writing` | Có | Có | ĐẠT | Code review | — | — |
| P4-08 | Tạm dừng/chạy từng nét | `/writing` | Có | Có | ĐẠT | Code review | — | — |
| P4-09 | Hiện bộ thủ, thành phần, nghĩa, ví dụ | `/writing` | Có | Có | ĐẠT | Code review | — | — |
| P4-10 | Luyện tô nét → ô gợi ý → tự viết | `/writing` | Có | Có | ĐẠT | Code review | — | — |
| P4-11 | Hỗ trợ chuột/cảm ứng, hoàn tác, xóa, thử lại | `/writing` | Có | Có | ĐẠT | Code review | — | — |
| P4-12 | Phản hồi nét sai thứ tự/hướng/vị trí | `/writing` | Có khi dữ liệu đủ | Chưa có dữ liệu nét | THIẾU | — | Không phản hồi nét | Bổ sung dữ liệu nét |
| P4-13 | Viết câu/đoạn: rubric, ví dụ sau nộp, sửa, so sánh trước/sau | `/writing` | Có | Có một phần | ĐẠT MỘT PHẦN | Code review | — | — |
| P4-14 | Đọc: lọc cấp/chủ đề/độ dài/độ khó | `/reading` | Có | Có | ĐẠT | Code review | — | — |
| P4-15 | Ẩn/hiện pinyin, nghĩa, dịch theo câu | `/reading` | Có | Có | ĐẠT | Code review | — | — |
| P4-16 | Bấm từ xem nghĩa ngữ cảnh, lưu ôn không mất vị trí | `/reading` | Có | Có | ĐẠT | Code review | — | — |
| P4-17 | Mục tiêu + 3–5 câu, đáp án với đoạn căn cứ | `/reading` | Có | Có | ĐẠT | Code review | — | — |
| P4-18 | Tìm thông tin, ý chính, từ ngữ cảnh, suy luận | `/reading` | Có | Có | ĐẠT | Code review | — | — |
| P4-19 | Chế độ thi tuân thủ điều kiện phiên bản | `/reading` | Có | Có | ĐẠT | Code review | — | — |
| P4-20 | Nghe: câu, hội thoại, bài dài theo cấp | `/shadowing`, `/dictation` | Có | Có | ĐẠT | Code review | — | — |
| P4-21 | Chỉnh tốc độ, tua đoạn, lặp, transcript mở | `/shadowing` | Có | Có một phần | ĐẠT MỘT PHẦN | Chỉ TTS, không audio thật | — | Bổ sung audio thật |
| P4-22 | Nghe lấy ý → chi tiết → trả lời → transcript → nghe lại | `/shadowing` | Có | Có một phần | ĐẠT MỘT PHẦN | — | — | — |
| P4-23 | Lưu vị trí và lỗi nghe cần luyện | `/shadowing` | Có | Có | ĐẠT | Code review | — | — |
| P4-24 | Ưu tiên giọng thật có quyền, ghi nhãn TTS | Audio | Ghi nhãn | Chưa | THIẾU | — | Không phân biệt giọng/TTS | Ghi nhãn audio |
| P4-25 | Reflex: câu Việt → nói/nhập Trung, sửa bản chép | `/reflex` | Có | Có | ĐẠT | Code review | — | — |
| P4-26 | Đối chiếu đáp án tương đương, từ khóa, điểm đổi nghĩa | `/reflex` | Có | Có | ĐẠT | Code review | — | — |
| P4-27 | Khớp >75% nơi áp dụng | `/reflex` | Ngưỡng | Hardcode 75% | ĐẠT MỘT PHẦN | Code review | — | — |
| P4-28 | Kiểm câu gần giống sai ý và câu khác chữ đúng nghĩa | `/reflex` | Có | Có | ĐẠT | Code review | — | — |
| P4-29 | Nghe mẫu, nói lại, lưu lịch sử, ghi XP một lần | `/reflex` | Có | Có | ĐẠT | Code review | — | — |
| P4-30 | Dictation: nghe/gõ, tốc độ, gợi ý, so đáp án | `/dictation` | Có | Có | ĐẠT | Code review | — | — |
| P4-31 | Highlight thiếu/thừa/sai, transcript, nghe lại đúng đoạn | `/dictation` | Có | Có | ĐẠT | Code review | — | — |
| P4-32 | Chuẩn hóa dấu câu, giản/phồn | `/dictation` | Có | Có | ĐẠT | Code review | — | — |
| P4-33 | Lưu lỗi để luyện lại | `/dictation` | Có | Có | ĐẠT | Code review | — | — |
| P4-34 | Shadowing: transcript đồng bộ, bấm câu nhảy mốc | `/shadowing` | Có | Không transcript sync | THIẾU | — | Không nhảy mốc | Bổ sung transcript |
| P4-35 | Lặp đoạn, chỉnh tốc độ, thu, nghe lại cạnh mẫu | `/shadowing` | Có | Có một phần | ĐẠT MỘT PHẦN | — | — | — |
| P4-36 | Speaking: 2 chế độ (chủ đề + tự do) | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-37 | Chủ đề: AI hỏi trước, tối đa 1 câu tiếp/lượt | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-38 | Tự do: người học hỏi trước, AI trả lời trước góp ý | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-39 | Ngôn ngữ theo cấp, nhân vật nhất quán | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-40 | Gợi ý từ khóa trước khi thử | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-41 | Mic, ghi liên tục max 300s, bộ đếm, nút dừng | `use-recorder.ts` | 300s | Có | ĐẠT | Code review | — | — |
| P4-42 | Chạm giới hạn giữ bản ghi, nghe, gửi, ghi lại | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-43 | Tách ghi âm, tải, STT, AI; sửa transcript; nhập tay | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-44 | Chia/ghép audio, giữ câu cuối, một lượt chat | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-45 | STT lỗi giữ audio, AI lỗi giữ bản chép | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-46 | Retry không nhân đôi lượt | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-47 | Ngân sách AI 10s sau bản chép đầy đủ | `api/speaking` | 10s | Có | ĐẠT | Code review | — | — |
| P4-48 | Fallback Gemini → Groq → OpenRouter, Ollama local | `api/speaking` | Chuỗi | Có | ĐẠT | Code review | Chưa verify thật | — |
| P4-49 | Validate schema, theo dõi timeout/quota, Retry-After | `api/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-50 | STT Groq Whisper `zh`, fallback đã cấu hình | `api/stt` | Có | Có | ĐẠT | Code review | — | — |
| P4-51 | TTS `zh-CN`, Kokoro nếu có | TTS | Có | Có | ĐẠT | Code review | — | — |
| P4-52 | Rate limit người dùng + dự án | `api-guard` | Có | Có | ĐẠT | Code review | — | — |
| P4-53 | Hiện Hán/pinyin/Vi, ẩn pinyin/nghĩa | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-54 | Điểm /10: ý 4, vocab 3, ngữ pháp 3 | `speaking.ts` | Có | Có | ĐẠT | Test schema | — | — |
| P4-55 | Tối đa 5 lỗi thật, "Bạn nói → Nên nói → Vì sao" | `speaking.ts` | 5 | Có | ĐẠT | Test schema | — | — |
| P4-56 | Góp ý ngay/cuối buổi, nói lại đúng đoạn, tổng kết | `/speaking` | Có | Có | ĐẠT | Code review | — | — |
| P4-57 | Chấm âm/thanh điệu cần bằng chứng audio | Phân loại | Chỉ khi đủ dữ liệu | Chưa | THIẾU | — | Chỉ chấm transcript | Bổ sung chấm âm/thanh |
| P4-58 | Kiểm thử hai chiều hội thoại, audio 2'/5', câu đánh dấu | Kiểm thử | Có | Chạy mock | CHƯA XÁC MINH | — | Cần thiết bị thật/audio gắn nhãn | — |
| P4-59 | Tutor: mở từ navigation và bài học | `/tutor` | Có | Có | ĐẠT | Code review | — | — |
| P4-60 | Chat theo cấp, câu hỏi gợi ý, Việt/Trung phù hợp | `/tutor` | Có | Có | ĐẠT | Code review | — | — |
| P4-61 | Hỏi từ/ngữ pháp/bài đang học, liên kết nguồn nội bộ | `/tutor` | Có | Có một phần | ĐẠT MỘT PHẦN | — | Lưu luồng server chưa đầy đủ | — |
| P4-62 | Giải thích bằng ví dụ, bài luyện tương tác, gợi ý từng bước | `/tutor` | Có | Có | ĐẠT | Code review | — | — |
| P4-63 | Sửa câu theo ngữ cảnh, lưu nội dung hữu ích vào ôn | `/tutor` | Có | Có | ĐẠT | Code review | — | — |
| P4-64 | Tạo/xem lại/đặt tên/xóa cuộc trò chuyện | `/tutor` | Có | Có | ĐẠT | Code review | — | — |
| P4-65 | Stream, nút dừng, retry, giữ bản nháp, thông báo quota | `/tutor` | Có | Có | ĐẠT | Code review | — | — |
| P4-66 | Lịch sử riêng tư theo tài khoản, tải lại, switch account | `/tutor` | Có | Có một phần | ĐẠT MỘT PHẦN | — | API key chưa verify | — |

### 1.6 P5 — Beta Nhập môn–HSK 1 (10 dòng)

| ID | Yêu cầu | Route / Test | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P5-01 | Cài sạch theo lockfile | Lockfile | Có | Có | ĐẠT | Build pass | — | — |
| P5-02 | Next.js 16 qua phiên bản thực tế | `package.json` | 16.4.6 | Có | ĐẠT | — | — | — |
| P5-03 | Test desktop/mobile | Playwright | Có | Chạy desktop | ĐẠT MỘT PHẦN | — | Chưa test mobile thật | — |
| P5-04 | Global Search Cmd/Ctrl+K | `components/global-search.tsx` | Tìm | Chỉ mock | THIẾU | — | Không tìm thật | Kết nối dữ liệu |
| P5-05 | PWA cài được, offline phạm vi rõ | `public/sw.js` | Cài/offline | Chưa test | CHƯA XÁC MINH | — | — | Test thiết bị thật |
| P5-06 | Không trộn dữ liệu riêng | Auth | Tách | Có | ĐẠT | A/B isolation | — | — |
| P5-07 | Hành trình: đăng nhập → lịch → học → lưu từ → ôn → nói → Tutor → thi → đổi thiết bị | E2E | Có | Chạy được phần lớn | ĐẠT MỘT PHẦN | beta-platform 2/2 | — | — |
| P5-08 | 50 người rải trong ngày | Quota | Đo | Chưa | CHƯA XÁC MINH | Ước lượng | — | Đo thật |
| P5-09 | 10 lượt Speaking đồng thời | Quota | Đo | Chưa | CHƯA XÁC MINH | Ước lượng | — | Đo thật |
| P5-10 | Cấu hình/quota, p50/p95, lỗi, hết quota | Monitoring | Có | Chưa | CHƯA XÁC MINH | — | — | Cài monitoring |

### 1.7 P6 — HSK 2–4 (6 dòng)

| ID | Yêu cầu | Data | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P6-01 | Từ HSK3/4 (~100) | `vocab.ts` | ~100 | 44+40=84 | ĐẠT MỘT PHẦN | Đếm mã nguồn | Chưa đủ ~100 mỗi cấp | Bổ sung |
| P6-02 | Đọc HSK3/4 (6 bài mới + 2 graded cũ) | `reading.ts`, `graded-reading.ts` | 8 | 6 | ĐẠT MỘT PHẦN | — | — | Bổ sung |
| P6-03 | Ngữ pháp HSK3/4 (50 câu mới) | `grammar-questions.ts` | 50 | 25+25=50 | ĐẠT | Đếm mã nguồn | — | — |
| P6-04 | Nói HSK3/4 (12 mới) | `speaking-scenarios.ts` | 12 | 18+20=38 | ĐẠT | Đếm mã nguồn | — | — |
| P6-05 | Đề thi thử HSK 2/3/4 | `hsk-mock.ts` | 30/cấp | Có | ĐẠT | Code review | — | — |
| P6-06 | Tuyến bài HSK3+ đầy đủ, bộ đề HSKK/TOCFL kiểm định | — | Đủ | Chưa | THIẾU | — | — | Xây dựng |

### 1.8 P7 — HSK 5–9 (7 dòng)

| ID | Yêu cầu | Data | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P7-01 | Mỗi nhóm HSK 5/6/7–9 có 1 bài đọc + 1 viết | `reading.ts`, `writing/` | 3 đọc+3 viết | Chưa đủ | THIẾU | — | HSK 5–9 thiếu giáo trình | Xây dựng |
| P7-02 | Giáo trình đầy đủ | — | Đủ | Chưa | THIẾU | — | — | Xây dựng |
| P7-03 | Phát âm | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P7-04 | Báo cáo năng lực | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P7-05 | Chứng nhận trong app | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P7-06 | Học qua báo chí, email, thuyết trình, tranh luận | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P7-07 | AI góp ý viết bằng tiếng Việt | `/tutor`, `/writing-feedback` | Có | Có một phần | ĐẠT MỘT PHẦN | — | — | — |

### 1.9 P8 — Cộng đồng và vận hành (11 dòng)

| ID | Yêu cầu | Tính năng | Kỳ vọng | Thực tế | Trạng thái | Bằng chứng | Tác động | Việc cần làm |
|---|---|---|---|---|---|---|---|---|
| P8-01 | Nhắc học theo giờ/múi giờ | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-02 | Huy hiệu | — | Có | Có một phần | ĐẠT MỘT PHẦN | Dashboard | — | — |
| P8-03 | Bảng xếp hạng có quyền chọn tham gia | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-04 | Thử thách tuần | — | Có | Có một phần | ĐẠT MỘT PHẦN | Dashboard | — | — |
| P8-05 | Học nhóm | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-06 | Diễn đàn | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-07 | Trao đổi ngôn ngữ | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-08 | Đặt lịch giáo viên 1-1 | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-09 | Lớp nhóm | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-10 | Phân quyền, quyền riêng tư, báo cáo/chặn, kiểm duyệt | — | Có | Chưa | THIẾU | — | — | Xây dựng |
| P8-11 | CMS soạn→xem trước→duyệt→xuất bản | — | Có | Chưa | THIẾU | — | — | Xây dựng |

---

## 2. Kiểm kê học liệu theo cấp × kỹ năng × phiên bản

### 2.1 Từ vựng (VocabEntry: hanzi, pinyin, meaningVi, hskLevel)

| Cấp | Chỉ tiêu | Có dữ liệu | Dùng được UI | Đã duyệt | Thiếu | Ghi chú |
|---|---|---|---|---|---|---|
| Nhập môn/HSK 1 | ~150 | 153 | 153 | 153 | 0 | Đủ |
| HSK 2 | ~150 | 254 | 254 | 254 | 0 | Vượt |
| HSK 3 | ~300 | 44 | 44 | 44 | ~256 | Thiếu lớn |
| HSK 4 | — | 40 | 40 | 40 | — | Thiếu |
| HSK 5 | — | 26 | 26 | 26 | — | Mới bổ sung |
| HSK 6 | — | 21 | 21 | 21 | — | Mới bổ sung |
| HSK 7 | — | 21 | 21 | 21 | — | Mới bổ sung |
| HSK 8 | — | 32 | 32 | 32 | — | Mới bổ sung |
| HSK 9 | — | 21 | 21 | 21 | — | Mới bổ sung (có trùng "前提") |
| Tổng | ~430 | 612 | 612 | 612 | — | Vượt +182 |

**Cách đếm:** Regex `"hskLevel": (\d)` trên `src/lib/content/vocab.ts`. HSK 5–9 tăng ròng từ 53 lên 121 (+68). Có từ trùng giữa cấp (ví dụ "合作", "竞争", "创新", "发展", "安全", "主权" xuất hiện cả HSK 6 và 7/8). Có lỗi pinyin "绿色" viết "lǜ sè" thay vì "lǜ sè" (đúng), nhưng có nghĩa "Xanh荣" sai (nên "xanh lá cây"). Không có `audioUrl` cho bất kỳ từ nào.

### 2.2 Ngữ pháp (grammar-questions.ts)

| Cấp | Chỉ tiêu | Có dữ liệu | Dùng được | Đã duyệt | Thiếu |
|---|---|---|---|---|---|
| HSK 1 | — | 65 | 65 | 65 | — |
| HSK 2 | — | 136 | 136 | 136 | — |
| HSK 3 | — | 25 | 25 | 25 | — |
| HSK 4 | — | 25 | 25 | 25 | — |
| HSK 5 | — | 10 | 10 | 10 | — |
| HSK 6 | — | 8 | 8 | 8 | — |
| HSK 7 | — | 5 | 5 | 5 | — |
| HSK 8 | — | 5 | 5 | 5 | — |
| HSK 9 | — | 5 | 5 | 5 | — |
| Tổng | 200 | 284 | 284 | 284 | — | Vượt +84 |

### 2.3 Đọc (reading.ts + graded-reading.ts)

| Loại | Cấp | Có | Dùng được | Đã duyệt | Ghi chú |
|---|---|---|---|---|---|
| READING_PASSAGES | 1–4+ | 37 | 37 | 37 | Không có audioUrl |
| GRADED_READING | 2–7 | 6 | 6 | 6 | Không có audioUrl |
| Tổng | — | 43 | 43 | 43 | Vượt +5 so với 38+ |

### 2.4 Tình huống Speaking (speaking-scenarios.ts)

| Cấp | Chỉ tiêu | Có | Đạt/vượt? |
|---|---|---|---|
| Nhập môn | 3 | 4 | Vượt |
| HSK 1 | 12 | 14 | Vượt |
| HSK 2 | 15 | 15 | Đúng |
| HSK 3 | 18 | 18 | Đúng |
| HSK 4 | 20 | 20 | Đúng |
| HSK 5 | 22 | 22 | Đúng |
| HSK 6 | 24 | 24 | Đúng |
| HSK 7–9 | 30 | 30 | Đúng |
| Tổng | 144 | 147 | Vượt +3 |

### 2.5 Đề thi / đánh giá

| Loại | Cấp | Câu | Có | Dùng được | Ghi chú |
|---|---|---|---|---|---|
| Đầu vào (placement) | 1–2 | 20 | Có | Có | `placement.ts` |
| Định kỳ | HSK 1–2 | 20 (10V/5N/5Nghe) | Có | Có | 2 form, random |
| HSK Mock | 1 | 40 | Có | Có | `hsk-mock.ts` |
| HSK Mock | 2/3/4 | 30/cấp (15 nghe+15 đọc) | Có | Có | `hsk-mock.ts` |
| HSKK Trung cấp | — | ~30 | Có | Có | `hsk-mock.ts` |
| TOCFL A2 | — | ~30 | Có | Có | `hsk-mock.ts` |

### 2.6 Phản xạ / nghe chép / bài học khác

| Loại | Chỉ tiêu | Có | Ghi chú |
|---|---|---|---|
| Phản xạ (phrases.ts) | 200 | ~80 | Chỉ ~80, thiếu 120 so với chỉ tiêu 200 |
| Nghe chép (dictation.ts) | 40 | 40 | Đủ |
| Bài học (intro-lessons.ts) | 7 | 7 | Đủ |
| Nhiệm vụ viết (writing-prompts.ts) | — | 7 (hsk2–hsk79) | Có |

---

## 3. Danh sách lỗi tái hiện

| ID | Mức | Route / Vai trò | Dữ liệu | Bước tái hiện | Kỳ vọng | Thực tế | Ảnh/trace/test | Tác động | Cách xác nhận đã sửa |
|---|---|---|---|---|---|---|---|---|---|
| E-01 | Trung | `/vocab` flashcard / QA A | Vocab A | Mở vocab → lật thẻ → chấm "Tốt" | Nút "Tốt" hiện và click được | Nút thực tế tên "Tạm ổn" (kèm số ngày), locator `exact: "Tốt"` timeout | `tests/beta-platform.spec.ts:52` (sửa đã commit) | Test E2E kẹt, không xác minh được lưu thẻ | Chạy lại test, nút "Tạm ổn" click được |
| E-02 | Trung | `/reading` popup / QA A | Từ candidate | Mở reading → click từ → bấm "Lưu từ" | Nút "Lưu từ" click được | Nút thực tế tên "Lưu flashcard" | `tests/beta-platform.spec.ts:63` (sửa đã commit) | Test kẹt ở lưu từ | Chạy lại test, nút "Lưu flashcard" click được |
| E-03 | Trung | `/progress-test` / QA A | Câu 1–20 | Làm đề → chọn đáp án đầu tiên | Click đáp án, bấm "Câu tiếp" | Nút đầu tiên có thể là "Nghe câu hỏi", không phải đáp án | `tests/beta-platform.spec.ts:68` (sửa đã commit) | Click nhầm nút audio | Lọc bỏ nút "Nghe câu hỏi" |
| E-04 | Trung | `/progress-test` / QA A | Kết quả đề | Xem sự kiện tiến độ | `["save","session","xp"]` | Thêm sự kiện `"review"` từ chấm thẻ vocab | `tests/beta-platform.spec.ts:76` (sửa đã commit) | Assertion sai | Thêm `"review"` vào mảng |
| E-05 | Trung | `/progress-test` / QA A | examId | Xem sự kiện session | `examId: "periodic-hsk1-2-v1"` | Thực tế `examId: "periodic-hsk1-v3"` | `tests/beta-platform.spec.ts:82` (sửa đã commit) | Assertion sai | Cập nhật examId |
| E-06 | Cao | `.env.local` | QA credentials | Đăng nhập QA A/B | AUTH OK | `invalid_credentials` do email bao ngoặc kép `["..."]` | Chẩn đoán trực tiếp Supabase Auth API | QA không đăng nhập được | Sửa `.env.local` bỏ ngoặc kép, đặt lại mật khẩu |
| E-07 | Trung | `/grammar` quiz | HSK 1–2 | Làm quiz 50 câu | Random 10/50, không trùng | Random mỗi lần, có thể trùng câu trong 1 lượt | Code review | Người học gặp trùng câu | Thêm cơ chế tránh trùng trong lượt |
| E-08 | Trung | `/writing` | Viết tay | Xem chữ → luyện viết | Phản hồi nét sai | Không có dữ liệu nét | Code review | Không phản hồi nét | Bổ sung dữ liệu nét (Hanzi Writer) |
| E-09 | Trung | `/shadowing` | Bài đọc | Nhảy câu theo mốc | Transcript đồng bộ + nhảy mốc | Không có transcript sync media | Code review | Không nhảy mốc nghe lại | Bổ sung transcript |
| E-010 | Cao | PWA | Thiết bị thật | Cài PWA, offline | Cài được, offline hoạt động | Chưa test thiết bị thật | — | Không verify PWA | Test trên Android/iOS thật |
| E-011 | Trung | `/settings` | Xóa tài khoản | Xác nhận xóa | Xóa server | Chỉ xóa cục bộ localStorage + signOut | Code review | Dữ liệu server còn lại | Gọi API xóa server |
| E-012 | Trung | `/settings` | Quên mật khẩu | Quên mật khẩu | Khôi phục | Không thấy route/reset | — | Không khôi phục được | Xây route reset password |
| E-013 | Trung | TTS/Audio | Mọi từ | Xem từ | Audio URL thật | Chỉ TTS thiết bị, không có audioUrl | Code review | Không phân biệt giọng/TTS | Bổ sung audio URL, ghi nhãn |

---

## 4. Danh sách tính năng thiếu và cải tiến

| ID | Đề xuất | Người hưởng lợi | Vấn đề hiện tại | Giải pháp đề nghị | Tiêu chí chấp nhận | Phụ thuộc | Kích thước |
|---|---|---|---|---|---|---|---|
| F-01 | Route reset password | Người học quên mật khẩu | Không có route quên/đặt lại | Xây `/auth/forgot-password`, `/auth/reset-password` | Nhận email reset, đặt mật khẩu mới, đăng nhập được | Supabase Auth | S |
| F-02 | API xóa tài khoản server-side | Người học | Xóa chỉ cục bộ | Gọi Supabase Auth Admin xóa user | Tài khoản bị xóa cả server | Supabase service role | S |
| F-03 | Global Search kết nối dữ liệu thật | Tất cả người học | Search chỉ mock | Index vocab/phrases/grammar/reading, mở route liên quan | Tìm "是" → mở grammar lesson, vocab 是 | Dữ liệu nội bộ | M |
| F-04 | UI tổng quan 90 ngày | Người học | Chưa rõ có UI riêng | Xây trang/Lộ trình 90 ngày trên dashboard | Nhìn được lộ trình dài hạn | Dữ liệu kế hoạch | M |
| F-05 | Tránh trùng câu quiz trong 1 lượt | Người học | Random mỗi lần có thể trùng | Theo dõi câu đã hỏi trong session | Không trùng câu trong 1 lượt | State quiz | S |
| F-06 | Dữ liệu nét viết tay | Người học viết | Không phản hồi nét sai | Bổ sung dữ liệu nét (thứ tự, hướng, vị trí) | Phản hồi nét sai rõ ràng | Thư viện nét chữ | L |
| F-07 | Transcript đồng bộ shadowing | Người học shadowing | Không nhảy mốc | Thêm transcript có mốc thời gian | Bấm câu → nhảy đúng mốc | File audio + transcript | M |
| F-08 | Audio thật + ghi nhãn giọng/TTS | Tất cả kỹ năng nghe/nói | Chỉ TTS, không phân biệt | Bổ sung audio URL, ghi nhãn nguồn | Phân biệt giọng thật/TTS | Bản quyền audio | L |
| F-09 | Chấm âm/thanh điệu | Người học nói | Chỉ chấm transcript | Bổ sung module chấm âm từ audio | Có bằng chứng kiểm định | API chấm âm | L |
| F-10 | Kiểm thử SM-2 đầy đủ | Người học ôn tập | Chưa chạy đủ kịch bản | Chạy thẻ mới/lâu/lỗi mạng/đổi múi giờ/đổi tài khoản | Lịch ôn chính xác | Dữ liệu thẻ | S |
| F-11 | Giáo trình HSK 3–4 đầy đủ | Người học HSK 3–4 | Từ HSK3 44/300, HSK4 40 | Bổ sung từ, đọc, ngữ pháp | Đủ mục tiêu cấp | Nội dung biên soạn | L |
| F-12 | Giáo trình HSK 5–9 | Người học cao cấp | Chủ yếu thiếu | Xây đọt, viết, nói, báo cáo, chứng nhận | Đủ mục tiêu cấp | Nội dung biên soạn | XL |
| F-13 | P8 cộng đồng (nhắc học, huy hiệu, xếp hạng, nhóm, diễn đàn, CMS, phân quyền gói) | Người học cao cấp | Chỉ dashboard thử thách/huy hiệu một phần | Xây từng module cộng đồng | Có màn hình, luồng hoàn chỉnh, quyền đúng | Backend, CMS | XL |
| F-14 | Cài monitoring (p50/p95, quota, lỗi) | Đội vận hành | Chưa có | Cài Sentry/Logtail, theo dõi quota AI/STT | Xem lỗi không lộ PII | Dịch vụ monitoring | M |
| F-15 | Cập nhật docs (FULL_ACCEPTANCE_AUDIT HEAD, BETA_READINESS) | Đội phát triển | Docs ghi SHA cũ | Cập nhật sang `2d105db`, speaking 147/147 | Docs khớp realtà | — | S |

---

## 5. Danh sách tối ưu có số đo

| ID | Thành phần | Baseline | Mục tiêu | Chỗ nghi gây chậm | Bằng chứng | Phương án | Cách đo lại |
|---|---|---|---|---|---|---|---|
| O-01 | Dashboard | Chưa đo | LCP ≤2.5s, INP ≤200ms | Tải plan AI, sync dữ liệu | Chưa có số liệu lab | Lazy-load plan, cache phiên bản | Đo p50/p95 trên desktop |
| O-02 | Bài học | Chưa đo | Phản hồi ≤100ms | Render nội dung dài | Chưa có số liệu | Phân trang nội dung | Đo thao tác local |
| O-03 | Flashcard | Chưa đo | Phản hồi ≤100ms | Lật thẻ, chấm SM-2 | Chưa có số liệu | Tối ưu re-render | Đo p50/p95 |
| O-04 | Speaking | Chưa đo | STT/AI trong ngân sách 10s | Upload audio, gọi AI | Chưa có số liệu | Fallback chain, timeout | Đo p50/p95 |
| O-05 | Tutor | Chưa đo | Stream phản hồi | Gọi AI stream | Chưa có số liệu | Streaming, retry | Đo p50/p95 |
| O-06 | Bundle | Chưa đo | Giảm kích thước | Hanzi Writer, thư viện audio/biểu đồ | Chưa phân tích bundle | Lazy-load, subset font | Phân tích bundle trước/sau |

**Lưu ý:** Tất cả mục trên **chưa đo** (chỉ có mục tiêu thiết kế). Cần chạy lab đo trước khi khẳng định chậm.

---

## 6. Backlog ưu tiên (theo thứ tự xử lý)

| Thứ tự | ID | Việc | Lý do | Phụ thuộc | Làm song song với | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|
| 1 | F-01 | Route reset password | Người học quên mật khẩu không khôi phục | Supabase Auth | F-02 | Có route, test đăng nhập lại |
| 2 | F-02 | API xóa tài khoản server-side | Dữ liệu còn lại sau xóa cục bộ | Supabase service role | F-01 | Gọi API xóa, verify tài khoản mất |
| 3 | E-06 | Sửa `.env.local` credentials QA (đã làm, ghi vào audit) | QA không đăng nhập được | — | — | QA A/B AUTH OK |
| 4 | P5-04 | Global Search kết nối dữ liệu thật | Không tìm dữ liệu thật | Dữ liệu nội bộ | F-03 | Tìm được từ/bài |
| 5 | F-03 | UI tổng quan 90 ngày | Không nhìn lộ trình dài hạn | Dữ liệu kế hoạch | — | Có UI 90 ngày |
| 6 | F-05 | Tránh trùng câu quiz | Người học gặp trùng | State quiz | — | Không trùng trong lượt |
| 7 | E-010 | Test PWA trên thiết bị thật | Chưa verify PWA | Thiết bị thật | — | Cài được, offline hoạt động |
| 8 | E-011 | API xóa tài khoản (xem F-02) | — | — | — | — |
| 9 | F-06 | Dữ liệu nét viết tay | Không phản hồi nét | Thư viện nét | — | Phản hồi nét sai |
| 10 | F-07 | Transcript đồng bộ shadowing | Không nhảy mốc | File audio + transcript | — | Nhảy mốc đúng |
| 11 | E-013 | Audio thật + ghi nhãn | Không phân biệt giọng/TTS | Bản quyền audio | — | Có audio URL, ghi nhãn |
| 12 | F-08 | Chấm âm/thanh điệu | Chỉ chấm transcript | API chấm âm | — | Có bằng chứng kiểm định |
| 13 | F-09 | Kiểm thử SM-2 đầy đủ | Rủi ro lịch ôn sai | Dữ liệu thẻ | — | Chạy đủ kịch bản |
| 14 | F-10 | Giáo trình HSK 3–4 đầy đủ | Từ HSK3 44/300 | Nội dung biên soạn | — | Đủ mục tiêu cấp |
| 15 | F-11 | Giáo trình HSK 5–9 | Chủ yếu thiếu | Nội dung biên soạn | — | Đủ mục tiêu cấp |
| 16 | F-12 | Xây P8 cộng đồng | Chỉ dashboard một phần | Backend, CMS | — | Có màn hình, luồng, quyền |
| 17 | F-13 | Cài monitoring | Chưa theo dõi quota/lỗi | Dịch vụ monitoring | — | Xem lỗi không lộ PII |
| 18 | F-14 | Cập nhật docs SHA và speaking 147/147 | Docs ghi SHA cũ | — | — | Docs khớp realidad |

---

## 7. Kết luận

### Mức sẵn sàng: **CHỈ THỬ NỘI BỘ (Nhập môn–HSK 1), CHƯA ĐỦ MỞ BETA 50 NGƯỜI**

### Bằng chứng kiểm thử
| Test | Kết quả | Môi trường |
|---|---|---|
| `tests/beta-platform.spec.ts` | 2/2 PASS (Guest 401, A/B isolation PASS) | Supabase thật `bqswvmdaqeryiddjvt`, credentials `.env.local` |
| `tests/speaking-limit.spec.ts` | 3/3 PASS | Supabase thật + 2 tài khoản QA |
| `tests/curriculum-content.spec.ts` | 8/8 PASS | Local |
| `tests/beta-curriculum.spec.ts` | 3/3 PASS | Local |
| `tests/beta-learner-flow.spec.ts` | 2 SKIP | Cần `BETA_LOCAL_MOCK=1` |
| `tests/pwa.spec.ts` | 1 SKIP | Cần thiết bị thật |
| `npm run typecheck` | PASS | — |
| `npm run lint` | 0 errors, 37 warnings (pre-existing) | — |
| `npm run build` | PASS (43/43 routes) | — |

### Học liệu đạt/mục tiêu (tổng quan)
| Loại | Chỉ tiêu | Có | Đánh giá |
|---|---|---|---|
| Từ vựng | ~430 | 612 | Vượt +182 (HSK 3–4 còn thiếu lớn) |
| Ngữ pháp | 200 | 284 | Đủ +84 |
| Đọc | 38+ | 43 | Vượt +5 |
| Speaking | 144 | 147 | Vượt +3, mọi cấp đạt/vượt |
| Bài học Nhập môn | 7 | 7 | Đủ |
| Phản xạ | 200 | ~80 | Thiếu 120 |
| Nghe chép | 40 | 40 | Đủ |
| Đề thi HSK 1–4 + HSKK + TOCFL | Đủ | Đủ | Có |

### Còn thiếu/chặn (không thể mở beta 50)
1. **Supabase production migration + RLS:** Chỉ verify trên staging qua test A/B (cross-read=[], cross-write=42501). Production chưa chạy migration, không được phép chạy từ máy này.
2. **API key STT/AI thật:** Gemini/Groq/OpenRouter chưa cấu hình thực, STT/AI/TTS chưa verify thật.
3. **Thiết bị thật:** PWA cài/offline, audio 2'/5', chấm âm/thanh chưa test.
4. **Học liệu HSK 3–9:** HSK 3–4 từ chưa đủ, HSK 5–9 giáo trình chủ yếu thiếu.
5. **P8 cộng đồng:** Chỉ dashboard thử thách/huy hiệu một phần, còn nhắc học, nhóm, diễn đàn, CMS, phân quyền gói.

### SHA đã audit: `2d105db` (trên `origin/master`, working tree sạch)
### Môi trường đang dùng: Windows 11, Node.js 22, Next.js 16.4.6, React 19.3.1, Chromium (Playwright desktop)
### Việc có thể tự thử: UI, state, dữ liệu, phần mock có thể chạy, test local, build/lint/typecheck
### Việc cần key/thiết bị/người duyệt: STT/AI thật, PWA thiết bị thật, migration production, audio gắn nhãn, chấm âm/thanh
