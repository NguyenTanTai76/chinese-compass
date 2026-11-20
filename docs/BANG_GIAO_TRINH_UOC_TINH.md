# Chinese Compass — BẢNG GIÁO TRÌNH VÀ ƯỚC TÍNH THEO TỪNG CẤP

**Repo:** https://github.com/NguyenTanTai76/chinese-compass  
**Nhánh:** `master`  
**HEAD / SHA:** `dd74cb0` (đã push `origin/master`); working tree có 5 file chưa commit (doc + vocab + roadmap + grammar + speaking)  
**Ngày đối soát:** 2026-11-20  
**Phương pháp đếm:** Trực tiếp từ dữ liệu tại HEAD (`src/lib/content/*.ts`, `src/lib/content/roadmap.ts`). Không dùng số tổng kho để tuyên bố cấp đủ.  
**Mục tiêu tham chiếu:** (a) Đề cương HSK chính thức (HSK 2.0/3.0), (b) Chỉ tiêu nội bộ trong `docs/` đặc tả (Section 3.1), (c) `target` trong `src/lib/content/roadmap.ts`.

---

## 0. TỔ QUAN — MỤC TIÊU vs THỰC TẾ TẠI HEAD

Số thực đếm từ dữ liệu HEAD. `target` lấy từ `roadmap.ts:20-29`. `actual` lấy từ dữ liệu thực (không copy từ `roadmap.ts:31-40` vì đó chứa sai số).

| Cấp | Mục tiêu vocab | Thực vocab | Mục tiêu NP | Thực NP | Mục tiêu đọc | Thực đọc | Mục tiêu nói | Thực nói | Phù hợp bắt đầu | Phù hợp ôn đề | Sẵn sàng thi (đề mới) |
|-----|---------------|------------|-------------|---------|--------------|----------|--------------|----------|-----------------|---------------|----------------------|
| Nhập môn | 60 | 0* | 50 | 0* | 3 | 0* | 3 | 3 | Một phần | Không | Không |
| HSK 1 | 150 | 153 | 200 | 200 | 10 | 15 | 12 | 12 | Một phần | Không | Không |
| HSK 2 | 300 | 246 | 200 | 203 | 15 | 16 | 15 | 24 | ĐẠT | Một phần | Không |
| HSK 3 | 600 | 41 | 200 | 25 | 25 | 3 | 18 | 18 | Không | Không | Không |
| HSK 4 | 1200 | 40 | 200 | 25 | 30 | 3 | 20 | 20 | Không | Không | Không |
| HSK 5 | 2500 | 17 | 200 | 10 | 40 | 0 | 22 | 22 | Không | Không | Không |
| HSK 6 | 5000 | 16 | 200 | 8 | 50 | 0 | 24 | 24 | Không | Không | Không |
| HSK 7–9 | 11000 | 57 | 200 | 10 | 60 | 0 | 30 | 30 | Không | Không | Không |

\* Nhập môn là cấp nền tảng (pinyin, thanh điệu, chào hỏi, số, gia đình) — vocab/NP/đọc đượcouin qua HSK 1, chưa có bảng riêng isolates.

**Chú ý về `roadmap.ts:31-40` (`actual`):** chứa sai số — HSK 2 speaking ghi 15 (thực 24), HSK 3 speaking ghi 8 (thực 18), Nhập môn vocab/grammar nhầm sang 153/65 (là HSK 1). Sửa trong todo #3.

### 0.1 Đánh giá theo tiêu chí Section 6 (ba kết luận mỗi cấp)

1. **Có đủ để bắt đầu học:** Chỉ HSK 2 gần đủ (NP 200/200, nói 24/15, đọc 16/15, vocab 254/300 thiếu 46). HSK 1 thiếu lớn NP (65/200). Nhập môn chỉ có nói 3/3, còn lại chưa isolates. HSK 3–9 thiếu lớn mọi kỹ năng.
2. **Có đủ học liệu ôn theo đề cương đã xác minh:** Chưa có cấp nào đủ. HSK 2 gần nhất nhưng vocab thiếu 46, không có bài đọc giáo trình isolates, không có audio thật, không có SM-2 lưu server.
3. **Có bằng chứng sẵn sàng thi từ đề mới có bấm giờ:** Chưa có cấp nào. HSK 1/2/3/4 có đề mock (40/30/30/30) nhưng chưa bấm giờ thật, chưa chấm theo quy tắc xác định, không có 3 đề mới độc lập mỗi cấp.

