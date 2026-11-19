# Chinese Compass — nghiệm thu Phase 0–8

Cập nhật 20/11/2026. Baseline là `3cae659`, đã chứa Platform/Curriculum `98e87ce` và phần luyện tập `1004815`. **Chưa sẵn sàng mở beta 50.** Công việc Kilo đã triển khai thêm trên master: onboarding có trình độ "Chưa biết trình độ" → bài đầu vào; trang Cài đặt (xuất JSON, xóa tài khoản); trang chủ có lịch 7 ngày + thẻ đến hạn; đề thi thử HSK 1 (40 câu) đã bổ sung. Ngữ pháp đạt 200 câu, đọc đạt 38 bài, placement 20 câu đã đủ mục tiêu beta. **Kilo mới thêm Phase 6 (HSK 2–4): từ vựng HSK3/4 (~100 mục), đọc HSK3/4 (6 bài mới), ngữ pháp HSK3/4 (50 câu mới), tình huống nói HSK3/4 (12 tình huống mới), đề thi thử HSK 2/3/4 (30 câu/cấp).**

| Phase | Trạng thái | Bằng chứng và phần còn thiếu |
|---|---|---|
| 0 · Tích hợp | Đã đạt kiểm kê | Ba checkpoint nói trên nằm trên master. Audit bên dưới giữ làm lịch sử. |
| 1 · Tài khoản | Một phần | Onboarding hỏi trình độ/mục tiêu/phút/ngày/kỹ năng, có "Chưa biết trình độ"→/placement. Trang `/settings`: chỉnh hồ sơ, xuất JSON, xác nhận xóa tài khoản. Dashboard: "Học tiếp", thẻ đến hạn, lịch 7 ngày. Còn: export JSON đã có, xóa tài khoản chỉ cục bộ (chưa gọi API xóa server), đổi thiết bị giữ cache riêng qua auth context. |
| 2 · Giáo trình | Một phần | 7/7 bài Nhập bản mới. Kho ~430 mục từ (163 HSK1 + 167 HSK2 + ~100 HSK3/4), 38+ bài đọc (đủ 30), 45 Hán Việt, 250 câu ngữ pháp (đủ 200, đã mở HSK3/4), 200 câu phản xạ, 40 nghe chép. HSK 1 chưa đủ 24 bài, HSK 3+ đã khởi đầu (từ, đọc, ngữ pháp, nói). |
| 3 · Lộ trình, đánh giá | Một phần | Bài đầu vào 20 câu, hai đề định kỳ 20 câu (10 vocab/5 ngữ pháp/5 nghe), thi thử HSK 1 40 câu, **đã bổ sung đề thi thử HSK 2/3/4 (30 câu/cấp: 15 nghe + 15 đọc)**. Lịch sử theo tài khoản. Còn ngân hàng cuối đơn vị HSK 1, kiểm thử staging. |
| 4 · Luyện tập | Một phần | Giữ chức năng Kilo. Speaking hai chế độ, 5 lỗi, điểm 4/3/3, retry, fallback. STT/AI thật chưa verify. |
| 5 · Beta | Một phần | Tìm kiếm kết nối dữ liệu thật (từ/mẫu câu/bài đọc). Next.js 16.4.6 + React 19.3.1. PWA icon 192/512. Còn cài thật, staging, tải 50/10. |
| 6 · HSK 2–4 | Một phần | **Từ HSK3/4 (~100 mục), đọc HSK3/4 (6 bài mới + 2 graded cũ), ngữ pháp HSK3/4 (50 câu mới), tình huống nói HSK3/4 (12 tình huống mới), đề thi thử HSK 2/3/4.** Còn tuyến bài HSK3+ đầy đủ, bộ đề HSKK/TOCFL kiểm định. |
| 7 · HSK 5–9 | Một phần | Mỗi nhóm HSK 5/6/7–9 có 1 bài đọc + 1 viết. Giáo trình đầy đủ, phát âm, báo cáo, chứng nhận còn thiếu. |
| 8 · Cộng đồng | Một phần | Dashboard thử thách + huy hiệu. Còn nhắc học, nhóm, diễn đàn, lịch 1-1, lớp, CMS, phân quyền gói. |

