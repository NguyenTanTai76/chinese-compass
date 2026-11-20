"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar-lessons";
import { GRAMMAR_QUESTIONS } from "@/lib/content/grammar-questions";
import { DemoProgressProvider, useDemoStudyState } from "@/lib/demo-progress";

const hsk1Lessons = GRAMMAR_LESSONS.filter((l) => l.level === 1);
const hsk1Questions = GRAMMAR_QUESTIONS.filter((q) => q.level === 1);

function GrammarLessons() {
  const [openId, setOpenId] = useState<string | null>(hsk1Lessons[0]?.id ?? null);
  const { addXp } = useDemoStudyState();
  const lesson = openId ? hsk1Lessons.find((l) => l.id === openId) : null;

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-bold text-primary mb-4">Ngữ pháp HSK 1</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <nav className="w-full lg:w-72 flex-1 space-y-1 border-r border-border lg:border-r lg:border-b-0 lg:border-b lg:border-r-0 p-2">
          {hsk1Lessons.map((l) => (
            <Button
              key={l.id}
              variant={openId === l.id ? "primary" : "outline"}
              className="w-full text-left text-sm py-2"
              onClick={() => setOpenId(l.id)}
            >
              {l.title}
            </Button>
          ))}
        </nav>
        <div className="flex-1 p-4">
          {lesson ? (
            <div className="prose prose-sm max-w-none">
              <h3 className="text-primary font-bold">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground">{lesson.description}</p>
              <div className="mt-4 whitespace-pre-wrap font-mono text-sm">{lesson.content}</div>
              <Button variant="outline" onClick={() => addXp(10)} className="mt-4">
                Đánh dấu đã học (+10 XP)
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function GrammarQuiz() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { addXp, logSession } = useDemoStudyState();

  const question = hsk1Questions[index];
  const isCorrect = choice !== null && choice === question.answer;

  const next = () => {
    if (choice === null) return;
    if (isCorrect) setScore((s) => s + 1);
    if (index + 1 >= hsk1Questions.length) {
      setFinished(true);
      logSession({ type: "grammar", score, total: hsk1Questions.length }, score * 2);
      addXp(score * 2);
    } else {
      setIndex((i) => i + 1);
      setChoice(null);
    }
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-bold text-primary mb-4">Trắc nghiệm ngữ pháp HSK 1</h2>
      {finished ? (
        <div className="text-center">
          <p className="text-xl font-bold">Điểm: {score}/{hsk1Questions.length}</p>
          <p className="text-sm text-muted-foreground">+{score * 2} XP</p>
          <Button onClick={() => { setIndex(0); setChoice(null); setScore(0); setFinished(false); }}>Làm lại</Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">Câu {index + 1}/{hsk1Questions.length}</p>
          <p className="text-lg font-medium mb-4">{question.sentence}</p>
          <p className="text-sm text-muted-foreground mb-6">{question.hintVi}</p>
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <Button
                key={i}
                variant={choice === i ? (isCorrect ? "primary" : "danger") : "outline"}
                className="w-full text-left"
                onClick={() => setChoice(i)}
                disabled={choice !== null}
              >
                {opt}
              </Button>
            ))}
          </div>
          {choice !== null && (
            <div className="mt-4 text-sm">
              {isCorrect ? (
                <p className="mt-2 text-sm text-green-600">Đúng — {question.explanation}</p>
              ) : (
                <p className="mt-2 text-sm text-red-600">Sai — Đáp án: {question.options[question.answer]}. {question.explanation}</p>
              )}
            </div>
          )}
          <div className="mt-6">
            <Button onClick={next} disabled={choice === null}>
              {choice === null ? "Chọn đáp án" : index + 1 >= hsk1Questions.length ? "Xem kết quả" : "Câu tiếp"}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

export default function DemoGrammarPage() {
  return (
    <DemoProgressProvider>
      <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-primary">Ngữ pháp HSK 1 — Demo</h1>
          <p className="text-sm text-muted-foreground">Tiến độ lưu trên trình duyệt. Không cần đăng ký.</p>
        </header>
        <div className="grid gap-4 lg:grid-cols-12">
          <GrammarLessons />
          <GrammarQuiz />
        </div>
      </div>
    </DemoProgressProvider>
  );
}