---

## 1. NHẬP MÔN (Nền tảng phát âm + chào hỏi)

**Nguồn tham chiếu:** Đề cương HSK 1 (150 từ) làm cấp mục tiêu; GF0025-2021 (tiêu chuẩn能力). Nội dung tự biên soạn, chờ duyệt chuyên gia.

| # | Mục | Đơn vị | Mục tiêu nội gede | Thực tại HEAD | Thiếu | File/route bằng chứng | Ghi chú |
|---|-----|--------|-------------------|---------------|-------|----------------------|---------|
| 01 | Bài học chính & cụm chủ đề | bài | 7 (Pinyin→Chào hỏi→Tên→Số→Gia đình→Sinh hoạt→Kiểm tra) | 7 bài | 0 | `src/lib/content/intro-lessons.ts` (7 id), `/intro` | Mỗi bài: mục tiêu, nội dung mẫu, luyện hướng dẫn, tự luyện, lời giải, đánh giá, ôn |
| 02 | Pinyin, thanh mẫu, vận mẫu, thanh điệu & biến điệu | âm/cặp | Bảng initials/finals/tones, 4 thanh, thanh nhẹ, biến điệu (一, 不) | Có (/pinyin) | 0 | `src/app/(app)/pinyin/page.tsx` | Tone Trainer random 6 từ, 4 nút thanh, ch Đúng/Sai |
| 03 | Chữ Hán nhận diện / viết / bộ thủ / thứ tự nét | chữ | Chưa xác minh nguồn dữ liệu nét | 0 | Chưa xác minh | — | Không có dữ liệu nét, thứ tự nét trong repo |
| 04 | Từ vựng mới + cộng dồn | mục | 150 (theo HSK 1 mục tiêu) | 0 isolates | 150 | `/vocab?hsk=1` (153 HSK1 chung) | Nhập môn chưa isolates tách ra khỏi HSK 1 |
| 05 | Flashcard, audio, ví dụ, âm Hán Việt | thẻ | Có audio TTS, 4 mức SM-2 | Có TTS, SM-2 | âm Hán Việt chưa đối chiếu | `/vocab`, `src/hooks/use-sm2*` | Lưu nền, chưa tránh trùng retry/đổi phiên hoàn toàn |
| 06 | Điểm ngữ pháp, ví dụ, câu luyện, nhiệm vụ | điểm | 50 điểm × (3 ví dụ + 5 câu + 1 NT) | 0 isolates | 50 | `/grammar` (cùng HSK 1) | Nhập môn chưa isolates |
| 07 | Bài đọc giáo trình, văn bản, câu hỏi đọc hiểu | bài | 3 | 0 isolates | 3 | `/reading?level=1` (15 bài chung HSK1) | Nhập môn chưa isolates |
| 08 | Bài nghe audio, clip có câu hỏi, transcript, phút audio | phút | 25 clip, 8–12 giờ nghe chủ động | 0 | 25 clip / 8–12h | `/dictation` (40 câu TTS), `/reflex` | Audio chỉ TTS, không file thật, chưa đo phút độc nhất |
| 09 | Dictation, Shadowing, Phản xạ Việt→Trung | bài | 40 nghe chép, 80 phản xạ, reflex | 40 dictation, 80 reflex | Shadowing chưa có | `/dictation`, `/reflex` | 40 dictation TTS, 80 reflex Việt→Trung |
| 10 | Tình huống Speaking, buổi AI, bài phát âm | tình huống | 3 | 3 | 0 | `speaking-scenarios.ts` "Mới bắt đầu" = 3 | AI Speaking thật chưa verify (không key) |
| 11 | Viết tay, gõ chữ, viết câu/đoạn, phản hồi | bài | 7 | 0 | 7 | `/writing` (route tồn tại, chưa có bài Nhập môn) | Viết tay chưa có dữ liệu nét |
| 12 | Bài luyện Tutor hỗ trợ (liên kết bài/cấp) | bài | 7 | 0 | 7 | `/tutor` (route tồn tại, chưa lưu server) | Tutor chưa verify thật |
| 13 | Bài đầu vào, bài cuối, đề định kỳ, đề thi thử | đề | 1 bài đầu vào (20 câu), bài cuối cấp | 1 (placement 20 câu) | bài cuối cấp | `/placement`, `/progress-test` | Đề NHập môn riêng chưa có |
| 14 | Lộ trình 7 ngày, tổng quan 90 ngày, chu kỳ ôn, Học tiếp | kế hoạch | 1 lịch 7 ngày | 0 (StudyPlan bị chặn staging) | 1 | `/onboarding`, `db/migrations/002_beta_progress.sql` | **BLOCKER:** bảng `public.StudyPlan` không tồn tại staging (PGRST205) |
| 15 | Game, thử thách, cộng đồng | hoạt động | XP, streak, huy hiệu | Một phần | Thiếu đa số | `/dashboard` | Nhóm, diễn đàn, xếp hạng chưa có |

