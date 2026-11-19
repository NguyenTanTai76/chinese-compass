"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { WRITING_PROMPTS, type WritingPrompt } from "@/lib/content/writing-prompts";

type Feedback = { strengths: string; revision: string; explanation: string };

function Draft({ task }: { task: WritingPrompt }) {
  const [draft, setDraft] = useState("");
  const [feedback, setFeedback] = useState<Feedback>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setFeedback(undefined);
    try {
      const response = await fetch("/api/writing-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id, draft }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Chưa lấy được góp ý.");
        return;
      }
      setFeedback(data);
    } catch {
      setError("Kết nối gián đoạn. Bản nháp vẫn còn để thử lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p>{task.instruction}</p>
      <fieldset className="space-y-2">
        <legend className="font-medium">Tự rà bài</legend>
        {task.checklist.map(item => (
          <label key={item} className="flex items-start gap-2">
            <input className="mt-1" type="checkbox" /> {item}
          </label>
        ))}
      </fieldset>
      <form className="space-y-3" onSubmit={submit}>
        <label htmlFor="draft" className="block font-medium">Bản nháp tiếng Trung</label>
        <textarea id="draft" lang="zh-CN" rows={8} maxLength={3000} required value={draft}
          onChange={event => setDraft(event.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3" />
        <Button type="submit" disabled={busy || !draft.trim()}>{busy ? "Đang nhận góp ý…" : "Gửi bài cho AI góp ý"}</Button>
      </form>
      {error && <p role="alert">{error}</p>}
      {feedback && (
        <dl aria-live="polite" className="space-y-2">
          <dt className="font-semibold">Điểm tốt</dt><dd>{feedback.strengths}</dd>
          <dt className="font-semibold">Gợi ý sửa</dt><dd lang="zh-CN">{feedback.revision}</dd>
          <dt className="font-semibold">Vì sao</dt><dd>{feedback.explanation}</dd>
        </dl>
      )}
    </section>
  );
}

export default function WritingPracticePage() {
  const [index, setIndex] = useState(0);
  const task = WRITING_PROMPTS[index];
  return (
    <main className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Viết theo chủ đề</h1>
      <label className="flex flex-wrap items-center gap-2">
        Mức tham khảo
        <select className="rounded-md border border-border bg-card p-2" value={index}
          onChange={event => setIndex(Number(event.target.value))}>
          {WRITING_PROMPTS.map((item, position) => (
            <option key={item.id} value={position}>{item.level}</option>
          ))}
        </select>
      </label>
      <Draft key={task.id} task={task} />
    </main>
  );
}
