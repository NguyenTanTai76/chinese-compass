"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import { LEVELS } from "@/lib/content/speaking";
import type { VocabEntry } from "@/lib/content/vocab";
import { saveCard } from "@/lib/progress";
import { speakChinese } from "@/lib/speech";

type Reply = {
  answer: string;
  example: { zh: string; pinyin: string; vi: string };
  word: VocabEntry | null;
  source?: { title: string; href: string };
};
type Turn = { id: string; question: string; reply: Reply };
type Thread = { id: string; turns: Turn[] };

function loadThreads(key: string): Thread[] {
  try {
    const data = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(data) ? data.filter(thread => typeof thread?.id === "string" && Array.isArray(thread.turns)) : [];
  } catch {
    return [];
  }
}

export default function TutorPage() {
  const { user } = useAuth();
  const params = useSearchParams();
  const kind = params.get("kind");
  const id = params.get("lesson");
  if (!user) return null;
  return <Tutor key={user.id} owner={user.id} context={kind && id ? { kind, id } : undefined} />;
}

function Tutor({ owner, context }: { owner: string; context?: { kind: string; id: string } }) {
  const storageKey = `cc_tutor_threads_v1:${owner}`;
  const [threads, setThreads] = useState<Thread[]>([]);
  const [active, setActive] = useState<string>();
  const [draft, setDraft] = useState("");
  const [level, setLevel] = useState("HSK 1");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const controller = useRef<AbortController | null>(null);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  const turns = threads.find(thread => thread.id === active)?.turns ?? [];

  useEffect(() => {
    const saved = loadThreads(storageKey);
    setThreads(saved);
    return () => controller.current?.abort();
  }, [storageKey]);

  function persist(value: Thread[]) {
    setThreads(value);
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      setNotice("Thiết bị không lưu được lịch sử.");
    }
  }

  function stop() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
  }

  function open(id?: string) {
    stop();
    attempt.current = null;
    setActive(id);
    setDraft("");
    setNotice("");
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || controller.current) return;
    const request = new AbortController();
    controller.current = request;
    setBusy(true);
    setNotice("");
    const payload = {
      question, level, context,
      history: turns.slice(-3).flatMap(turn => [{ role: "user", text: turn.question }, { role: "tutor", text: turn.reply.answer }]),
    };
    const body = JSON.stringify(payload);
    if (attempt.current?.body !== body) attempt.current = { body, key: crypto.randomUUID() };
    const key = attempt.current.key;
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: request.signal,
        body: JSON.stringify({ ...payload, idempotencyKey: key }),
      });
      const result = await response.json();
      if (controller.current !== request) return;
      if (!response.ok) {
        setNotice(result.error ?? "Chưa nhận được trả lời.");
        return;
      }
      const id = active ?? crypto.randomUUID();
      const thread = { id, turns: [...turns, { id: key, question, reply: result as Reply }].slice(-30) };
      persist([thread, ...threads.filter(item => item.id !== id)].slice(0, 10));
      setActive(id);
      setDraft("");
      attempt.current = null;
    } catch {
      if (!request.signal.aborted) setNotice("Kết nối gián đoạn. Câu hỏi vẫn còn để thử lại.");
    } finally {
      if (controller.current === request) {
        controller.current = null;
        setBusy(false);
      }
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-primary">Trợ lý AI</h1>
        <p className="text-sm text-muted-foreground">Lịch sử lưu riêng theo tài khoản trên thiết bị này.</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => open()}>Cuộc trò chuyện mới</Button>
        {active && <Button variant="outline" onClick={() => {
          if (window.confirm("Xóa cuộc trò chuyện này khỏi thiết bị?")) {
            persist(threads.filter(item => item.id !== active));
            open();
          }
        }}>Xóa cuộc trò chuyện</Button>}
        <label className="flex items-center gap-2 text-sm">Lịch sử
          <select className="max-w-56 rounded border border-border bg-card p-2" value={active ?? ""} onChange={event => open(event.target.value || undefined)}>
            <option value="">Cuộc trò chuyện mới</option>
            {threads.map(thread => <option key={thread.id} value={thread.id}>{thread.turns[0]?.question.slice(0, 48)}</option>)}
          </select>
        </label>
      </div>
      {turns.map(turn => (
        <section key={turn.id} className="space-y-2 rounded-xl border border-border bg-card p-4">
          <p className="font-semibold">{turn.question}</p>
          <p className="whitespace-pre-wrap">{turn.reply.answer}</p>
          {turn.reply.example.zh && <div className="space-y-1 text-sm">
            <p lang="zh-CN">{turn.reply.example.zh}</p><p>{turn.reply.example.pinyin}</p><p>{turn.reply.example.vi}</p>
            <Button variant="outline" size="sm" onClick={() => void speakChinese(turn.reply.example.zh)}>Nghe ví dụ</Button>
          </div>}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => void navigator.clipboard.writeText(turn.reply.answer).then(
              () => setNotice("Đã sao chép."), () => setNotice("Chưa sao chép được."),
            )}>Sao chép</Button>
            {turn.reply.word && <Button variant="outline" size="sm" onClick={() => {
              if (turn.reply.word) setNotice(saveCard(turn.reply.word) ? "Đã lưu từ." : "Từ đã lưu hoặc đang chờ mở dữ liệu.");
            }}>Lưu từ {turn.reply.word.hanzi}</Button>}
            {turn.reply.source && <Link className="text-sm underline" href={turn.reply.source.href}>{turn.reply.source.title}</Link>}
          </div>
        </section>
      ))}
      <form className="space-y-3 rounded-xl border border-border bg-card p-4" onSubmit={send}>
        <label className="flex items-center gap-2 text-sm">Trình độ
          <select className="rounded border border-border bg-card p-2" value={level} onChange={event => setLevel(event.target.value)}>
            {LEVELS.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label htmlFor="tutor-draft" className="block font-medium">Câu hỏi</label>
        <textarea id="tutor-draft" rows={3} maxLength={1800} required value={draft} onChange={event => setDraft(event.target.value)}
          placeholder="Ví dụ: 了 khác 过 thế nào?" className="w-full rounded border border-border bg-background p-3" />
        <div className="flex gap-2">
          <Button type="submit" disabled={busy || !draft.trim()}>{busy ? "Đang trả lời…" : "Gửi"}</Button>
          {busy && <Button variant="outline" onClick={stop}>Dừng</Button>}
        </div>
      </form>
      {notice && <p role="status">{notice}</p>}
    </div>
  );
}