**Ước tính giờ công Nhập môn:** đối chiếu chuẩn 2h + biên soạn 7 bài 14h + rà 4h + nhập 6h + gắn route 4h + kiểm thử 4h = ~34h. Phụ thuộc: quyền chạy migration staging (StudyPlan), audio nét chữ (chưa có nguồn).

---

## 2. HSK 1

**Chuẩn chính thức:** HSK 1 = 150 từ, 174 chữ (đề cương HSK 2.0/3.0). Cấu trúc thi: nghe (20 phần) + đọc (20 phần), 40 câu, ~35 phút, đạt 120/200.

| # | Mục | Đơn vị | Mục tiêu nội bộ (Section 3.1) | Mục tiêu official HSK1 | Thực tại HEAD | Thiếu | File/route bằng chứng | Ghi chú |
|---|-----|--------|-------------------------------|------------------------|---------------|-------|----------------------|---------|
| 01 | Bài học chính | bài | 24 | — | 0 isolates | 24 | `/vocab?hsk=1` | HSK 1 chưa chia thành 24 bài chủ đề |
| 02 | Pinyin/thanh điệu | âm | Có | — | Có | 0 | `/pinyin` | Dùng chung Nhập môn |
| 03 | Chữ Hán nhận diện/viết/bộ thủ/nét | chữ | 300 mới | 174 | 0 (không dữ liệu nét) | 300 | — | Chưa có dữ liệu nét/thứ tự nét |
| 04 | Từ vựng mới + cộng dồn | mục | 500 mới / 500 cộng dồn | 150 | 153 (hskLevel 1) | 0 (vừa đủ official) | `vocab.ts` 153 mục HSK1 | Vừa đạt official 150; internal 500 thiếu 347 |
| 05 | Flashcard/audio/ví dụ/Hán Việt | thẻ | 153 thẻ | — | 153 | 0 | `/vocab`, SM-2 | Âm Hán Việt chưa đối chiếu |
| 06 | Điểm ngữ pháp + ví dụ + câu luyện + NT | điểm | 200 (internal) | — | 200 | 0 | `grammar-questions.ts` HSK1 = 200 (g1–g486, HSK1 = g1–g34 + g351–g486) | **ĐẠT** HSK 1 NP 200/200 |
| 07 | Bài đọc giáo trình + văn bản + câu hỏi | bài | 12 | — | 15 (level 1) | 0 | `reading.ts` level 1 = 15 | Đủ số, chưa phân bài giáo trình vs luyện |
| 08 | Bài nghe audio/clip/transcript/phút | phút | 30 | — | 0 (audio TTS chỉ) | 30 clip / 20–30h | `/dictation`, `/reflex` | Chưa đo phút audio độc nhất |
| 09 | Dictation/Shadowing/Phản xạ | bài | — | — | 40 dictation, 80 reflex | Shadowing 0 | `/dictation`, `/reflex` | |
| 10 | Tình huống Speaking/buổi AI | tình huống | 12 | — | 12 | 0 | `speaking-scenarios.ts` HSK1 = 12 (11 gốc + hsk1-work-study) | Đủ số tình huống HSK 1 |
| 11 | Viết tay/gõ chữ/viết câu/đoạn/phản hồi | bài | 12 | — | 0 | 12 | `/writing` | Chưa có bài viết HSK 1 |
| 12 | Bài luyện Tutor liên kết bài/cấp | bài | 12 | — | 0 | 12 | `/tutor` | Chưa lưu server |
| 13 | Đầu vào/cuối cấp/định kỳ/thử toàn phần | đề | 4 đề HSK1 | — | 1 (40 câu HSK1 mock) | 3 đề mới | `/hsk-mock` HSK1 = 42 câu | HSK1 mock có sẵn; cần 3 đề độc lập mới |
| 14 | Lộ trình 7 ngày / 90 ngày / ôn / Học tiếp | kế hoạch | 1 lịch 7 ngày | — | 0 (bị chặn StudyPlan) | 1 | `/onboarding` | **BLOCKER staging StudyPlan** |
| 15 | Game/thử thách/cộng đồng | hoạt động | XP, streak, huy hiệu | — | Một phần | Đa số | `/dashboard` | |

