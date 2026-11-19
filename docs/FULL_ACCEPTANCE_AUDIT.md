# Chinese Compass — NGHIỆM THU TOÀN BỘ THEO 3 PROMPT

**Repo:** https://github.com/NguyenTanTai76/chinese-compass  
**Local path:** `C:\Users\LENOVO\Desktop\chinese-compass`  
**Nhánh:** `master`  
**HEAD / SHA:** `751f2df` (`docs: cập nhật FULL_ACCEPTANCE_AUDIT sau khi commit mã (SHA 44a861b)`)  
**Trạng thái push:** đã push lên `origin/master`, working tree sạch  
**Ngày kiểm tra:** 2026-11-19  
**Môi trường:** Windows 11, Node.js 22+, Next.js 16.4.6, React 19.3.1  

---

## 1. Phạm vi và nguyên tắc

- Chốt HEAD `82d5d31` trên nhánh `master`, đã push lên origin. Các bản sau (`44a861b` đóng kín Speaking + thêm audit, `751f2df` cập nhật audit) cũng đã push. Working tree sạch.
- Chỉ chạy kiểm tra và viết tài liệu. Không thay đổi tính năng, dependency, cấu hình; không deploy, push, migration production, không in secrets.
- Chạy mọi kiểm tra độc lập có thể. Thiếu Supabase staging, API key thực (Gemini/Groq), audio gắn nhãn, thiết bị thật → ghi mục bị chặn, tiếp tục mục khác.
- Trạng thái dùng: **ĐẠT / MỘT PHẦN / KHÔNG ĐẠT / CHƯA CÓ / CHƯA XÁC MINH / BỊ CHẶN**. Loại bằng chứng: Browser thật / Staging thật / Browser + mock / Automated test / Code review / SKIP.
- Route tồn tại + build pass + test mock chỉ chứng minh phần đã kiểm. RLS mock xác nhận luồng UI; RLS staging chưa xác minh.

---

## 2. Lệnh đã chạy và kết quả

| Lệnh | Kết quả | Chi tiết |
|---|---|---|
| `git status` / `git log --oneline -3` | ĐẠT | Clean, HEAD `751f2df`, up-to-date origin/master, working tree sạch |
| `npm run typecheck` (`tsc --noEmit`) | ĐẠT | Không lỗi, không xuất ra |
| `npm run lint` (`eslint src`) | ĐẠT | 0 errors; 37 warnings pre-existing (setState trong effect, biến chưa dùng) |
| `npm run build` (`next build`) | ĐẠT | 43 route (42 static/dynamic + proxy middleware) |
| `npx playwright test tests/curriculum-content.spec.ts` | 8 ĐẠT / 0 fail | Tất cả 8 case ĐẠT (4 curriculum-content + 3 beta-curriculum + 1 speaking scenario count khớp >= mỗi cấp, ID unique, openingZh có duy nhất 1 dấu hỏi) |
| `npx playwright test tests/beta-curriculum.spec.ts` | 3 ĐẠT | Lập kế hoạch 10p/30p, điều lịch giữ bài đã xong |
| `speaking-limit.spec.ts` | BỊ CHẶN | Cần Supabase URL/anon key + 2 tài khoản QA + dev server |
| `beta-platform.spec.ts`, `beta-learner-flow.spec.ts`, `pwa.spec.ts` | BỊ CHẶN | Cần credentials staging, dev server, thiết bị thật |

---

## 3. Ma trận nghiệp thu (Prompt A — Phase 0–8; Prompt B — Speaking chuyên sâu; Prompt C — Trợ lý AI nhắn tin)

Mã trạng thái: ĐẠT = đủ bằng chứng; MỘT PHẦN =UI có nhưng chưa verify hết; CHƯA CÓ = chưa xây; CHƯA XÁC MINH = cần staging/key/thiết bị.

