import { ReactNode, Suspense } from "react";

import { PlanLessonStatus } from "@/components/plan-lesson-status";
import { AppNav } from "@/components/app-nav";
import { StudyProgressProvider } from "@/lib/progress";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <AppNav />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-6">
        <StudyProgressProvider><Suspense fallback={null}>{children}<PlanLessonStatus /></Suspense></StudyProgressProvider>
      </main>
    </div>
  );
}