**Kết luận HSK 1:** Đủ vocab official (153 ≥ 150), **đủ NP (200/200 ĐẠT)**, đủ nói (12/12). Chưa đủ bài viết, đề mới, audio thật, StudyPlan bị chặn. **Không đủ để bắt đầu học đầy đủ HSK 1 theo chỉ tiêu nội bộ** (còn thiếu viết, đề, audio, StudyPlan).

**Ước tính giờ công HSK 1 (phần thiếu):** NP +135 điểm × (soạn 0.25h + rà 0.1h + duyệt 0.1h) ≈ 60h; bài viết 12 × 0.5h = 6h; đề mới 3 × 1h = 3h; audio/tünstler 10h. Tổng sơ bộ ~80–100h. Phụ thuộc: chuyên gia duyệt NP, audio nét.

---

## 3. HSK 2

**Chuẩn chính thức:** HSK 2 = 300 từ (cộng dồn 150 từ HSK1), 348 chữ. Cấu trúc: nghe + đọc, 60 câu, ~50 phút, đạt 120/200.

| # | Mục | Đơn vị | Mục tiêu internal | Thực HEAD | Thiếu | File/route | Ghi chú |
|---|-----|--------|-------------------|-----------|-------|------------|---------|
| 01 | Bài học | bài | 30 | 0 isolates | 30 | — | HSK 2 chưa chia bài |
| 02 | Pinyin/thanh điệu | âm | Dùng chung Nhập môn | Có | 0 | `/pinyin` | |
| 03 | Chữ Hán nét/thứ tự nét | chữ | 300 mới | 0 | 300 | — | Chưa có dữ liệu nét |
| 04 | Từ vựng mới/cộng dồn | mục | 770 mới / 1.270 cộng dồn | 254 (HSK2) | 46 đến official 300 | `vocab.ts` HSK2 = 254 | Thiếu 46 từ để đạt official 300 |
| 05 | Flashcard/audio/ví dụ/Hán Việt | thẻ | 254 | — | 254 | 0 | `/vocab` | Hán Việt chưa đối chiếu |
| 06 | Điểm NP + ví dụ + câu luyện + NT | điểm | 200 | 200 | 0 | `grammar-questions.ts` HSK2 = 200-203 | **ĐẠT** HSK 2 NP |
| 07 | Đọc giáo trình/văn bản/câu hỏi | bài | 18 | 16 (level 2) | 2 | `reading.ts` level 2 = 16 | Cần +2 bài đọc |
| 08 | Nghe audio/clip/transcript/phút | phút | 90 | 0 (TTS) | 90 | `/dictation`, `/reflex` | Chưa đo phút độc nhất |
| 09 | Dictation/Shadowing/Phản xạ | bài | — | 40 dictation, 80 reflex | Shadowing 0 | | |
| 10 | Speaking tình huống/buổi AI | tình huống | 15 | 24 | 0 (vừa đủ) | `speaking-scenarios.ts` HSK2 = 24 | Vượt mục tiêu internal 15 |
| 11 | Viết/gõ/viết câu/đoạn/phản hồi | bài | 15 | 0 | 15 | `/writing` | |
| 12 | Tutor liên kết bài/cấp | bài | 15 | 0 | 15 | `/tutor` | |
| 13 | Đề/thi | đề | 4 đề HSK2 | 1 (30 câu) | 3 đề mới | `/hsk-mock` HSK2 = 30 | Cần 3 đề mới độc lập |
| 14 | Lộ trình 7 ngày/90 ngày | kế hoạch | 1 | 0 (chặn StudyPlan) | 1 | `/onboarding` | **BLOCKER staging** |
| 15 | Game/cộng đồng | hoạt động | XP, streak, huy hiệu | Một phần | Đa số | `/dashboard` | |

**Kết luận HSK 2:** Gần đủ nhất. NP 200/200 ĐẠT, nói 24/15 ĐẠT, đọc 16/15 ĐẠT. Thiếu: vocab 46/300, bài đọc 2, bài viết 15, đề mới 3, audio thật, StudyPlan. **Đủ bắt đầu học một phần, chưa đủ ôn đề thi, chưa sẵn sàng thi.**