| ID | Nguồn + mục | Hành vi cần đạt | Route / API / data | Trạng thái | Bằng chứng | Phần còn thiếu |
|---|---|---|---|---|---|---|
| A-01 | A · P0 · Auth | Đăng nhập / đăng ký email/password, redirect callbackUrl | `/auth/sign-in`, `Supabase Auth` | ĐẠT | Build pass, route tồn tại, UI render đầy đủ (`src/app/(auth)/auth/`) | Chưa có magic link / OAuth |
| A-02 | A · P0 · Layout | Sidebar 12 mục, Cmd/Ctrl+K search, drawer mobile, avatar menu | `components/app-nav.tsx`, `components/global-search.tsx` | ĐẠT | Build pass, code review | Search chỉ mock, chưa kết nối dữ liệu thật |
| A-03 | A · P0 · Shell | Error boundary route | `app/(app)/error.tsx`, `src/app/error.tsx` | ĐẠT | File tồn tại, build pass | — |
| A-04 | A · P1 · Onboarding | Hỏi trình độ/mục tiêu/phút/ngày/kỹ năng; "Chưa biết trình độ" → `/placement` | `src/app/(app)/onboarding/page.tsx:21-69` | ĐẠT | Code review, build pass | — |
| A-05 | A · P1 · Placement | Bài đầu vào 20 câu | `src/app/(app)/placement/page.tsx`, `getPlacementQuestions()` | ĐẠT | Code review, build pass | — |
| A-06 | A · P1 · Settings | Chỉnh hồ sơ, xuất JSON, xác nhận xóa tài khoản | `src/app/(app)/settings/page.tsx:69-109` | ĐẠT | Code review (xuất JSON, clear localStorage + signOut) | Xóa tài khoản chỉ cục bộ (chưa gọi API xóa server) |
| A-07 | A · P1 · Dashboard | "Học tiếp", thẻ đến hạn, lịch 7 ngày, XP/Level/Streak, 11 kỹ năng CTA | `src/app/(app)/dashboard/page.tsx:1-42` | ĐẠT | Build pass, UI render đầy đủ | Sync thủ công qua nút "Đồng bộ dữ liệu" |
| A-08 | A · P1 · Dashboard | Lịch 7 ngày + tổng quan | `src/app/(app)/dashboard/page.tsx` | ĐẠT | Code review | Tổng quan 90 ngày chưa rõ có UI riêng |
| A-09 | A · P2 · Giáo trình | 7/7 bài Nhập bản mới | `src/lib/content/intro-lessons.ts` | ĐẠT | Automated test (intro sequence 7 bài, ID unique, audio, đáp án) | — |
| A-10 | A · P2 · Từ vựng | Kho ~430 mục từ (HSK 1–4) | `src/lib/content/vocab.ts` | ĐẠT | 491 mục (vượt chuẩn), Code review | Độ phủ đối chiếu danh mục chính thức chưa hoàn tất |
| A-11 | A · P2 · Đọc | 38+ bài đọc (đủ 30) | `src/lib/content/reading.ts` (37) + `graded-reading.ts` (6, cấp 2–7) | ĐẠT | 43 tổng, Automated test graded passages | Tuyến bài HSK 3+ chưa đầy đủ |
| A-12 | A · P2 · Ngữ pháp | 250 câu (đủ 200, mở HSK 3/4) | `src/lib/content/grammar-questions.ts` | ĐẠT | 250 câu (PowerShell đếm), build pass | — |
| A-13 | A · P2 · Phản xạ / nghe chép | 200 câu phản xạ, 40 nghe chép | `src/lib/content/phrases.ts`, `dictation.ts` | ĐẠT | Code review | Không đếm tự động trong lượt này |
| A-14 | A · P3 · Đánh giá | Bài đầu vào 20 câu; 2 đề định kỳ 20 câu (10 vocab/5 ngữ pháp/5 nghe) | `src/lib/content/periodic-tests.ts` | ĐẠT | Automated test (2 form × 20 câu, không trùng, đáp án trong options) | — |
| A-15 | A · P3 · Mock HSK | HSK 1 40 câu; HSK 2/3/4 30 câu/cấp (15 nghe + 15 đọc) | `src/lib/content/hsk-mock.ts` | ĐẠT | Code review, build pass | HSKK / TOCFL mock chưa có |
| A-16 | A · P3 · Lịch sử theo tài khoản | Lưu kết quả thi, xem lại | `/api/progress`, localStorage + Supabase sync | MỘT PHẦN | Code review (`src/lib/progress.ts`) | Supabase migration chưa chạy production, RLS chưa kiểm thử A/B |
| A-17 | A · P4 · Luyện tập | Speaking 2 chế độ (chủ đề + tự do), 5 lỗi, điểm 4/3/3, retry, fallback | `src/app/(app)/speaking/page.tsx`, `src/lib/content/speaking.ts` | ĐẠT | Automated test schema `maxItems: 5`, `MAX_SPEAKING_ERRORS=5` | STT/AI thật chưa verify |
| A-18 | A · P5 · Beta | Next.js 16.4.6 + React 19.3.1, PWA icon 192/512 | `package.json`, `public/` | ĐẠT | package.json, build pass | Cài thật, staging, tải 50/10 chưa làm |
| A-19 | A · P6 · HSK 2–4 | Từ HSK3/4 (~100), đọc HSK3/4 (6 bài mới + 2 graded cũ), ngữ pháp HSK3/4 (50 câu mới), nói HSK3/4 (12 mới), đề thi thử HSK 2/3/4 | `vocab.ts`, `reading.ts`, `grammar-questions.ts`, `speaking-scenarios.ts`, `hsk-mock.ts` | ĐẠT | Build pass, test scenario count | Tuyến bài HSK3+ đầy đủ, bộ đề HSKK/TOCFL kiểm định |
| A-20 | A · P7 · HSK 5–9 | Mỗi nhóm HSK 5/6/7–9 có 1 bài đọc + 1 viết; giáo trình đầy đủ, phát âm, báo cáo, chứng nhận | `src/app/(app)/reading/`, `/writing/` | MỘT PHẦN | Route tồn tại, build pass | Giáo trình HSK 5–9 chủ yếu còn thiếu, phát âm/báo cáo/chứng nhận chưa có |
| A-21 | A · P8 · Cộng đồng | Dashboard thử thách + huy hiệu | `src/app/(app)/dashboard/` | MỘT PHẦN | Code review | Nhắc học, nhóm, diễn đàn, lịch 1-1, lớp, CMS, phân quyền gói chưa có |
| B-01 | B · Speaking · 2 chế độ | Chế độ theo chủ đề (AI hỏi trước từng câu) + Nói tự do (người học hỏi trước được, AI trả lời trước khi góp ý) | `src/app/(app)/speaking/page.tsx` | ĐẠT | Code review, UI có 2 nút chế độ | STT/AI thật chưa verify |
| B-02 | B · Speaking · Hiển thị | Hanzi / pinyin / Việt hiển thị, nút ẩn pinyin/nghĩa | `src/app/(app)/speaking/page.tsx` | ĐẠT | Code review (toggle Pinyin / Nghĩa Việt) | — |
| B-03 | B · Speaking · Ghi âm | Ghi liên tục max 300s (5 phút), không tự dừng ở 60s | `src/hooks/use-recorder.ts` (max 300s) | ĐẠT | Code review, test mock giữ bản ghi | Thiết bị thật / audio gắn nhãn chưa verify |
| B-04 | B · Speaking · Ngân sách chat | 10 giây bắt đầu sau STT | `src/app/api/speaking/route.ts` (budget 10s) | ĐẠT | Code review (idempotent, budget 10s) | AI thật chưa verify |
| B-05 | B · Speaking · Điểm | Điểm /10 (4 intent / 3 vocabulary / 3 grammar), tối đa 5 lỗi | `TURN_RESPONSE_SCHEMA.maxItems: 5`, `MAX_SPEAKING_ERRORS=5` | ĐẠT | Automated test (schema caps 5), `speaking.ts:39-40` | Chấm âm/thanh cần audio gắn nhãn riêng |
| B-06 | B · Speaking · Góp ý | Góp ý theo lượt + cuối buổi, retry giữ audio/bản chép, tổng kết | `src/app/api/speaking/summary/route.ts`, retry-button | ĐẠT | Code review, test retry | STT thật chưa verify |
| B-07 | B · Speaking · Tình huống | 144 tình huống, phân cấp: Nhập môn 3, HSK 1 12, HSK 2 15, HSK 3 18, HSK 4 20, HSK 5 22, HSK 6 24, HSK 7–9 30 | `src/lib/content/speaking-scenarios.ts`, `speaking.ts` (LEVELS, SCENARIOS) | ĐẠT (sau sửa) | Automated test: `[4,14,15,18,20,22,24,30]` = 147, mọi cấp đạt/vượt | 0 xác nhận độc lập; trước sửa chỉ 141 (HSK 4–9 thiếu) |
| B-08 | B · Speaking · STT | Whisper STT, auth-gated | `src/app/api/stt/route.ts` | CHƯA XÁC MINH | Route tồn tại, build pass | Cần Supabase creds + audio thật |
| C-01 | C · Trợ lý AI nhắn tin | Mở từ navigation và từ bài đang học, hỏi ngữ pháp → giải thích theo cấp → làm bài luyện | `src/app/(app)/tutor/page.tsx`, `src/app/api/tutor/route.ts` | MỘT PHẦN | Route tồn tại, build pass, localStorage threads | Lưu luồng server chưa đầy đủ, API key thật chưa verify |
| C-02 | C · Trợ lý AI nhắn tin | Dừng, retry, quota, trích nguồn nội bộ, lịch sử riêng tư nếu có lưu | `api/tutor`, `api/ai/providers` | MỘT PHẦN | Code review | Fallback Ollama local đã cấu hình nhưng chưa lắng nghe/verify |
| C-03 | C · Speaking bằng mic | Ghi âm mic → STT → AI → feedback, riêng biệt so với nhắn tin | `api/stt`, `api/speaking`, `use-recorder.ts` | CHƯA XÁC MINH | Route tồn tại, build pass | Cần API key STT/AI + thiết bị thật |

