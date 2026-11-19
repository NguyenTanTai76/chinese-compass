import Link from "next/link";
import type { StudyState } from "@/lib/progress";

export type ContinueLearningProps = { state: StudyState };

export function ContinueLearning({ state }: ContinueLearningProps) {
  const hasCards = state.cards.length > 0;
  return (
    <section aria-labelledby="continue-learning" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
      <div>
        <h2 id="continue-learning" className="font-semibold">Học tiếp</h2>
        <p className="text-sm text-muted-foreground">
          {hasCards ? `${state.cards.length} flashcard đã lưu` : "Luyện phát âm và thanh điệu"}
        </p>
      </div>
      <Link className="text-sm font-semibold text-primary hover:underline" href={hasCards ? "/reading" : "/pinyin"}>
        {hasCards ? "Mở bài đọc" : "Luyện Pinyin"}
      </Link>
    </section>
  );
}