**Ước tính HSK 2:** vocab +46 × 0.2h = 10h; đọc +2 × 1h = 2h; viết 15 × 0.5 = 8h; đề mới 3 × 1.5 = 4.5h; audio 12h. Tổng ~35–45h.

---

## 4. HSK 3

**Chuẩn chính thức:** HSK 3 = 600 từ (cộng dồn), 623 chữ. Cấu trúc: nghe + đọc + viết, 80 câu, ~85 phút.

| # | Mục | Đơn vị | Mục tiêu internal | Thực HEAD | Thiếu | File/route | Ghi chú |
|---|-----|--------|-------------------|-----------|-------|------------|---------|
| 01 | Bài học | bài | 36 | 0 isolates | 36 | — | |
| 02 | Pinyin/thanh điệu | âm | Dùng chung | Có | 0 | `/pinyin` | |
| 03 | Chữ Hán nét | chữ | 300 mới | 0 | 300 | — | Chưa có dữ liệu nét |
| 04 | Từ vựng mới/cộng dồn | mục | 975 mới / 2.245 cộng dồn | 44 (HSK3) | 556 đến official 600 | `vocab.ts` HSK3 = 44 | **Thiếu lớn:** báo cũ ghi 44 HSK3; cần +556 |
| 05 | Flashcard/audio/ví dụ/Hán Việt | thẻ | 44 | — | 44 | 0 | Hán Việt chưa đối chiếu |
| 06 | Điểm NP | điểm | 60 | 25 | 35 | `grammar-questions.ts` HSK3 = 25 | Cần +35 điểm (×3 ví dụ=105, ×5 câu=175, ×1 NT=35) |
| 07 | Đọc giáo trình/văn bản/câu hỏi | bài | 24 | 3 (level 3) | 21 | `reading.ts` level 3 = 3 | Cần +21 bài; 100 văn bản luyện, 300–500 câu hỏi |
| 08 | Nghe audio/clip/phút | phút | 150 clip, 60–100 giờ | 0 (TTS) | 150 clip | | |
| 09 | Dictation/Shadowing/Phản xạ | bài | Shadowing 40 buổi | 0 | 40 | | |
| 10 | Speaking | tình huống | 18 | 18 | 0 | `speaking-scenarios.ts` HSK3 = 18 | ĐẠT số tình huống |
| 11 | Viết bài/phản hồi | bài | 18 giáo trình, 24 có phản hồi | 0 | 18/24 | `/writing` | |
| 12 | Tutor | bài | 18 | 0 | 18 | `/tutor` | |
| 13 | Đề HSK3 toàn phần | đề | 6, ≥3 mới | 1 (30 câu) | ≥5 | `/hsk-mock` HSK3 = 30 | Cần 6 đề, 3 mới độc lập |
| 14 | Lộ trình 7 ngày/90 ngày | kế hoạch | 1 | 0 (chặn StudyPlan) | 1 | `/onboarding` | **BLOCKER staging** |
| 15 | Game/cộng đồng | hoạt động | — | Một phần | Đa số | | |

**Kết luận HSK 3:** Không đủ vocab (44/600), NP (25/200), đọc (3/25), bài viết, đề mới, audio. **Không đủ bắt đầu học HSK 3.**

**Ước tính HSK 3:** vocab +556 × 0.2h = 111h; NP +35 × 0.45h = 16h; đọc +21 × 1.5h = 32h; viết 18 × 0.5 = 9h; nghe 150 clip × 0.25h = 37.5h; đề 6 × 2h = 12h. Tổng ~220–280h.

---

## 5. HSK 4

**Chuẩn chính thức:** HSK 4 = 1.200 từ (cộng d~), 1.058 chữ. Cấu trúc: nghe + đọc + viết, 100 câu, ~100 phút.