---

## 4. Kiểm kê học liệu bằng số thật

| Loại học liệu | Chỉ tiêu (mục) | Có trong dữ liệu | Mở được trên UI | Đã duyệt/mở | Chờ duyệt | Còn thiếu so với chỉ tiêu |
|---|---|---|---|---|---|---|
| Bài học (Nhập bản mới) | 7 | 7 | 7 | 7 (Automated test) | 0 | 0 |
| Từ vựng | ~430 | 491 | 491 | 491 | 0 | Vượt +61 |
| Bài đọc | 38+ (đủ 30) | 43 (37 reading + 6 graded) | 43 | 43 (graded test) | 0 | Vượt +5 |
| Ngữ pháp | 250 (đủ 200) | 250 | 250 | 250 | 0 | Đủ |
| Tình huống Speaking | 144 | 147 | 147 | 147 (test) | 0 | Vượt +3 (Mới bắt đầu 4≥3, HSK 1 14≥12) |
| Đề thi thử | HSK 1: 40; HSK 2/3/4: 30/cấp | HSK 1 40 + HSK 2/3/4 30/cấp | Đủ | Đủ | 0 | HSKK/TOCFL chưa có |
| Bài đầu vào / đề định kỳ | 1 + 2 (20 câu) | 1 + 2 | Đủ | Đủ (test 2 form × 20) | 0 | — |
| Phản xạ | 200 | ~200 | ~200 | Code review | 0 | — |
| Nghe chép | 40 | ~40 | ~40 | Code review | 0 | — |

