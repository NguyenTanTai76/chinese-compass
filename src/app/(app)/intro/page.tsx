"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INTRO_LESSONS, getIntroLesson } from "@/lib/content/intro-lessons";

export default function IntroPage() {
  const id = useSearchParams().get("lesson");
  const lesson = id ? getIntroLesson(id) : undefined;

  return (
    <article className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold text-primary">{lesson?.title ?? "Bài nhập môn"}</h1>
      {lesson ? (
        <ul className="list-disc space-y-3 pl-5">
          {lesson.content.split("\n").slice(1).map(line => <li key={line}>{line.replace(/^- /, "")}</li>)}
        </ul>
      ) : (
        <ul className="space-y-2">
          {INTRO_LESSONS.map(item => <li key={item.id}><Link className="underline" href={`/intro?lesson=${item.id}`}>{item.title}</Link></li>)}
        </ul>
      )}
    </article>
  );
}