| # | Mục | Đơn vị | Mục tiêu internal | Thực HEAD | Thiếu | File/route | Ghi chú |
|---|-----|--------|-------------------|-----------|-------|------------|---------|
| 01 | Bài học | bài | 40 | 0 isolates | 40 | — | |
| 03 | Chữ Hán nét | chữ | 300 mới | 0 | 300 | — | Chưa có dữ liệu nét |
| 04 | Từ vựng mới/cộng dồn | mục | 1.000 mới / 3.245 cộng dồn | 40 (HSK4) | 1.160 đến official 1.200 | `vocab.ts` HSK4 = 40 | **Thiếu rất lớn** |
| 06 | Điểm NP | điểm | 80 (roadmap target) / 200 internal | 25 | 55–175 | `grammar-questions.ts` HSK4 = 25 | |
| 07 | Đọc | bài | 30 | 3 (level 4) | 27 | `reading.ts` level 4 = 3 | |
| 08 | Nghe | phút | 200 clip, 90–140 giờ | 0 (TTS) | 200 | | |
| 09 | Shadowing | buổi | 50 | 0 | 50 | | |
| 10 | Speaking | tình huống | 20 | 20 | 0 | HSK4 = 20 | ĐẠT |
| 11 | Viết | bài | 20 giáo trình, 32 phản hồi | 0 | 20/32 | `/writing` | |
| 12 | Tutor | bài | 20 | 0 | 20 | `/tutor` | |
| 13 | Đề HSK4 | đề | 6, ≥3 mới | 1 (30 câu) | ≥5 | `/hsk-mock` HSK4 = 30 | |
| 14 | Lộ trình | kế hoạch | 1 | 0 (chặn StudyPlan) | 1 | `/onboarding` | **BLOCKER** |
| 15 | Game/cộng đồng | hoạt động | — | Một phần | Đa số | | |

**Kết luận HSK 4:** Không đủ vocab (40/1200), NP (25/200), đọc (3/30), viết, đề mới, audio. **Không đủ.**

**Ước tính HSK 4:** vocab +1160 × 0.2h = 232h; NP +175 × 0.45h = 79h; đọc +27 × 1.5 = 40h; nghe 200 × 0.25 = 50h; đề 6 × 2 = 12h. Tổng ~420–500h.

---

## 6. HSK 5

| # | Mục | Đơn vị | Mục tiêu internal | Thực HEAD | Thiếu | Ghi chú |
|---|-----|--------|-------------------|-----------|-------|---------|
| 04 | Từ vựng | mục | 1.071 mới / 4.316 cộng dồn | 26 (HSK5) | ~2.229 đến official 2.500 | **Thiếu rất lớn** |
| 06 | Điểm NP | điểm | 100 | 10 | 90 | HSK5 grammar = 10 |
| 07 | Đọc | bài | 36 | 0 | 36 | Chưa có bài đọc HSK5 |
| 08 | Nghe | phút | 240 clip, 120–180 giờ | 0 | 240 | |
| 09 | Shadowing | buổi | 60 | 0 | 60 | |
| 10 | Speaking | tình huống | 22 | 22 | 0 | HSK5 = 22 ĐẠT số |
| 11 | Viết | bài | 22 giáo trình, 40 phản hồi | 0 | 22/40 | |
| 12 | Tutor | bài | 22 | 0 | 22 | |
| 13 | Đề HSK5 | đề | 6, ≥3 mới | 0 (chưa có đề HSK5) | 6 | `/hsk-mock` không có HSK5 |
| 14 | Lộ trình | kế hoạch | 1 | 0 (chặn StudyPlan) | 1 | **BLOCKER** |
| 15 | Game/cộng đồng | hoạt động | — | Một phần | Đa số | |

**Kết luận HSK 5:** Chỉ đủ số tình huống nói (22/22). Todo khác thiếu rất lớn. **Không đủ.**

**Ước tính HSK 5:** vocab +2200 × 0.2 = 440h; NP +90 × 0.45 = 40h; đọc 36 × 1.5 = 54h; nghe 240 × 0.25 = 60h; viết 22 × 0.5 = 11h; đề 6 × 2 = 12h. Tổng ~660–780h.

---

## 7. HSK 6

| # | Mục | Thực HEAD | Thiếu | Ghi chú |
|---|-----|-----------|-------|---------|
| 04 | Từ vựng | 21 (HSK6) | ~2.300 đến official 5.000 | Thiếu rất lớn |
| 06 | Điểm NP | 8 | 192 | HSK6 grammar = 8 |
| 07 | Đọc | 0 | 42 | Chưa có bài HSK6 |
| 08 | Nghe | phút | 300 clip, 160–230 giờ | |
| 09 | Shadowing | buổi | 70 | |
| 10 | Speaking | tình huống | 24 | 24 ĐẠT số | HSK6 = 24 |
| 11 | Viết | bài | 24 giáo trình, 48 phản hồi | 0 | |
| 13 | Đề HSK6 | đề | 6, ≥3 mới | 0 | Chưa có đề HSK6 |
| 14 | Lộ trình | kế hoạch | 1 | 0 | **BLOCKER StudyPlan** |