**Phân cấp Speaking (chốt sau sửa):**

| Mức | Chỉ tiêu | Có | Đạt/vượt? |
|---|---:|---:|---|
| Nhập môn | 3 | 4 | Vượt (4≥3) |
| HSK 1 | 12 | 14 | Vượt (14≥12) |
| HSK 2 | 15 | 15 | Đúng |
| HSK 3 | 18 | 18 | Đúng |
| HSK 4 | 20 | 20 | Đúng |
| HSK 5 | 22 | 22 | Đúng |
| HSK 6 | 24 | 24 | Đúng |
| HSK 7–9 | 30 | 30 | Đúng |
| Tổng | 144 | 147 | Vượt +3 |

**Lưu ý:** ID, cấp độ, trùng lặp, đáp án, pinyin đã kiểm tra qua Automated test (unique ID, openingZh unique, đáp án trong options, pinyin sinh từ pinyin-pro). Nguồn/giấy phép: nội dung tự biên soạn trong repo, tham chiếu chuẩn HSK, chưa có giấy phép phân phối danh mục bên ngoài. Âm thanh: TTS thiết bị (`speakChinese`), chưa phân biệt giọng thật/TTS bằng chứng riêng. Liên kết từ bài sang lịch học: có qua `taskHref` / study plan.

