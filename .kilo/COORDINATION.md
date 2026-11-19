# CHINESE COMPASS — 3 AI COORDINATION PLAN

## Phân chia vai trò (Role Assignment)

| AI | Vai trò chính | Kỹ năng mạnh | Phụ trách mốc |
|----|---------------|--------------|---------------|
| **Kilo Code (session này)** | **Lead / Coordinator / Infra** | Architecture, Supabase, Auth, CI/CD, Testing, Integration | Mốc 1 (hoàn thiện test), Mốc 4 (E2E, quota), Mốc 5 (CMS, payments) |
| **Codex** | **Feature Engineer / Content** | Code generation, algorithms, data processing, scripts | Mốc 2 (Curriculum, Sino-Viet, Planner), Mốc 3 (Pinyin, Vocab, Writing, Reflex, Dictation, Grammar, Reading, Shadowing) |
| **Cline** | **Research / QA / Docs** | Exploration, auditing, test planning, documentation, compliance | Mốc 2 (Audit GF0025, HSK mapping), Mốc 3 (Speaking spec compliance), Mốc 4 (Beta readiness audit), Mốc 5 (Long-term roadmap) |

---

## Task Breakdown by Milestone

### MỐC 1 — Nền tảng đa người dùng (Current: Code done, cần test thực tế)

| Task | Owner | Status | Blocker |
|------|-------|--------|---------|
| Chạy migration `001_init.sql` trên Supabase SQL Editor | **Kilo** | ⬜ Chờ làm | Cần access Supabase Dashboard |
| Tạo 2 user test A/B, verify RLS | **Kilo** | ⬜ Chờ migration | - |
| Test A/B flow đầy đủ (2 trình duyệt, đổi tài khoản) | **Kilo** | ⬜ Chờ user test | - |
| Cấu hình API keys thật (Gemini, Groq) | **Kilo** | ⬜ Chờ làm | Cần keys từ user |
| Fix Next.js version mismatch (16.4.6 vs 14.2.15) | **Kilo** | ⬜ Chờ làm | - |
| Chạy Playwright E2E với 2 tài khoản | **Kilo** | ⬜ Sau keys | Cần dev server + Supabase |
| Cập nhật BETA_READINESS.md với kết quả test | **Kilo** | ⬜ Sau test | - |

---

### MỐC 2 — Giáo trình, Hán Việt, Lộ trình cá nhân (Heavy content + logic)

| Task | Owner | Dependencies |
|------|-------|--------------|
| **Audit GF0025-2021 & HSK mapping** — Đối chiếu chuẩn năng lực, cấp độ, giấy phép | **Cline** | Mốc 1 done |
| **Seed data scripts** — 300 từ HSK 1-2, 200 câu reflex, 200 grammar, 30 reading, audio mapping | **Codex** | Schema ready |
| **Hán Việt integration** — Dictionary lookup, flashcard save, reading popup | **Codex** | Vocab/Reading pages |
| **Onboarding flow** — Trình độ/mục tiêu/ngân sách → sinh lịch 7 ngày | **Codex** | Auth + Profile |
| **Smart Daily Planner** — Greedy fit, adjust khi nghỉ/yếu skill, fallback rules | **Codex** | Planner logic |
| **A/B Planner test** — Hồ sơ A (10p nghe-nói) vs B (30p đọc-thi) khác nhau | **Cline** | Planner done |
| **Content validation** — Degree coverage matrix, attribution, dedup | **Cline** | Seed data |

---

### MỐC 3 — Luyện tập & Speaking (Complex UI + AI pipeline)

| Task | Owner | Dependencies |
|------|-------|--------------|
| `/pinyin` — Tone Trainer có giải thích, pinyin-pro | **Codex** | - |
| `/vocab` — Hanzi Writer, SM-2 optimistic, sync due_at | **Codex** | Mốc 1 sync |
| `/writing` — Stroke animation, handwriting feedback | **Codex** | hanzi-writer |
| `/reflex` — STT, >75% match, equivalent answers | **Codex** | Groq Whisper |
| `/dictation` — Highlight missing/extra/wrong chars | **Codex** | - |
| `/grammar` — Quiz, AI explain Vi, examples | **Codex** | AI provider |
| `/reading` — Leveled, pinyin toggle, dict + save | **Codex** | Content |
| `/shadowing` — Media sync transcript, jump to sentence | **Codex** | Audio rights |
| **Speaking core** — Dual mode, turn-taking, 300s continuous, STT→AI→TTS pipeline | **Codex** | Mốc 1 keys |
| **Speaking feedback** — Score /10, ≤2 errors with Vi explanation, retry compare | **Codex** | AI schema |
| **Speaking summary** — Duration, turns, valid scores, errors, practice phrases | **Codex** | - |
| **Speaking spec compliance audit** — Verify all prompt requirements met | **Cline** | Codex done |
| **Browser test 2'/5' audio** — Mock vs real STT/AI labeling | **Cline** | Keys ready |

---

### MỐC 4 — Đánh giá & Beta 50 (E2E + Quota + PWA)

