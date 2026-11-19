"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X, LogOut } from "lucide-react";

import { GlobalSearch } from "@/components/global-search";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV = [
  { href: "/dashboard", label: "Trang chính" },
  { href: "/plan", label: "Lịch học" },
  { href: "/intro", label: "Nhập môn" },
  { href: "/pinyin", label: "Pinyin" },
  { href: "/vocab", label: "Từ vựng" },
  { href: "/writing", label: "Luyện viết" },
  { href: "/writing-practice", label: "Viết theo chủ đề" },
  { href: "/reflex", label: "Phản xạ" },
  { href: "/dictation", label: "Nghe chép" },
  { href: "/speaking", label: "Nói cùng AI" },
  { href: "/tutor", label: "Trợ lý AI" },
  { href: "/settings", label: "Cài đặt" },
  { href: "/grammar", label: "Ngữ pháp" },
  { href: "/reading", label: "Đọc hiểu" },
  { href: "/shadowing", label: "Shadowing" },
  { href: "/progress-test", label: "Kiểm tra" },
  { href: "/hsk-mock", label: "Thi thử HSK" },
];

export function AppNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const close = useCallback(() => setOpen(false), []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      toast.error("Chưa thể đăng xuất. Hãy thử lại.");
    }
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 md:hidden">
        <Link href="/dashboard" className="text-lg font-bold text-primary">
          🧭 Chinese Compass
        </Link>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-lg border border-border p-2 text-muted-foreground"
            aria-label="Tìm kiếm"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-lg border border-border p-2 text-primary"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary/10",
              )}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="col-span-2 justify-start">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Button>
          )}
        </nav>
      )}

      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-muted/40 p-4 md:flex">
        <Link href="/dashboard" className="mb-6 text-xl font-bold text-primary">
          🧭 Chinese Compass
        </Link>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-muted-foreground hover:border-primary/40"
        >
          <Search className="h-4 w-4" />
          Tìm nhanh
          <kbd className="ml-auto rounded border border-border px-1 text-[10px]">
            Ctrl K
          </kbd>
        </button>

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10 hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {!loading && user && (
          <div className="mt-auto shrink-0 space-y-2 border-t border-border pt-4">
            <div className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata?.avatar_url ?? undefined} alt="" />
                <AvatarFallback className="text-xs">{userInitial}</AvatarFallback>
              </Avatar>
              <p className="truncate text-sm font-medium" title={user.email}>{user.email}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Button>
          </div>
        )}

        {!loading && !user && (
          <div className="mt-auto border-t border-border pt-4">
            <Link href="/auth/sign-in" className="block w-full text-center">
              <Button className="w-full" size="sm">
                Đăng nhập / Đăng ký
              </Button>
            </Link>
          </div>
        )}
      </aside>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