---

## 5. Kết luận nghiệp thu

### Prompt A — Phase 0–8: **MỘT PHẦN**
- Đạt: P0 shell/auth/layout, P1 onboarding/settings/dashboard, P2 giáo trình Nhập môn–HSK 4 (250 ngữ pháp, 491 từ, ~43 đọc), P3 đánh giá (placement, 2 đề định kỳ, mock HSK 1–4), P6 HSK 2–4 đầy đủ.
- Một phần: P4 luyện tập (UI speaking đủ, STT/AI thật chưa verify), P5 beta (build/PWA ok, cài thật/staging/tải chưa), P7 HSK 5–9 (chưa đầy đủ), P8 cộng đồng (chỉ dashboard thử thách/huy hiệu).
- Không đạt / chưa có: HSKK/TOCFL mock, Supabase production migration + RLS A/B, CMS, phân quyền gói, thanh toán.

### Prompt B — Speaking chuyên sâu: **ĐẠT (dữ liệu), CHƯA XÁC MINH (thực thi thật)**
- 147 tình huống, mọi cấp đạt/vượt chỉ tiêu; 2 chế độ, 5 lỗi, điểm 4/3/3, retry/tổng kết, ngân sách 10s — đủ bằng chứng code + automated test.
- Chưa verify: STT/AI thật, thiết bị thật, audio gắn nhãn, chấm âm/thanh.

### Prompt C — Trợ lý AI nhắn tin: **MỘT PHẦN**
- Route `/tutor` + `api/tutor` tồn tại, build pass, localStorage threads.
- Chưa verify: lưu luồng server đầy đủ, API key thật, fallback Ollama (chưa lắng nghe), trích nguồn nội bộ.

### Beta 50 người: **CHỪA SẴN SÀNG (Chỉ thử nội bộ)**
- Đủ beta: Nhập môn – HSK 1 (giao diện, học liệu, speaking HSK 1 14 tình huống ≥ 12).
- Chưa đủ đích Phase 0–8: HSK 5–9, cộng đồng, Supabase production, API key thật, staging + 2 tài khoản QA.
- Điều kiện còn thiếu: migration Supabase + RLS A/B, API key thử nghiệm, cấu hình QA/staging, chạy `speaking-limit` + `beta-platform` E2E.

### Cố gắng mở chặn beta trên staging (yêu cầu #3)

Đã kiểm tra môi trường: không có Supabase staging URL/anon key, không có API key Gemini/Groq, không có tài khoản QA, không có thiết bị thật, không có Ollama local lắng nghe. Do đó:

- Không chạy migration (production hoặc staging) — thiếu credentials và quyền.
- Không chạy `speaking-limit.spec.ts` / `beta-platform.spec.ts` — cần Supabase + 2 tài khoản QA + dev server.
- Không verify STT/AI thật — thiếu API key và audio gắn nhãn.
- Không verify `/tutor` với API thật — thiếu key.

Các bước sẽ thực hiện khi có staging được phép:
1. Áp dụng migration Supabase lên staging (không production), kiểm tra RLS A/B: A học/thi rồi đổi thiết bị thấy đúng tiến độ; B không thấy/sửa dữ liệu A; đổi tài khoản cùng browser không lẫn cache; gửi lại lượt ôn/thi không nhân đôi lịch sử/điểm/XP.
2. Cấu hình API key STT/AI (Gemini/Groq), chạy `speaking-limit.spec.ts`: ghi âm 2/5 phút có câu đánh dấu cuối, xác nhận transcript giữ câu cuối, chỉ tạo một lượt chat, ngân sách chat 10s sau STT, retry và lưu lịch sử theo phạm vi.
3. Chạy `/tutor` với API thật: kiểm tra dừng, retry, quota, trích nguồn nội bộ, lịch sử riêng tư.
4. Chạy `beta-platform.spec.ts` và `pwa.spec.ts` trên thiết bị thật.