| Task | Owner | Dependencies |
|------|-------|--------------|
| Placement test (20 câu vocab+grammar+listening) | **Codex** | Question bank |
| Unit/lesson quiz + progress-test 20 câu | **Codex** | - |
| Smart Daily Plan polish + XP/Level/Streak | **Codex** | Mốc 2 planner |
| Cmd/Ctrl+K GlobalSearch (index all content) | **Codex** | Content done |
| PWA offline scope (cache GET, queue POST) | **Codex** | sw.js |
| E2E desktop/mobile full flow | **Kilo** | All features |
| Quota modeling 50 users / 10 concurrent | **Cline** | Real usage data |
| Beta readiness conclusion + disclosure scope | **Kilo** | All tests |

---

### MỐC 5 — Post-beta Scope (Long-term)

| Task | Owner | Note |
|------|-------|------|
| HSK 3-9 content progression | **Codex** | Incremental |
| Pronunciation scoring (per phoneme/tone) | **Codex** | Separate feature |
| AI writing correction (Vietnamese) | **Codex** | Separate feature |
| HSK/HSKK/TOCFL mock bank | **Codex** | Spec-compliant |
| Social features (badges, leaderboard, groups) | **Codex** | Post-beta |
| CMS, payments, analytics | **Kilo** | Infra |
| Roadmap with milestones & criteria in BETA_READINESS.md | **Cline** | Ongoing |

---

## Conflict Avoidance Rules

1. **File ownership** — Mỗi AI own tập file riêng, không edit file của AI khác trừ khi assign
2. **Branch strategy** — Mỗi AI trên worktree/branch riêng, merge qua PR review
3. **Shared contracts** — Type definitions (`src/lib/types.ts`), API schemas, DB schema là shared — thay đổi cần sync 3 bên
4. **Daily sync** — Mỗi session end: update `.kilo/COORDINATION.md` với progress, blockers, next
5. **Blocker escalation** — Nếu blocked >30p, post to board để AI khác unblock hoặc Lead decide

---

## File Ownership Map

```
Kilo Code (Lead/Infra):
├── src/lib/supabase/*
├── src/lib/auth/*
├── src/middleware.ts
├── src/app/api/auth/*
├── src/app/api/progress/*
├── src/app/(auth)/*
├── src/components/app-nav.tsx (user menu)
├── src/app/(app)/dashboard/page.tsx (sync)
├── .github/workflows/*
├── playwright.config.ts
├── docs/BETA_READINESS.md (lead maintainer)

Codex (Features/Content):
├── src/app/(app)/pinyin/*
├── src/app/(app)/vocab/*
├── src/app/(app)/writing/*
├── src/app/(app)/reflex/*
├── src/app/(app)/dictation/*
├── src/app/(app)/grammar/*
├── src/app/(app)/reading/*
├── src/app/(app)/shadowing/*
├── src/app/(app)/speaking/*
├── src/app/(app)/progress-test/*
├── src/app/(app)/onboarding/* (new)
├── src/app/(app)/placement/* (new)
├── src/lib/content/* (seed, vocab, phrases, grammar, reading)
├── src/lib/plan/* (planner logic)
├── src/lib/ai/* (providers, prompts, schemas)
├── prisma/seed.ts
├── scripts/gen-*.ts

Cline (Research/QA/Docs):
├── docs/* (audit reports, compliance checks)
├── tests/* (Playwright specs, test plans)
├── .kilo/COORDINATION.md (daily sync)
├── Content validation scripts
└── Spec compliance checklists
```

---

## Quick Start Commands

```bash
# Kilo (this session) - continue testing M1
cd chinese-compass && npm run dev

# Codex - new worktree for M2 content features
# Will be created via agent_manager

# Cline - new worktree for M2 audit + M3 compliance
# Will be created via agent_manager
```

---

## Next Immediate Actions (This Session - Kilo)

1. [ ] Run Supabase migration (user needs to execute in Dashboard)
2. [ ] Create 2 test accounts A/B
3. [ ] Run A/B browser test
4. [ ] Configure real API keys
5. [ ] Fix Next.js version
6. [ ] Run Playwright E2E
7. [ ] Update BETA_READINESS.md

---

## Agent Manager Setup

Run these to create isolated worktrees for Codex and Cline:

```bash
# For Codex - Feature worktree
agent_manager mode=worktree tasks='[{"name": "Codex-M2-Content", "prompt": "Work on Milestone 2: Curriculum content, seed data, Hán Việt integration, Onboarding, Smart Daily Planner. Own src/app/(app)/pinyin, vocab, writing, reflex, dictation, grammar, reading, shadowing, speaking, onboarding, placement. Own src/lib/content, src/lib/plan, src/lib/ai, prisma/seed.ts. Read docs/BETA_READINESS.md and COORDINATION.md first.", "branchName": "codex/m2-content"}]'

# For Cline - Research/QA worktree  
agent_manager mode=worktree tasks='[{"name": "Cline-M2-Audit", "prompt": "Work on Milestone 2 audit: GF0025-2021 compliance, HSK mapping, content validation. Milestone 3: Speaking spec compliance audit. Milestone 4: Beta readiness audit. Own docs/, tests/, COORDINATION.md. Read BETA_READINESS.md and COORDINATION.md first.", "branchName": "cline/m2-audit"}]'
```