**Kết luận HSK 6:** Chỉ đủ nói (24/24). **Không đủ.**

---

## 8. HSK 7–9 (bảng chung, tách ra nếu nguồn cho phép)

**Chuẩn:** HSK 7–9 = 5.544 từ mới (cộng dồn 11.000), 1.200 chữ mới (cộng dồn 3.000). Không có đề cương công khai chi tiết HSK 7–9 (chưa chính thức thi rộng rãi) → ghi "chưa xác minh nguồn".

| # | Mục | Thực HEAD (tổng 7–9) | Thiếu | Ghi chú |
|---|-----|----------------------|-------|---------|
| 04 | Từ vựng | 74 (21 HSK7 + 32 HSK8 + 21 HSK9) | ~5.470 đến internal 11.000 | **Thiếu cực lớn** |
| 06 | Điểm NP | 10 | 190 | HSK7-9 grammar = 10 (5+5+5 có thể) |
| 07 | Đọc | 0 | 60 | Chưa có bài HSK 7–9 |
| 08 | Nghe | phút | 400 clip, 240–360 giờ | |
| 09 | Shadowing | buổi | 90 | |
| 10 | Speaking | tình huống | 30 | 30 ĐẠT số | HSK7–9 = 30 |
| 11 | Viết | bài | 30 giáo trình, 60 phản hồi | 0 | |
| 13 | Đề HSK 7–9 | đề | 8, ≥3 mới | 0 | Chưa có đề HSK 7–9 / HSKK / TOCFL thực |
| 14 | Lộ trình | kế hoạch | 1 | 0 | **BLOCKER StudyPlan** |
| 15 | Game/cộng đồng | hoạt động | — | Một phần | Đa số |

**Kết luận HSK 7–9:** Chỉ đủ nói (30/30). Todo khác thiếu cực lớn. HSKK và TOCFL mock chỉ có 4+4 câu trong `hsk-mock.ts`, chưa đủ cấu trúc đề thật.

---

## 9. NGÂN HÀNG KỸ NĂNG & GIỜ HỌC (Section 3.2) — THỰC TẾ TẠI HEAD

| Cấp | Điểm NP thực | Văn bản đọc thực | Clip có câu hỏi thực | Giờ nghe chủ động | Buổi Shadowing | Buổi nói AI thực | Bài viết phản hồi | Đề HSK toàn phần | Tổng giờ (ước) |
|-----|-------------|-------------------|---------------------|-------------------|----------------|------------------|-------------------|------------------|----------------|
| Nhập môn | 0 | 0 | 0 | 0 | 0 | 3 (tình huống) | 0 | 0 (có placement) | 20–30 (dự kiến) |
| HSK 1 | 65 | 15 | 0 | 0 | 0 | 11 | 0 | 1 (HSK1 mock) | 70–100 (dự kiến) |
| HSK 2 | 200 | 16 | 0 | 0 | 0 | 24 | 0 | 1 (HSK2 mock) | 110–160 (dự kiến) |
| HSK 3 | 25 | 3 | 0 | 0 | 0 | 18 | 0 | 1 (HSK3 mock) | 180–260 (dự kiến) |
| HSK 4 | 25 | 3 | 0 | 0 | 0 | 20 | 0 | 1 (HSK4 mock) | 250–360 (dự kiến) |
| HSK 5 | 10 | 0 | 0 | 0 | 0 | 22 | 0 | 0 | 330–470 (dự kiến) |
| HSK 6 | 8 | 0 | 0 | 0 | 0 | 24 | 0 | 0 | 450–600 (dự kiến) |
| HSK 7–9 | 10 | 0 | 0 | 0 | 0 | 30 | 0 | 0 | 650–950 (dự kiến) |

**Ghi chú:** Số giờ là ước tính nội bộ đặc tả (Section 3.2), chưa đo thực tế từ app. Clip có câu hỏi = 0 vì audio chỉ TTS, chưa có file audio thật gắn nhãn. Buổi nói AI = số tình huống (chưa verify AI thật).

---

## 10. VĂN BẢN QUYỀN & NGUỒN (Section 2)

