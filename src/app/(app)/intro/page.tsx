"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { INTRO_LESSONS, getIntroLesson } from "@/lib/content/intro-lessons";
import { speakChinese } from "@/lib/speech";
import { logSession } from "@/lib/progress";

function SelfCheck({ lessonId, exercise }: { lessonId: string; exercise: NonNullable<ReturnType<typeof getIntroLesson>>["exercise"] }) {
  const [choice, setChoice] = useState<string>();
  const submitted = useRef(false);
  if (!exercise) return null;
  return (
    <fieldset className="space-y-3">
      <legend className="font-semibold">{exercise.prompt}</legend>
      {exercise.options.map(option => (
        <Button key={option} variant="outline" onClick={() => {
          setChoice(option);
          if (submitted.current) return;
          submitted.current = true;
          logSession({ type: "test", examKind: "unit", examId: lessonId, score: Number(option === exercise.answer), total: 1 }, 0);
        }}>{option}</Button>
      ))}
      {choice && <p role="status">{choice === exercise.answer ? "Chính xác." : "Hãy thử lại."} Đáp án: {exercise.answer}</p>}
    </fieldset>
  );
}

export default function IntroPage() {
  const id = useSearchParams().get("lesson");
  const lesson = id ? getIntroLesson(id) : undefined;
  const previous = lesson?.exercise && INTRO_LESSONS[lesson.order - 2];
  const next = lesson?.exercise && INTRO_LESSONS[lesson.order];

  return (
    <article className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold text-primary">{lesson?.title ?? "Bài nhập môn"}</h1>
      {lesson ? (
        <>
          <p>{lesson.description}</p>
          {previous && <p>Nên học trước <Link className="underline" href={`/intro?lesson=${previous.id}`}>{previous.title}</Link>.</p>}
          <ul className="list-disc space-y-3 pl-5">
            {lesson.content.split("\n").slice(1).map(line => <li key={line}>{line.replace(/^- /, "")}</li>)}
          </ul>
          {lesson.audio && <Button variant="outline" onClick={() => void speakChinese(lesson.audio!)}>Nghe mẫu (TTS)</Button>}
          <SelfCheck key={lesson.id} lessonId={lesson.id} exercise={lesson.exercise} />
          {lesson.completion && <p>{lesson.completion}</p>}
          {next && <Link className="underline" href={`/intro?lesson=${next.id}`}>Bài tiếp theo · {next.title}</Link>}
        </>
      ) : (
        <ul className="space-y-2">
          {INTRO_LESSONS.map(item => <li key={item.id}><Link className="underline" href={`/intro?lesson=${item.id}`}>{item.title}</Link></li>)}
        </ul>
      )}
    </article>
  );
}
