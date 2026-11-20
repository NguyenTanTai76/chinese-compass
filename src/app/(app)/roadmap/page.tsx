"use client";

import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  ShieldAlert,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ROADMAP,
  coverage,
  missing,
} from "@/lib/content/roadmap";

function levelColor(index: number) {
  const colors = [
    "bg-emerald-50 text-emerald-700 border-emerald-200",
    "bg-blue-50 text-blue-700 border-blue-200",
    "bg-indigo-50 text-indigo-700 border-indigo-200",
    "bg-violet-50 text-violet-700 border-violet-200",
    "bg-amber-50 text-amber-700 border-amber-200",
    "bg-orange-50 text-orange-700 border-orange-200",
    "bg-red-50 text-red-700 border-red-200",
    "bg-rose-50 text-rose-700 border-rose-200",
  ];
  return colors[index % colors.length];
}

function statusBadge(pct: number) {
  if (pct >= 80) return <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Đủ</span>;
  if (pct >= 40) return <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Một phần</span>;
  return <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded">Thiếu</span>;
}

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <GraduationCap className="h-5 w-5" /> Lộ trình học HSK
        </h1>
        <p className="text-sm text-muted-foreground">
          Mỗi cấp có mục tiêu, bài thật, bài ôn và bài kiểm tra. Số liệu theo nội dung có sẵn trong ứng dụng;
          ô ô trắng = còn thiếu giáo trình, không tạo bài rỗng.
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <Target className="h-4 w-4" /> Tóm tắt độ phủ theo cấp
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="pb-2 text-muted-foreground">Cấp</th>
                <th className="pb-2 text-muted-foreground">Mục tiêu</th>
                <th className="pb-2 text-muted-foreground text-right">Từ</th>
                <th className="pb-2 text-muted-foreground text-right">Ngữ pháp</th>
                <th className="pb-2 text-muted-foreground text-right">Đọc</th>
                <th className="pb-2 text-muted-foreground text-right">Nói</th>
                <th className="pb-2 text-muted-foreground text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {ROADMAP.map((level, index) => {
                const vPct = coverage(level.actual.vocab, level.target.vocab);
                const gPct = coverage(level.actual.grammar, level.target.grammar);
                const rPct = coverage(level.actual.reading, level.target.reading);
                const sPct = coverage(level.actual.speaking, level.target.speaking);
                const overall = Math.round((vPct + gPct + rPct + sPct) / 4);
                return (
                  <tr key={level.id} className="border-b border-border hover:bg-muted/30 transition">
                    <td className="py-3">
                      <Link
                        href={`/roadmap/${level.id}`}
                        className={cn(
                          "font-medium text-primary underline",
                          levelColor(index),
                        )}
                      >
                        {level.label}
                      </Link>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground max-w-[200px] truncate" title={level.goal}>
                      {level.goal}
                    </td>
                    <td className="py-3 text-right">{level.actual.vocab} / {level.target.vocab} ({vPct}%)</td>
                    <td className="py-3 text-right">{level.actual.grammar} / {level.target.grammar} ({gPct}%)</td>
                    <td className="py-3 text-right">{level.actual.reading} / {level.target.reading} ({rPct}%)</td>
                    <td className="py-3 text-right">{level.actual.speaking} / {level.target.speaking} ({sPct}%)</td>
                    <td className="py-3 text-center">{statusBadge(overall)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Mục tiêu là参考 nội bộ (dựa trên chuẩn HSK 3.0 / GF0025-2021), chưa liên kết danh mục bên ngoài.
          &quot;Đủ&quot; = đạt ≥80% mọi chỉ tiêu; &quot;Một phần&quot; = 40&ndash;79%; &quot;Thiếu&quot; = dưới 40%.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary">Chi tiết từng cấp</h2>
        {ROADMAP.map((level, index) => (
          <section key={level.id} className="rounded-xl border border-border bg-card p-5 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${levelColor(index)}`}>
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-foreground">{level.label}</h3>
              </div>
              <Link href={`/roadmap/${level.id}`} className="text-sm font-medium text-primary underline">
                Xem chi tiết <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">{level.goal}</p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Thứ tự học</h4>
                <ol className="space-y-1 text-sm text-foreground">
                  {level.order.map((step, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bài thật (mở được)</h4>
                <ul className="space-y-1">
                  {level.lessons.map((item, i) => (
                    <li key={i} className="text-sm">
                      <Link
                        href={item.href}
                        className={cn(
                          "text-primary underline hover:text-primary/80",
                          item.kind === "lesson" && "font-medium",
                        )}
                      >
                        {item.title}{item.level && ` · cấp ${item.level}`}
                      </Link>
                    </li>
                  ))}
                  {level.lessons.length === 0 && <p className="text-xs text-muted-foreground italic">Chưa có bài thật.</p>}
                </ul>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bài kiểm tra</h4>
                <ul className="space-y-1">
                  {level.test.map((item, i) => (
                    <li key={i} className="text-sm">
                      <Link
                        href={item.href}
                        className={cn(
                          "text-primary underline hover:text-primary/80",
                          item.kind === "test" && "font-medium",
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  {level.test.length === 0 && <p className="text-xs text-muted-foreground italic">Chưa có bài kiểm tra.</p>}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Bài ôn tập</h4>
              <ul className="space-y-1 text-sm">
                {level.review.map((item, i) => (
                  <li key={i} className="text-sm">
                    <Link
                      href={item.href}
                      className="text-primary underline hover:text-primary/80"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                {level.review.length === 0 && <p className="text-xs text-muted-foreground italic">Chưa có bài ôn riêng.</p>}
              </ul>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-4 text-xs">
              {["vocab", "grammar", "reading", "speaking"].map((key) => {
                const label = { vocab: "Từ", grammar: "Ngữ pháp", reading: "Đọc", speaking: "Nói" }[key];
                const pct = coverage(level.actual[key as keyof typeof level.actual], level.target[key as keyof typeof level.target]);
                const miss = missing(level.actual[key as keyof typeof level.actual], level.target[key as keyof typeof level.target]);
                return (
                  <div key={key} className="rounded border p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      {statusBadge(pct)}
                    </div>
                    <div className="text-sm font-medium">
                      {level.actual[key as keyof typeof level.actual]} / {level.target[key as keyof typeof level.target]}
                    </div>
                    {miss > 0 && (
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        Thiếu {miss} ({pct}%)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <ShieldAlert className="h-4 w-4" /> Lưu ý độ phủ
        </h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>Nhập môn–HSK 1: đủ lộ trình (dạy → luyện → đánh giá), bài thật mở được và lưu được tiến độ.</li>
          <li>HSK 2: lộ trình có sẵn, giáo trình một phần (từ 254/300, ngữ pháp 136/200, đọc 16/15, nói 5/15).</li>
          <li>HSK 3–4: lộ trình có sẵn, giáo trình còn thiếu lớn (đọc 3 bài/cấp, ít từ vựng).</li>
          <li>HSK 5–9: lộ trình có sẵn, chỉ có từ vựng và nói; chưa có bài đọc thật, đề thi thử HSK 5–9/HSKK/TOCFL.</li>
          <li>Số mục tiêu là参考 nội bộ, chưa liên kết danh mục chính thức bên ngoài; không tạo bài rỗng để đủ chỉ tiêu.</li>
        </ul>
      </section>
    </div>
  );
}