| Tài liệu | URL | Phiên bản | Ngày đối soát | Phạm vi áp dụng | Ghi chú quyền |
|----------|-----|-----------|---------------|-----------------|---------------|
| HSK và thông báo 3.0 | https://www.chinesetest.cn/HSK?lang=en | HSK 2.0/3.0 | 20/11/2026 | Cấu trúc đề, danh mục từ | Giấy phép phân phối dữ liệu bên ngoài **chưa xác nhận** |
| HSKK | https://www.chinesetest.cn/HSKK | — | 20/11/2026 | Nói | Chưa xác nhận |
| TOCFL | https://tocfl.edu.tw/tocfl/index.php/test/cat/list/2 | — | 20/11/2026 | Đọc/nghe | Chưa xác nhận |
| GF0025-2025 (Tiêu chuẩn capacidad) | https://hudong.moe.gov.cn/.../202111/t20211118_580755.html | 2021 | 20/11/2026 | Nhập môn tham chiếu | Dữ liệu nội bộ tự biên soạn, chờ duyệt |

**Danh sách phụ thuộc (thiếu quyền/nguồn):**
1. Audio giọng thật (không phải TTS) cho nghe/dictation — chưa có nguồn, chưa có giấy phép.
2. Dữ liệu nét chữ, thứ tự nét, bộ thủ — chưa có trong repo.
3. Âm Hán Việt đã đối chiếu — chưa có.
4. Quyền chạy migration `public.StudyPlan` trên staging `bqswvmdaqeryiddjvt` — chờ user chạy `db/migrations/002_beta_progress.sql`.
5. API key Gemini/Groq/STT thật — chưa có, không verify AI Speaking/Tutor.

---

## 11. ƯỚC TÍNH GIỜ CÔNG TỔNG HỢP (Section 5)

| Cấp | Nội dung (bỏ qua dùng chung) | Giờ thấp | Giờ cơ sở | Giờ cao | Phụ thuộc chính |
|-----|------------------------------|-----------|-----------|---------|-----------------|
| Nhập môn | 7 bài + pinyin | 24 | 34 | 48 | migration StudyPlan, audio nét |
| HSK 1 | NP +135, viết 12, đề mới 3, audio | 60 | 85 | 120 | chuyên gia NP, audio |
| HSK 2 | vocab +46, đọc +2, viết 15, đề mới 3 | 25 | 38 | 52 | |
| HSK 3 | vocab +556, NP +35, đọc +21, nghe 150, viết, đề 6 | 160 | 240 | 340 | |
| HSK 4 | vocab +1160, NP +175, đọc +27, nghe 200, viết, đề 6 | 300 | 440 | 620 | |
| HSK 5 | vocab +2200, NP +90, đọc 36, nghe 240, viết, đề 6 | 480 | 700 | 1000 | |
| HSK 6 | vocab +2300, NP +192, đọc 42, nghe 300, viết, đề 6 | 600 | 900 | 1300 | |
| HSK 7–9 | vocab +5470, NP +190, đọc 60, nghe 400, viết, đề 8 | 900 | 1400 | 2000 | HSKK/TOCFL chưa rõ |
| **Dùng chung (SM-2, audio player, Tutor, máy thi, game, CMS)** | — | 80 | 140 | 220 | Tính 1 lần |
| **TỔNG (không cộng trùng dùng chung)** | — | **2529** | **3777** | **5420** | |

**Ghi chú:** Giờ dùng chung (SM-2, trình phát, Tutor, máy thi, game, CMS) tính 1 lần, không chia theo cấp. Giả định: 0.2h/mục vocab, 0.45h/điểm NP (soạn+ví dụ+câu+lời giải), 1.5h/bài đọc, 0.25h/clip nghe, 0.5h/bài viết, 2h/đề mới. Nếu chưa có dữ liệu đo → đánh dấu "ước tính sơ bộ".

**Thời gian lịch:** Giả định 4h/làm việc/ngày, 6 ngày/tuần → tổng ~944 ngày người / ~157 tuần (dùng chung đã tính). Đường găng: audio thật, nét chữ, StudyPlan staging, API key AI.

---

## 12. VIỆC CÓ THỂ LÀM NGAY (không chặn bởi StudyPlan/API key)

1. Sửa 42 trùng lặp vocab.ts (todo #2).
2. Sửa roadmap.ts `actual` sai (todo #3).
3. Bổ sung HSK 1: +1 tình huống nói, bắt đầu +NP grammar (todo #4).
4. Kiểm thử hồi quy build/lint/typecheck + test sau mỗi thay đổi.