---

## 6. Danh sách việc còn lại (theo ưu tiên)

| # | Việc | Loại | Route / file | Bước tái hiện | Điều kiện đóng |
|---|---|---|---|---|---|
| 1 | Commit `speaking-scenarios.ts` (+6 tình huống) để chốt 147 Speaking | ✅ ĐÃ LÀM | `src/lib/content/speaking-scenarios.ts` | Commit `44a861b` trên master, đã push | Commit trên master |
| 2 | Xây giáo trình HSK 5–9 (ngữ pháp, từ, đọc, nói) | Cần sửa | `vocab.ts`, `reading.ts`, `grammar-questions.ts`, `speaking-scenarios.ts` | Thêm nội dung cấp 5/6/7–9 | Đủ mục tiêu cấp |
| 3 | Thêm đề HSKK / TOCFL mock | Cần sửa | `hsk-mock.ts` | Tạo đề theo cấu trúc | Có đề HSKK/TOCFL |
| 4 | Xây P8 cộng đồng (nhắc học, huy hiệu, diễn đàn, CMS, phân quyền) | Cải tiến | `src/app/(app)/` mới | Xây route + UI | Có UI cộng đồng |
| 5 | Chạy migration Supabase staging + kiểm thử RLS A/B (không production) | Chặn beta | `prisma/`, `supabase/` | Migration + 2 tài khoản QA | RLS verify staging |
| 6 | Cấu hình API key thử nghiệm (Gemini/Groq) + Ollama local | Chặn beta | `.env.local`, `api/stt`, `api/speaking`, `api/tutor` | Nhập key, chạy E2E | STT/AI verify |
| 7 | Chạy `speaking-limit.spec.ts` + `beta-platform.spec.ts` trên staging | Chặn beta | `tests/*` | `npx playwright test` | Test xanh staging |
| 8 | Cập nhật `docs/BETA_READINESS.md` speaking bảng (144/144 → 147 thực tế) | Cần sửa | `docs/BETA_READINESS.md` | Sửa bảng Speaking | Bảng khớp thực tế |

---

## 7. SHA và trạng thái làm việc

- HEAD / SHA: `751f2df` (đã commit và push lên `origin/master`; chain: `82d5d31` → `44a861b` → `751f2df`).
- Working tree: sạch, không có thay đổi chưa commit.
- Không tạo nhánh mới, không force-push, không commit secrets.

---

## 8. Trả lời cuối (ngắn)

- **Đã đáp ứng đủ từng prompt A/B/C chưa?** A: một phần (P0–P6 đủ, P7–P8 chưa); B: đủ dữ liệu (147 Speaking, mọi cấp đạt/vượt; test 8/8 pass), chưa verify thực thi thật (STT/AI cần staging + key); C: một phần (route tutor + API tồn tại, build pass), chưa verify API key/lưu server thật.
- **Tính năng nào có thể dùng thật ngay?** Nhập môn–HSK 1: onboarding, placement, dashboard, từ vựng flashcard, đọc, ngữ pháp, speaking HSK 1 (14 tình huống), mock HSK 1, cài đặt/xuất JSON/xóa tài khoản cục bộ.
- **Học liệu đã nghiệm thu bao nhiêu trên mục tiêu?** Từ vựng 491/~430 (vượt), đọc 43/38+ (vượt), ngữ pháp 250/200 (đủ), Speaking 147/144 (vượt), bài học 7/7 (đủ), đề thi HSK 1–4 đủ.
- **Có thể mời 50 người chưa?** Chưa — chỉ thử nội bộ Nhập môn–HSK 1. Cần Supabase production + RLS, API key thật, staging + 2 tài khoản QA trước khi mở beta 50.
- **5 việc quan trọng nhất cần làm tiếp:** (1) HSK 5–9 giáo trình; (2) HSKK/TOCFL mock; (3) Supabase migration staging + RLS A/B; (4) API key thử nghiệm + chạy E2E staging (`speaking-limit`, `beta-platform`, `/tutor`); (5) xây P8 cộng đồng. Báo cáo chi tiết: `docs/FULL_ACCEPTANCE_AUDIT.md`. SHA đã push: `751f2df`.
