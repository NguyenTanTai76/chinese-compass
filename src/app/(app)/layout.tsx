import { ReactNode } from "react";
import Link from "next/link";

const nav = [
  { href: "/dashboard", label: "Trang chính" },
  { href: "/pinyin", label: "Pinyin" },
  { href: "/vocab", label: "Từ vựng" },
  { href: "/writing", label: "Luyện viết" },
  { href: "/reflex", label: "Phản xạ" },
  { href: "/dictation", label: "Nghe chép" },
  { href: "/speaking", label: "Nói cùng AI" },
  { href: "/grammar", label: "Ngữ pháp" },
  { href: "/reading", label: "Đọc hiểu" },
  { href: "/shadowing", label: "Shadowing" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r border-border bg-muted/40 p-4 hidden md:block">
        <div className="text-xl font-bold text-primary mb-6">🧭 Chinese Compass</div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