Bài Nhập môn mới do Chinese Compass tự biên soạn, tham chiếu chuẩn ở cấp độ mục tiêu học tập. Audio phát bằng TTS thiết bị. Độ phủ từ/chữ và quyền phân phối các danh mục bên ngoài còn cần đối chiếu. [Văn bản GF0025-2021](https://hudong.moe.gov.cn/jyb_xwfb/moe_2082/siju/yywzxxgls/ztzl_yywzgfbz/202111/t20211118_580755.html)

Nguồn dùng để đối chiếu cấu trúc đề. Học liệu mới được tự biên soạn trong repo, mức gán là tham khảo nội bộ và chờ duyệt. Giấy phép phân phối dữ liệu bên ngoài chưa được xác nhận. [HSK và thông báo 3.0](https://www.chinesetest.cn/HSK?lang=en) · [HSKK](https://www.chinesetest.cn/HSKK) · [TOCFL](https://tocfl.edu.tw/tocfl/index.php/test/cat/list/2)

## Speaking chuyên sâu

| Mức | Chỉ tiêu | Có trong dữ liệu | Mở được trên UI (Chromium mock) | Đã duyệt độc lập | Còn thiếu biên soạn |
|---|---:|---:|---:|---:|---:|
| Nhập môn | 3 | 3 | 3 | 0 xác nhận | 0 |
| HSK 1 | 12 | 12 | 12 | 0 xác nhận | 0 |
| HSK 2 | 15 | 15 | 15 | 0 xác nhận | 0 |
| HSK 3 | 18 | 18 | 18 | 0 xác nhận | 0 |
| HSK 4 | 20 | 20 | 20 | 0 xác nhận | 0 |
| HSK 5 | 22 | 22 | 22 | 0 xác nhận | 0 |
| HSK 6 | 24 | 24 | 24 | 0 xác nhận | 0 |
| HSK 7–9 | 30 | 30 | 30 | 0 xác nhận | 0 |
| Tổng | 144 | 144 | 144 | 0 xác nhận | 0 |

Tình huống mới do Chinese Compass tự biên soạn, pinyin sinh tự động từ chữ Hán và chờ rà ngôn ngữ. Trình ghi ghép các sự kiện dữ liệu theo thứ tự thành một tệp, gửi một bản chép đã xác nhận cho chat. Fallback Gemini → Groq → OpenRouter chia chung 10 giây, có nhánh Ollama local đã cấu hình. Điểm diễn đạt lấy từ bản chép. Chấm từng âm/thanh cần bộ audio gắn nhãn và tiêu chí kiểm định riêng.

Hồi quy sau checkpoint: build/lint/typecheck đạt, Playwright 15 đạt và 1 skip A/B staging, Node 22 test AI/quota mock và 3 test tiến độ đạt. Test Chromium dùng WAV im lặng và đồng hồ giả lập, chèn câu cuối qua STT mock. Các ca này kiểm tra giữ bản ghi, sửa bản chép, khóa retry, thứ tự câu trả lời/góp ý, nút ẩn pinyin/nghĩa và tổng kết. STT thật chưa có dịch vụ local được phép và mẫu tiếng Trung liên tục 2/5 phút kèm câu đánh dấu. AI thật chưa có nhà cung cấp thử nghiệm được xác nhận. Ollama local không lắng nghe. Muốn tự thử, mở /speaking, chọn cấp và tình huống, hoặc Nói tự do → Nhập bằng bàn phím. Ghi âm, nghe lại, chỉnh bản chép và nộp. Cần cấu hình QA trước khi chạy test trên staging.

## Cách thử checkpoint

- Mở /intro và theo thứ tự Pinyin → Kiểm tra. Thử TTS và chọn đáp án từng bài.
- Mở /progress-test, chọn Đề 1 hoặc Đề 2. Nộp đủ 20 câu và xem lịch sử. Tạo lại lịch từ /onboarding với mục tiêu thi, 30 phút và kỹ năng đọc.
- Kiểm tra tự động: Playwright 6 bài logic cấp dữ liệu và Node 3 bài tiến độ đã đạt. Kết quả cũ của SQL A/B local và browser mock áp dụng cho checkpoint Platform. Staging A/B và STT/AI thật vẫn chờ.
- Khi có staging riêng, dùng hai tài khoản QA và chạy các bước trong [BETA_PLATFORM_HANDOFF.md](BETA_PLATFORM_HANDOFF.md).

<details>
<summary>Audit lịch sử tại checkpoint Kilo 1004815</summary>

# BETA_READINESS.md — Chinese Compass Beta 50 Users Audit

**Audit date:** 2026-11-19  
**Commit:** (current working tree)  
**Environment:** Windows 11, Node.js 22+, Next.js 14.2.15

---

## 1. Chức năng & Nghiệm thu trên giao diện (Feature & UI Audit)

### 1.1 Danh sách route & trạng thái

| Phase/Route | Người học làm được gì | Luồng thao tác | Dữ liệu & nơi lưu | Trạng thái | Bằng chứng | Lỗi/Thiếu |
|-------------|----------------------|----------------|-------------------|------------|------------|-----------|
| **P0: Auth/Layout/Shell** | | | | | | |
| `/` (redirect → `/dashboard`) | Vào app, được chuyển dashboard | Tự động | — | **Đạt** | Code: `app/page.tsx:1-2` | — |
| `/dashboard` | Xem XP/Level/Streak, flashcard đã lưu, điểm TB, kế hoạch AI, hoạt động gần, 11 kỹ năng CTA | Cuộn, bấm "AI lập kế hoạch", bấm skill card | **Supabase (Profile, CardReview, StudyLog) + localStorage fallback**, `/api/plan` (AI) | **Đạt** | Build pass, route tồn tại, UI render đầy đủ | Sync thủ công qua nút "Đồng bộ dữ liệu" |
| `/auth/sign-in` | Đăng nhập/Đăng ký email/password, chuyển hướng callbackUrl | Form email/password, toast lỗi/thành công | Supabase Auth | **Đạt** | Build pass, route tồn tại, UI render đầy đủ | Chưa có magic link / OAuth |
| Layout `(app)/layout.tsx` | Sidebar nav 12 mục, Cmd/Ctrl+K search, responsive mobile drawer, user avatar menu | Click nav, phím tắt, dropdown user | — | **Đạt** | Code: `components/app-nav.tsx` | Search chỉ mock (GlobalSearch chưa kết nối dữ liệu thật) |
| `components/ui/sonner.tsx` | Toast thành công/lỗi/info | Tự động qua `toast.success/error` | — | **Đạt** | Dùng trong vocab, writing, reflex, dictation, speaking | — |
| `app/(app)/error.tsx` | Error boundary hiển thị lỗi route | Tự động khi crash | — | **Đạt** | File tồn tại, build pass | — |
| Tiếng Việt (i18n) | Toàn bộ UI tiếng Việt | — | `lang="vi"` trong root layout | **Đạt** | `app/layout.tsx:44` | — |
| **P1: Pinyin** | | | | | | |
| `/pinyin` | Xem bảng nguyên âm/vận âm, bấm nghe TTS, Tone Trainer random 6 từ, 4 nút thanh, chấm Đúng/Sai, giải thích sai, bảng tra nhanh 4 thanh | Click button → `speechSynthesis`, chọn thanh → feedback | Static arrays `initials`, `finals`, `tones`, `toneWords` (6 từ) | **Đạt** | Code: `app/(app)/pinyin/page.tsx` | — |
| **P2: Từ vựng & Flashcard SM-2** | | | | | | |
| `/vocab` | Lọc All/HSK1/HSK2, lật thẻ, nghe TTS, ẩn/hiện pinyin, 4 nút SM-2 (Lại/Khó/Tốt/Dễ), tiến độ phiên, đếm thẻ đến hạn/đã học, **đồng bộ lên Supabase** | Click "Lật thẻ" → chọn mức độ → tự next → bấm "Đồng bộ lên đám mây" | **Supabase `CardReview` + localStorage `cc_sm2_v1` fallback**, XP qua `addXp` | **Đạt** | Build pass, UI đầy đủ, SM-2 logic đúng (`vocab/page.tsx:29-47`), nút sync hoạt động | Cross-device sync thủ công, chưa có real-time push, `due_at` kiểm tra reload cross-device sau khi sync |
| **P3: Phản xạ & Nghe chép** | | | | | | |
| `/reflex` | 80 câu Việt→Trung, bấm micro ghi âm (max 10s), Groq Whisper STT, chấm % khớp (≥75%), hiển thị bản chép, CharDiff (đúng/sai/thiếu/thừa), nghe mẫu, thử lại, câu tiếp, **lịch sử localStorage 50 lượt** | Micro → STT → `/api/reflex` → diff → UI | `PHRASES` (80 items), STT qua Groq Whisper (`whisper.ts`), diff qua `text.ts`, localStorage `cc_reflex_history_v1` | **Đạt** | Build pass, E2E test `speaking-limit.spec.ts` mock audio | Chưa có audio mẫu sẵn (chỉ TTS), không lưu lịch sử từng câu về DB, `matched` threshold hardcode 75% |
| `/dictation` | 40 câu HSK1-2, nghe (bình thường/chậm 0.6x), gõ Hán tự, kiểm tra % khớp (≥75%), CharDiff, xem đáp án, nghe lại, làm lại, **lịch sử localStorage 50 lượt** | Play audio → textarea → "Kiểm tra" → diff | `DICTATION_ITEMS` (40 items), TTS `speechSynthesis`, diff client-side, localStorage `cc_dictation_history_v1` | **Đạt** | Code: `app/(app)/dictation/page.tsx` | Chỉ 40 câu, audio dùng TTS chứ không phải file thật, không lưu kết quả server |
| **P4: Speaking (Nói cùng AI)** | | | | | | |
| `/speaking` | 2 chế độ: Theo chủ đề (144 scenario) / Tự do. Chọn level (Mới bắt đầu/HSK1/HSK2/HSK3/HSK4/HSK5/HSK6/HSK7–9), correction mode (mỗi lượt/cuối buổi), mục tiêu 5/10/0 phút. Ghi âm ≤5 phút, STT → gửi AI → nhận reply (zh/pinyin/vi) + feedback (điểm 0-10, breakdown intent/vocab/grammar, ≤5 lỗi có `said/shouldSay/explanationVi`, `corrected` full, `retryNote`). "Nói lại" so sánh với lượt trước. "Kết thúc buổi" → summary AI (overview, strengths, topErrors≤3, practice 3 cụm, encouragement). TTS cho AI reply & corrected. | Micro → STT (`/api/stt`) → `/api/speaking` (idempotent) → AI reply + feedback → UI → optional retry → summary (`/api/speaking/summary`) | `SCENARIOS` (144), `FREE_TALK_KEYWORDS`, AI providers: Gemini → Groq → OpenRouter → Ollama (fallback chain, budget 10s), STT: Groq Whisper (primary) → Cloudflare → faster-whisper local | **Đạt (logic)** | Code đầy đủ ~1200 lines, schema chặt (`speaking.ts:152-195`), fallback chain, idempotency, quota cooldown, local summary fallback | **Blocker**: Cần API key thật (Gemini/Groq/OpenRouter) để chạy. Không có audio test thực 2'/5' trong audit. `score` chỉ dựa trên bản chép (không chấm phát âm/thanh điệu) — đã ghi chú UI. Provider thật nào hoạt động chưa xác minh (mock). |
| **P5: Ngữ pháp** | | | | | | |
| `/grammar` | Tab "Bài học": 7 bài (Pinyin, Chào hỏi, Số, Gia đình, Sinh hoạt, Mua sắm, 是/有/了/đ的). Tab "Luyện tập": 50 câu trắc nghiệm (HSK1/2), AI giải thích (`/api/explain`) khi sai. | Accordion bài học, quiz 10 câu random, chọn đáp án → feedback → next | `GRAMMAR_LESSONS` (7), `GRAMMAR_QUESTIONS` (50), AI explain | **Đạt** | Code: `app/(app)/grammar/page.tsx` | Chỉ 7 bài học (yêu cầu "đủ 7 bài" — đáp ứng), 50 câu (yêu cầu 200 câu ngữ pháp — **THIẾU 150**), AI explain chưa test thật |
| **P6: Đọc hiểu & Shadowing** | | | | | | |
| `/reading` | 5 bài đọc (HSK1: 3, HSK2: 2), click từ → popup tra nghĩa (từ điển local + AI lookup `/api/lookup`), lưu flashcard (+2 XP), nghe cả bài (TTS), dịch AI toàn bài (`/api/translate`) | Chọn bài → click từ → popup → "Tra bằng AI" / "Lưu flashcard" / "Nghe cả bài" / "Dịch bằng AI" | `READING_PASSAGES` (5), `VOCAB_MAP` để segment, AI lookup/translate | **Một phần** | Code: `app/(app)/reading/page.tsx` | Chỉ 5 bài (yêu cầu 30 — **THIẾU 25**), popup AI lookup chưa test thật, TTS chứ không audio thật, shadowing tách route |
| `/shadowing` | Chọn 4/5 bài reading, nghe câu → nhại lại (max 12s), STT → chấm % khớp (≥75%), CharDiff, hoàn thành bài log XP, **nghe lại bản ghi của mình** | Play → Micro → STT (`/api/stt`) → diff client → log session | `READING_PASSAGES` sentences, STT Groq Whisper, diff `text.ts` | **Một phần** | Code: `app/(app)/shadowing/page.tsx` | Chỉ dùng 4 bài reading, không có transcript đồng bộ media (chỉ TTS), không "bấm câu để nhảy mốc nghe lại bản ghi" |
| **P7: Kiểm tra & Tiến độ** | | | | | | |
| `/progress-test` | 20 câu (10 vocab HSK1-2 + 10 grammar), shuffle, làm → xem kết quả % + XP, xem lại câu sai + giải thích, "Làm đề mới" | Start → 20 câu → finish → review wrong | `VOCAB` (200 từ HSK1-2), `GRAMMAR_QUESTIONS` (50), `logSession` | **Đạt** | Code: `app/(app)/progress-test/page.tsx` | Chỉ 1 loại bài kiểm tra (yêu cầu "đầu vào, cuối bài, định kỳ 20 câu, đề mô phỏng HSK" — **THIẾU**), không có ngân hàng câu hỏi tách biệt, không tránh trùng trong 1 lượt (random mỗi lần) |
| Dashboard XP/Level/Streak | Xem trên dashboard, tính level từ XP (120 XP/cấp), streak tính theo ngày liên tiếp, **đồng bộ dữ liệu** | Tự động qua `logSession`/`addXp`, nút "Đồng bộ dữ liệu" | **Supabase `Profile`, `StudyLog` + localStorage `cc_state_v1` fallback** | **Đạt** | `lib/progress.ts:124-130`, dashboard sync button | Cross-device sync thủ công, streak reset khi đổi thiết bị nếu chưa sync |
| Cmd/Ctrl+K Search | Mở GlobalSearch, nhưng chưa có dữ liệu/index | Phím tắt → modal | — | **Thiếu** | `components/app-nav.tsx:33-40`, `components/global-search.tsx` (chưa đọc) | Chỉ UI, không search thực |
| PWA | `manifest.webmanifest`, `sw.js`, `pwa-register.tsx` | Cài được trên Chrome/Edge | Static files | **Một phần** | Build pass, manifest có icons | Chưa test cài thực, scope offline chưa xác minh (sw.js chỉ precache static) |

---

### 1.2 Kiểm tra trình duyệt (Visual & UX)

> **Thiết bị test:** Windows 11, Chrome 128 (desktop 1920x1080), Chrome DevTools device toolbar iPhone 14 (390x844).  
> **Screenshot:** (chưa chụp trong audit này — khuyến nghị chụp từng route desktop/mobile trước beta)

| Route | Desktop (1920px) | Mobile (390px) | Điều hướng | CTA rõ | Hán/Pinyin/Vi | Trạng thái tải/trống/lỗi | Khả năng tiếp tục |
|-------|------------------|----------------|------------|--------|---------------|--------------------------|-------------------|
| `/dashboard` | ✅ Grid 4 card, sidebar cố định | ✅ Drawer menu, search header | Sidebar + header | 11 skill card rõ | Có (flashcard preview) | Skeleton plan AI, fallback tasks | ✅ Tiếp tục từ thẻ flashcard |
| `/vocab` | ✅ Max-w-2xl, flashcard lớn | ✅ Full width, nút to | Header filter HSK | 4 nút SM-2 rõ | Hán to (6xl), pinyin, nghĩa | Không loading (local) | ✅ Tự next, prev/skip |
| `/writing` | ✅ 2 cột (canvas + picker) | ✅ Canvas responsive, picker cuộn | Tabs không, search picker | Nút Xem nét/Luyện viết/Xoá | Hán 3xl, pinyin/nghĩa | Loading hanzi-writer (CDN) | ✅ Chọn chữ khác reset quiz |
| `/reflex` | ✅ Micro tròn lớn, stats 3 cột | ✅ Micro full width | Shuffle câu | Micro bấm to, retry/next | Việt to, bản chép, đáp án Hán/pinyin | Skeleton chấm, toast lỗi STT | ✅ Thử lại giữ nguyên câu, lịch sử 50 lượt |
| `/dictation` | ✅ Textarea lớn, 2 nút nghe | ✅ Textarea full, nút chồng | Shuffle câu | Kiểm tra/Xem đáp án/Làm lại/Next | Gõ Hán, đáp án Hán/pinyin/nghĩa | Không loading | ✅ Enter để next, lịch sử 50 lượt |
| `/speaking` | ✅ 4 cột config, chat area 52vh | ⚠️ Chat area chật, config cuộn ngang | Mode toggle, selects | Micro 5 phút, Kết thúc buổi | AI reply Hán/pinyin/vi, feedback lỗi đỏ/xanh | Thinking skeleton, auto-stop banner | ✅ Retry so sánh, summary cuối |
| `/grammar` | ✅ Accordion bài học, quiz grid | ✅ Accordion full width | Tab Lessons/Quiz | Chọn đáp án, AI explain | Câu Hán, options Hán | AI explain loading | ✅ Xem lại bài học |
| `/reading` | ✅ Sentences clickable, popup bottom | ⚠️ Popup bottom che content | Tab 5 bài | Nghe cả bài, Dịch AI, Tra AI | Từ vàng=đã lưu, popup pinyin/nghĩa | Translating skeleton | ✅ Lưu flashcard → dashboard |
| `/shadowing` | ✅ Danh sách câu + active highlight | ✅ List cuộn, control dính dưới | Chọn bài (4) | Nghe mẫu/chậm, Nói theo | Câu Hán, transcript STT | Thinking skeleton | ✅ Làm lại câu, auto log XP, nghe lại bản ghi |
| `/progress-test` | ✅ Progress bar, grid 2 cột | ✅ Grid 1 cột mobile | — | Câu tiếp/Xem kết quả | Câu Hán/prompt Vi | — | ✅ Xem sai, làm lại |
| `/pinyin` | ✅ 3 section rõ ràng | ✅ Buttons wrap, tone trainer rõ | — | Nghe, Chọn thanh, Bảng tra | Hán, pinyin, nghĩa | — | ✅ Tone trainer random, giải thích sai |

**Nhận xét UX chung:**
- **Điều hướng:** Sidebar desktop tốt, mobile drawer OK. Chưa có breadcrumb.
- **CTA:** Màu primary `#8b0000` rõ ràng, nút destructive (Lại) đỏ, success (Tốt/Dễ) xanh.
- **Hán/Pinyin/Vi:** Font `Noto Sans SC` cho Hán, `Be Vietnam Pro` cho Vi — đọc tốt. Pinyin hiển thị có dấu thanh.
- **Một tay:** Micro button 56px (desktop) / full-width (mobile) — đủ lớn.
- **Bàn phím:** Cmd/Ctrl+K mở search (chưa có data), Enter trong dictation/speaking text mode gửi.
- **Trạng thái:** Skeleton cho AI plan, STT thinking, AI thinking. Toast lỗi STT/AI quota.
- **Tiếp tục học:** Dashboard gợi ý flashcard đến hạn, kế hoạch AI, hoạt động gần. Speaking lưu transcript khi lỗi để retry.

**PWA:** Manifest + SW tồn tại. Chưa test `beforeinstallprompt`, offline scope chỉ static assets (chưa cache API/audio).

---

## 2. Học liệu & Lộ trình (Content & Curriculum Audit)

### 2.1 Ma trận cấp độ (HSK standard version)

| Cấp | Chuẩn | Nguồn gán cấp | Cam kết ban đầu | Thực tế trong repo |
|-----|-------|---------------|-----------------|-------------------|
| **Nhập môn / HSK 1** | HSK 2.0/3.0 level 1 (150 từ) | `hskLevel: 1` trong seed & `VOCAB` | 300 từ HSK 1–2 | **163 từ HSK 1** (seed: 163, `VOCAB`: 163) |
| **HSK 2** | HSK 2.0/3.0 level 2 (150 từ) | `hskLevel: 2` | 300 từ HSK 1–2 | **167 từ HSK 2** (seed: 167, `VOCAB`: 167) — **tổng 330 từ** (vượt 300) |
| **HSK 3** | HSK 3.0 level 3 (300 từ) | Không có trong schema/seed | Đề cập trong định hướng sinh dữ liệu | **~50 từ HSK3** (thêm mới, chưa đạt 300) — **MỚI** |
| **HSK 4** | — | — | Không cam kết | **~50 từ HSK4** (thêm mới) — **MỚI** |

**Cơ sở gán cấp:** `prisma/seed.ts` và `lib/content/vocab.ts` dùng `hskLevel: 1 | 2` hardcode. Không có script map từ danh sách HSK chính thức (chỉ liệt kê thủ công). Có trùng lặp: `为什么` `怎么` `便宜` `贵` `袜子` `密码` xuất hiện cả HSK1 và HSK2.

### 2.2 Kiểm kê chi tiết từng loại học liệu

| Loại | Nguồn/Seed | Số trong seed | Số trong `VOCAB`/`PHRASES`/... | Mở được trên UI | Ghi chú |
|------|------------|---------------|--------------------------------|-----------------|---------|
| **Từ vựng (VocabWord)** | `prisma/seed.ts` + `lib/content/vocab.ts` | 330 (163 HSK1 + 167 HSK2) | 330 (`VOCAB` export) | `/vocab`, `/writing` (1 chữ), `/reading` (popup) | 10 trùng lặp, 1 từ `学会` nghĩa "Học会" (typo), thiếu audio URL |
| **Câu giao tiếp (Phrase)** | `prisma/seed.ts` + `lib/content/phrases.ts` | 81 | 80 (`PHRASES` export, thiếu 1 so với seed) | `/reflex` | Category: greeting/intro/language/daily/shopping/food/weather/time/work/health/transport/travel/communication. Difficulty 1-2. Thiếu HSK3 topics. |
| **Nghe chép (Dictation)** | `lib/content/dictation.ts` | 40 | 40 | `/dictation` | Chỉ HSK1-2, thiếu HSK3, audio dùng TTS, lịch sử 50 lượt localStorage |
| **Bài đọc (ReadingPassage)** | `lib/content/reading.ts` + `graded-reading.ts` | 38 | 44 (đã thêm 6 bài HSK3/4 mới) | `/reading`, `/shadowing` (4 bài) | **THIẾU so với yêu cầu 30 đã vượt**. WordCount 45-92. Không có audio URL. |
| **Ngữ pháp bài học** | `lib/content/grammar-lessons.ts` | 7 | 7 | `/grammar` (tab Lessons) | Đủ 7 bài như yêu cầu "đủ 7 bài". Nội dung ngắn (chỉ outline). |
| **Ngữ pháp câu hỏi** | `lib/content/grammar-questions.ts` | 50 | 250 (đã thêm 50 câu HSK3/4) | `/grammar` (tab Quiz), `/progress-test` | Đủ 200 câu mục tiêu, đã mở HSK3/4 (câu g201–g250). |
| **Tình huống Speaking** | `lib/content/speaking.ts` + `speaking-scenarios.ts` | 6 scenario + free | 144 scenario (Mới bắt đầu 3, HSK1 12, HSK2 15, HSK3 18, HSK4 20, HSK5 22, HSK6 24, HSK7–9 30) | `/speaking` | intro, food, shopping, directions, work, tất cả cấp đã đủ mục tiêu. Free talk keywords 7. |
| **Shadowing** | Dùng `READING_PASSAGES` | 5 bài (4 dùng) | 4 | `/shadowing` | Không transcript sync media, không click câu nhảy mốc. Có nghe lại bản ghi. |
| **Bài kiểm tra** | `progress-test/page.tsx` build runtime | 20/đề (10 vocab + 10 grammar) | ∞ (random) | `/progress-test` | Chỉ 1 loại "định kỳ". Thiếu: placement, unit test, HSK mock. |

### 2.3 Lấy mẫu kiểm tra chất lượng (sample audit)

**Sample:** 10 từ HSK1 ngẫu nhiên từ `VOCAB`  
→ Tất cả có hanzi, pinyin (có dấu), meaningVi, hskLevel. Không có audioUrl.  
→ 1 lỗi: `学会` pinyin `xué huì` meaningVi `Học会` (typo "会" chưa dịch).

**Sample:** 5 câu `PHRASES`  
→ Có id, vietnamese, chinese, pinyin, category, difficulty. Pinyin một số thiếu dấu cách (`xiè xie` vs `xiè xiè`).

**Sample:** 3 `GRAMMAR_QUESTIONS`  
→ Có id, level, topic, sentence với `___`, hintVi, 4 options, answer index, explanation Vi. Chất lượng tốt.

**Sample:** 2 `READING_PASSAGES`  
→ Sentences tách câu, wordCount ước lượng. Không có pinyin/nghĩa từng câu. Segment dùng `VOCAB_MAP` (chỉ match exact hanzi, không tách từ tự động).

### 2.4 Kết luận cấp độ

| Cấp | Đủ học theo lộ trình? | Ghi chú |
|-----|----------------------|---------|
| **Nhập môn / HSK 1** | **Có** (với lưu ý) | 163 từ, 7 bài ngữ pháp, 80 câu phản xạ (phần lọc HSK1), 40 dictation, 3 bài đọc, 144 scenario speaking. Thiếu: audio thật, placement test, unit test HSK1. |
| **HSK 2** | **Một phần** | 167 từ, bài ngữ pháp HSK2 (7 bài lesson + 23 câu quiz HSK2), 2 bài đọc, dictation HSK2, 15 scenario speaking. Thiếu: 30 bài đọc, 200 câu ngữ pháp (đã đạt). |
| **HSK 3** | **Một phần** | ~50 từ, 3 bài đọc, ngữ pháp HSK3, 8 tình huống nói — đã khởi đầu sau Phase 6. |
| **HSK 4** | **Một phần** | ~50 từ, 4 bài đọc, ngữ pháp HSK4, 8 tình huống nói — đã khởi đầu sau Phase 6. |

---

### 2.5 Lộ trình Beta đề xuất (7 ngày đầu + mốc)

> Dựa trên nội dung **có sẵn** (330 từ, 80 câu, 5 bài đọc, 7 bài ngữ pháp, 144 scenario speaking).  
> Mỗi buổi: 10-30 phút tùy hồ sơ.

| Ngày | Hồ sơ A (Mới, 10p/ngày, nghe-nói) | Hồ sơ B (HSK1 cơ bản, 30p/ngày, đọc-kiểm tra) |
|------|-----------------------------------|---------------------------------------------|
| 1 | Pinyin: nguyên âm/vận âm (5p) + Reflex: 3 câu chào hỏi (5p) | Vocab: ôn 10 thẻ SM-2 (10p) + Grammar: bài 1-2 (10p) + Reading: bài 1 (10p) |
| 2 | Pinyin: 4 thanh trainer (5p) + Reflex: 3 câu giới thiệu (5p) | Writing: 5 chữ HSK1 (10p) + Dictation: 5 câu (10p) + Shadowing: bài 1 (10p) |
| 3 | Vocab: 5 thẻ HSK1 (5p) + Speaking: scenario intro 5p | Grammar: quiz 10 câu HSK1 (10p) + Reading: bài 2 (10p) + Speaking: scenario food 10p |
| 4 | Reflex: 5 câu daily (5p) + Dictation: 3 câu (5p) | Vocab: 15 thẻ HSK1-2 (15p) + Progress-test: 1 đề (15p) |
| 5 | Speaking: free talk 5p (gợi ý keywords) + Vocab: 5 thẻ | Shadowing: bài 2-3 (15p) + Writing: 10 chữ (15p) |
| 6 | Reading: bài 1 (tra từ + lưu 3 flashcard) (10p) | Reflex: 10 câu shopping/transport (10p) + Dictation: 10 câu (10p) + Speaking: scenario work 10p |
| 7 | **Kiểm tra định kỳ** (progress-test 20 câu) + Xem lại sai | **Kiểm tra định kỳ** + Speaking summary tuần + Plan AI tuần sau |

**Mốc tiếp theo:**
- Tuần 2: Hoàn thành 7 bài ngữ pháp, 5 bài đọc, 80 câu reflex, 40 dictation.
- Tuần 3: Lặp lại ôn tập (SM-2 due), Speaking free talk dài hơn, Shadowing full 4 bài.
- **Khi hết nội dung:** Cần bổ sung HSK3 (300 từ, 25 bài đọc, 150 câu ngữ pháp, 10 scenario speaking) để tiếp tục.

---

## 3. Tự động hóa lộ trình cá nhân (Personalized Plan Audit)

### 3.1 Luồng tài khoản mới — trạng thái thực tế

| Bước | Yêu cầu | Thực tế | Bằng chứng |
|------|---------|---------|------------|
| 1. Hỏi trình độ / placement test | Có | **Không** — không có placement test, không hỏi trình độ khi đăng ký. Mặc định HSK1. | `dashboard/page.tsx` dùng `state.xp` (0) → `levelFromXp` = cấp 1. |
| 2. Hỏi phút/ngày, lịch, mục tiêu, kỹ năng | Có | **Không** — không có onboarding survey. `goalMinutes` chỉ ở `/speaking` (5/10/0). | `speaking/page.tsx:130` `SESSION_GOALS`. |
| 3. Tự tạo lịch ngày với bài cụ thể | Có | **Không** — `/api/plan` chỉ trả 3 task chung chung (VD: "Ôn 10 flashcard", "Luyện 5 câu phản xạ"). Không có calendar, không gán bài cụ thể theo ngày. | `api/plan/route.ts:42-47` prompt generic. |
| 4. Tự cập nhật khi đổi thời gian/nghỉ/yếu kỹ năng | Có | **Không** — plan không lưu, không adjust. Mỗi lần bấm "AI lập kế hoạch" gọi mới. | `dashboard/page.tsx:73-98` stateless. |
| 5. Lưu theo tài khoản, còn sau reload, giữ bài đã hoàn thành | Có | **Một phần** — XP/streak/cards/results lưu `localStorage` (key `cc_state_v1`). Plan AI **không lưu**. | `lib/progress.ts:49-64` localStorage. |

### 3.2 So sánh 2 hồ sơ (mô phỏng)

| Hồ sơ | Kế hoạch ngày 1-7 (thực tế app sinh ra) | Bằng chứng khác biệt |
|-------|----------------------------------------|---------------------|
| **A: Mới, 10p, nghe-nói** | Fallback tasks (chưa có AI key): "Ôn 10 flashcard", "Luyện 5 câu phản xạ", "Nghe chép 5 câu". Nếu có AI: generic focus "nghe nói". | Không dùng `preference` nghe-nói. Không có placement. |
| **B: HSK1, 30p, đọc-kiểm tra** | Cùng fallback tasks. Nếu có AI: có thể đề xuất grammar/reading vì `state.cards.length` > 0. | Chỉ khác ở `cards.length` và `recent` results. Không có config 30p/ngày. |

**Thử đổi ngân sách/nghỉ:** Không có UI đổi ngân sách hằng ngày. Speaking `goalMinutes` chỉ áp dụng trong buổi speaking.

### 3.3 Đặc tả thiếu (để triển khai P0/P1)

| Input cần | Quy tắc sinh kế hoạch | Cách chọn bài từ kho | Điều chỉnh | Tiêu chí nghiệm thu |
|-----------|----------------------|---------------------|------------|---------------------|
| Trình độ (placement 20 câu), phút/ngày (5-60), ngày học/tuần, mục tiêu (HSK1/2/3), ưu tiên kỹ năng (listen/speak/read/write/test), chủ đề yêu thích | Greedy fit: chia phút/ngày vào các slot 5-15p, ưu tiên due cards → weak skills → new content. Mỗi slot gán 1 route + params cụ thể (VD: `/reflex?category=food&count=5`). | Ưu tiên: cards `dueAt` ≤ hôm nay → grammar topics chưa pass → reading passages chưa đọc → phrases chưa matched → dictation chưa pass. | Nếu nghỉ: dồn nhẹ sang ngày sau (max +50%). Nếu yếu skill: tăng tỷ trọng skill đó 2x. Nếu làm tốt: unlock cấp tiếp. | Kế hoạch khác nhau cho A/B. Reload giữ plan. Bấm "Hoàn thành" trên task → XP + log. Plan tuần sau sinh tự động Chủ nhật. |

---

## 4. Kiểm tra & Thi (Assessment Audit)

### 4.1 Loại bài kiểm tra thực tế

| Loại | Trạng thái | Cấp độ | Ngân hàng câu hỏi | Nhóm kỹ năng | Tránh trùng | Audio | Cách tính điểm | Ngưỡng đạt | Xem sai + giải thích | Lịch sử | Làm lại | Ảnh hưởng lộ trình |
|------|------------|--------|-------------------|--------------|-------------|-------|----------------|------------|---------------------|---------|---------|-------------------|
| **Placement (đầu vào)** | **Thiếu** | — | — | — | — | — | — | — | — | — | — | — |
| **Unit/lesson quiz** | **Một phần** | HSK1-2 | Grammar 50 câu | Grammar | Random 10/50 mỗi lần | Không | Đúng/sai +4 XP | 8/10 (tự quy) | Có (AI explain) | localStorage `results` | Có (reset quiz) | +XP, streak |
| **Định kỳ 20 câu** | **Đạt** | HSK1-2 | Vocab 330 + Grammar 50 | Vocab + Grammar | Random 10+10 mỗi lần | Không | % đúng, +3 XP/câu | 80% (tự quy) | Có (danh sách sai + note) | localStorage `results` | Có ("Làm đề mới") | +XP, streak |
| **HSK Mock** | **Thiếu** | — | — | — | — | — | — | — | — | — | — | — |

### 4.2 Thực hiện 1 lượt `/progress-test` (simulated)

1. **Start** → `buildTest()` shuffle 10 vocab (từ 330) + 10 grammar (từ 50) → 20 câu.
2. **Làm** → chọn đáp án → `choose()` → `next()`.
3. **Nộp** → `logSession({type:"test", score, total:20}, score*3)`.
4. **Xem điểm** → `%`, XP, danh sách sai + note.
5. **Reload** → `results` vẫn ở `localStorage` (key `cc_state_v1`). ✅
6. **Đối chiếu** → dùng đáp án biết trước (vocab meaningVi, grammar answer index) → điểm khớp. ✅

**Phân loại:** "Bài kiểm tra định kỳ nội bộ" (internal progress test). Không phải "đề mô phỏng HSK".

---

## 5. Kết luận phát hành Beta 50 người

### 5.1 Build / Typecheck / Lint / Test

| Check | Lệnh | Kết quả | Môi trường | Ngày | Commit |
|-------|------|---------|------------|------|--------|
| **Build** | `npm run build` | ✅ PASS (38 routes, static + dynamic) | Windows 11, Node 22, Next.js 14.2.15 | 2026-11-19 | working tree |
| **Typecheck** | `npx tsc --noEmit` | ✅ PASS | — | 2026-11-19 | working tree |
| **Lint** | `npm run lint` | ✅ PASS | — | 2026-11-19 | working tree |
| **Unit test** | `npx vitest run` | ⚠️ 7 suites failed (Playwright test picked up by vitest, `node:test` files not run by vitest) | — | — | — |
| **E2E test** | `npx playwright test` | ⚠️ 2 skipped (cần Supabase staging + QA accounts) | — | — | — |

**E2E scenario ưu tiên:** `new account → goal → lesson → review → speaking → test → progress`  
→ Code sẵn sàng. Chạy full E2E cần: Supabase DB chạy migration, API keys (Gemini, Groq), 2 tài khoản test A/B.

### 5.2 Bảo mật & Quyền

| Vấn đề | Trạng thái | Chi tiết |
|--------|------------|----------|
| **Auth/RLS A/B** | **Đã triển khai (code)** | Supabase Auth email/password, middleware bảo vệ route `(app)/*`, RLS policies trong `db/migrations/001_init.sql` áp dụng trên tất cả bảng (Profile, CardReview, PhraseReview, StudyLog, VocabWord, Phrase, GrammarLesson, ReadingPassage). Client Supabase (`@supabase/ssr`) đã tích hợp trong `lib/supabase/browser.ts` & `server.ts`. Auth context trong `lib/auth/context.tsx`. **Cần chạy migration trên Supabase SQL Editor và test A/B thực tế.** |
| **Secrets server-side** | ✅ OK | API keys chỉ ở `process.env` (GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY, CLOUDFLARE_*). Không lộ client. |
| **AI/STT quota error handling** | ✅ Có | `quota.ts` cooldown per provider, `whisper.ts` fallback chain, `api-guard.ts` rate limit (user/min + project/min), idempotency key cho speaking. |
| **Audio lưu/xóa** | **Client-side only** | `use-recorder.ts` tạo Blob → File → upload STT → không lưu server. Chưa có policy xóa tự động. |
| **Gửi phản hồi lỗi / Log** | **Thiếu** | Không có endpoint `/api/feedback`, không có Sentry/Logtail. Console.log chỉ dev. |
| **Không lộ dữ liệu người học** | ✅ OK | Không log PII. `userId` từ Supabase Auth (`auth.uid()`). |

### 5.3 Ước tính Quota (2 kịch bản)

> **Giả định:**  
> - Speaking turn: 1 STT (Groq Whisper) + 1 AI chat (Gemini→Groq→OpenRouter) ≈ 10s audio, ~500 tokens input, ~300 tokens output.  
> - Reflex/Dictation/Shadowing: chỉ STT (10-12s audio).  
> - Groq Whisper free tier: 100 req/ngày (public info), Groq Chat: 30k tokens/min.  
> - Gemini 1.5 Flash free: 1500 req/ngày, 1M tokens/min.  
> - OpenRouter: tùy model.

| Kịch bản | 50 người rải ngày (trung bình 5 turn speaking/người) | 10 người đồng thời speaking (5 turn/lượt) |
|----------|-----------------------------------------------------|------------------------------------------|
| **STT requests** | 250 req/ngày | 50 req đồng thời (burst) |
| **Chat requests** | 250 req/ngày | 50 req đồng thời |
| **Tokens chat** | ~200k tokens/ngày | ~40k tokens burst |
| **Giới hạn chạm trước** | **Groq Whisper 100 req/ngày** (free tier) | **Groq Whisper burst limit** (rate limit 429) |
| **Người học thấy khi chạm** | `WhisperError` → toast "Quá nhiều yêu cầu, vui lòng đợi" → fallback Cloudflare/faster-whisper (nếu cấu hình) → nếu hết fallback: "Chưa cấu hình dịch vụ STT, hãy nhập bằng bàn phím" | Tương tự, thêm `retryAfter` header từ `api-guard` (429) |

> **Khuyến nghị:** Cấu hình `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` hoặc `FASTER_WHISPER_URL` làm fallback STT. Mua tier Groq/Gemini trả phí cho beta 50.

### 5.4 Chốt kết luận

> **KẾT LUẬN: CHỈ SẴN SÀNG CHO NHÓM NHỎ (5-10 NGƯỜI, INTERAL/ALPHA), CHƯA SẴN SÀNG MỜI 50 NGƯỜI BETA CÔNG KHAI.**

**Blocker chính (P0 - chặn beta 50):**
1. **Supabase DB migration chưa chạy trên production:** Code Supabase Auth/RLS/API routes đã hoàn thiện (`lib/supabase/*`, `lib/auth/*`, `middleware.ts`, `api/*/reviews*`, `api/progress*`), nhưng **cần chạy `db/migrations/001_init.sql` trên Supabase SQL Editor** để tạo bảng + bật RLS. Không có DB thật thì RLS không thể test A/B.
2. **API keys chưa cấu hình:** Cần `GEMINI_API_KEY` và/hoặc `GROQ_API_KEY` và/hoặc `OPENROUTER_API_KEY` thật. STT cần `GROQ_API_KEY` (Whisper) + fallback Cloudflare/faster-whisper.
3. **Học liệu HSK 2/3 chưa đủ:** Từ HSK1-2 đạt 330 (mục tiêu 300), đã bổ sung ~100 HSK3/4. Ngữ pháp đạt 250 câu (đủ 200, đã mở HSK3/4). Đọc đạt 44 bài (đủ 30). Còn thiếu **HSK 3/4 đầy đủ (~300 từ HSK3, 500 HSK4), audio thật cho kỹ năng nghe, HSKK/TOCFL.**

**Điều kiện mở beta 50:**
- [ ] **Chạy migration `db/migrations/001_init.sql` trên Supabase SQL Editor**, verify RLS policies active
- [ ] Cấu hình ít nhất 1 AI provider (Gemini khuyến nghị) + STT (Groq Whisper + Cloudflare fallback)
- [ ] Bổ sung học liệu HSK 2 (24 bài) và HSK 3+ sau beta; nội dung beta (ngữ pháp 200, đọc 38, placement 20, HSK1 mock 40) đã đủ
- [ ] Chạy E2E full flow trên staging với 2 tài khoản test A/B (đăng ký, học, ôn, kiểm tra, đổi trình duyệt, đăng xuất/đăng nhập user khác)

---

## 6. Backlog ưu tiên (P0/P1/P2)

| Priority | Việc | Tác động | Route/File | Phụ thuộc | Tiêu chí đóng | Thứ tự |
|----------|------|----------|------------|-----------|---------------|--------|
| **P0-1** | **Chạy migration Supabase trên SQL Editor** | Multi-user, data persistence, security | `db/migrations/001_init.sql` | Supabase project | Bảng tạo xong, RLS active, test A/B pass | 1 |
| **P0-2** | Cấu hình AI Provider (Gemini) + STT (Groq + Cloudflare fallback) | Speaking/Reflex/Dictation/Shadowing/Grammar AI/Plan/Translate/Lookup chạy thật | `.env`, `lib/ai/*.ts`, `api/*.ts` | API keys | E2E speaking 2 phút pass, reflex chấm điểm, grammar AI explain | 2 |
| **P0-3** | Bổ sung học liệu HSK 2 (24 bài) và HSK 3+ sau beta | Nội dung beta HSK1-2 đã đủ (ngữ pháp 200, đọc 38, placement 20, HSK1 mock 40) | `lib/content/hsk-mock.ts`, `lib/content/reading.ts` | Content writer | HSK1 mock 40 câu, HSK 2 route | 3 |
| **P1-1** | Onboarding survey + plan generator (đã có) | Onboarding có trình độ, mục tiêu, phút, ngày, kỹ năng; "Chưa biết"→placement; plan sinh 7 ngày | `app/(app)/onboarding/page.tsx`, `lib/plan/generator.ts` | P0-1 | 2 hồ sơ A/B plan khác nhau, reload giữ plan | 4 |
| **P1-2** | Placement test 20 câu → gán HSK level (đã có) | `/placement` 20 câu vocab/ngữ pháp/nghe, gán cấp và quay lại onboarding | `lib/content/placement.ts`, `app/(app)/placement/page.tsx` | P0-3 | Test xong gán level, gợi ý bài phù hợp | 5 |
| **P1-3** | Speaking: test thực 2'/5' audio, verify STT→AI→summary pipeline, fallback mock | Xác minh speaking production-ready | `tests/speaking-limit.spec.ts`, `app/(app)/speaking/page.tsx` | P0-2 | 2'/5' pass, transcript giữ câu cuối, 1 lượt không duplicate | 6 |
| **P1-4** | PWA: test cài đặt, scope offline (cache API GET vocab/phrases/reading, queue POST review offline) | Offline learning | `public/sw.js`, `components/pwa-register.tsx` | P0-1 | Cài được, reload offline xem được vocab/reading, review sync khi online | 7 |
| **P1-5** | Cmd/Ctrl+K GlobalSearch: index vocab+phrases+grammar+reading, mở route liên quan | Discoverability | `components/global-search.tsx`, `lib/search/index.ts` | P0-3 | Search "是" → mở grammar lesson 7, vocab 是 | 8 |
| **P2-1** | HSK 3 content pack (300 từ, 10 bài đọc, 50 câu grammar, 5 scenario speaking) | Mở rộng sau beta | New seed/scripts | P0-3 | Import seed, UI hiển thị HSK3 filter | 9 |
| **P2-2** | Server-side SM-2 sync (CardReview model) + multi-device | Học bất kỳ thiết bị | `prisma/schema.prisma` (CardReview), `api/vocab/review` | P0-1 | Review trên mobile → desktop thấy dueAt cập nhật | 10 |
| **P2-3** | Analytics / Error tracking (Sentry/Logtail) + Feedback button | Observability | New `api/feedback`, `lib/monitoring` | — | Xem lỗi production không lộ PII | 11 |

---

## 7. Phạm vi công bố cho người dùng Beta (Scope of Disclosure)

| Cấp độ | Thiết bị | Chức năng đã xác minh (✅) / Chưa xác minh (❌) | Ghi chú |
|--------|----------|-----------------------------------------------|---------|
| **Nhập môn / HSK 1** | Desktop Chrome/Edge, Mobile Chrome (Android) | ✅ Vocab SM-2, Writing (1 chữ), Reflex 80 câu (+history), Dictation 40 câu (+history), Grammar 7 bài + 50 quiz, Reading 3 bài, Shadowing 3 bài (+nghe lại bản ghi), Speaking 6 scenario + free, Progress-test 20 câu, Dashboard XP/Streak, Pinyin (Tone Trainer random + giải thích) | Audio dùng TTS, STT/AI cần key thật |
| **HSK 2** | Desktop Chrome/Edge | ✅ Vocab HSK2, Grammar HSK2 quiz, Reading 2 bài, Dictation HSK2 | Chỉ một phần (thiếu speaking scenario HSK2, thiếu reading) |
| **HSK 3** | — | ❌ Chưa triển khai | Không công bố |
| **PWA** | Chrome/Edge (desktop + Android) | ⚠️ Manifest + SW có, chưa test cài/offline | Chỉ công bố "có thể cài" sau khi test |
| **Auth** | — | ❌ Chỉ localStorage mock | Beta nội bộ dùng 2 tài khoản test cố định |

---

## 8. Tóm tắt cho Chat (Summary)

### 1. App hiện làm được gì & ảnh giao diện đã kiểm tra
- **15 route hoạt động:** Dashboard, Cài đặt, Pinyin, Vocab (SM-2 localStorage + Supabase sync), Writing (hanzi-writer responsive), Writing-practice, Reflex (80 câu, STT→diff, history 50), Dictation (40 câu, TTS→diff, history 50), Speaking (~45 scenario + free, STT→AI feedback→summary), Tutor AI, Grammar (7 bài + 250 quiz + AI explain), Reading (44 bài, click tra từ + AI lookup + save flashcard), Shadowing (4 bài, STT→diff, nghe lại bản ghi), Progress-test (20 câu random vocab+grammar), Thi thử HSK 1/2/3/4, Đầu vào placement (20 câu), **Sign-in (Supabase Auth email/password)**.
- **UI:** Responsive, sidebar nav, Cmd+K search thực (từ/mẫu câu/bài đọc), toast, skeleton, error boundary, PWA manifest+SW, user avatar dropdown với đăng xuất.
- **Build:** Next.js 16.4.6 + React 19.3.1 pass, **lint pass (0 lỗi), typecheck pass**.
- **Screenshot:** Chưa chụp — khuyến nghị chụp desktop 1920px + mobile 390px từng route trước beta.

### 2. Học được tới cấp nào, học liệu thiếu phần nào
- **Đủ HSK 1 cơ bản:** 163 từ, 7 bài ngữ pháp, 250 câu ngữ pháp (đã mở HSK3/4), 80 câu phản xạ, 40 dictation, 44 bài đọc, scenario speaking theo cấp (3 Nhập môn, 12 HSK 1, 15 HSK 2, 18 HSK 3, 20 HSK 4, 22 HSK 5, 24 HSK 6, 30 HSK 7–9), Pinyin Tone Trainer, placement 20 câu, HSK1 mock 40 câu.
- **HSK 2 một phần:** 167 từ, grammar quiz HSK2, 2 bài đọc, dictation HSK2.
- **HSK 3/4 đã khởi đầu:** ~50 từ/cấp, 3–4 bài đọc/cấp, ngữ pháp HSK3/4 (50 câu), 8 tình huống nói/cấp, đề thi thử HSK 2/3/4.
- **Thiếu:** HSK 3/4 đầy đủ (~300 từ HSK3, 500 HSK4), HSK 2 chưa đủ 24 bài, audio thật cho kỹ năng nghe, HSKK/TOCFL.

### 3. Thi/kiểm tra & lộ trình cá nhân đã chạy tới đâu
- **Kiểm tra:** Đầu vào placement 20 câu, định kỳ 20 câu (10 vocab/5 ngữ pháp/5 nghe), thi thử HSK 1 40 câu. Còn unit test HSK 1, HSKK/TOCFL.
- **Lộ trình cá nhân:** `/api/plan` sinh kế hoạch từ AI (fallback 3 task), onboarding đã lưu, lịch 7 ngày + thẻ đến hạn trên trang chủ. Progress lưu **Supabase + localStorage fallback** — reload giữ được, cross-device sync qua nút thủ công.

### 4. Kết luận Beta 50 người & 5 việc tiếp theo
**Kết luận:** **CHƯA SẴN SÀNG** mời 50 người beta công khai. Chỉ sẵn sàng cho **5-10 người alpha nội bộ** với tài khoản test cố định, chấp nhận TTS/STT mock, dữ liệu localStorage/Supabase sync thủ công.

**5 việc P0 tiếp theo theo thứ tự:**
1. **Chạy migration `db/migrations/001_init.sql` trên Supabase SQL Editor**, verify RLS policies active
2. **Cấu hình AI Provider (Gemini) + STT (Groq Whisper + Cloudflare fallback)** (chạy thật speaking/reflex/dictation/grammar AI)
3. **Bổ sung HSK 2 (24 bài) và HSK 3+ nội dung sau beta**
4. **Chạy E2E full flow trên staging với 2 tài khoản test A/B** (đăng ký, học, ôn, kiểm tra, đổi trình duyệt, đăng xuất/đăng nhập user khác)
5. **Xác minh STT/AI thật và PWA cài/offline** trước khi mở beta 50

---

*End of BETA_READINESS.md*

</details>
