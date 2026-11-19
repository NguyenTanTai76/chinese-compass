import { ReactNode } from "react";

import { AppNav } from "@/components/app-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <AppNav />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
