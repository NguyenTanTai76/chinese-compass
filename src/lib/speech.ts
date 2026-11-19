"use client";

let cachedVoice: SpeechSynthesisVoice | null = null;
let owner: string | undefined;
export type SpeechPreferences = { rate: number; voice: string; pinyin: boolean };
const defaults: SpeechPreferences = { rate: 1, voice: "", pinyin: false };
const key = (id: string) => `cc_speech_v1:${id}`;

export function setSpeechOwner(id: string | undefined) {
  if (owner !== id) stopSpeaking();
  owner = id;
}

export function loadSpeechPreferences(id = owner): SpeechPreferences {
  try {
    if (id) {
      const value = JSON.parse(window.localStorage.getItem(key(id)) ?? "null");
      if (value && typeof value.rate === "number" && value.rate >= 0.6 && value.rate <= 1.3 &&
        typeof value.voice === "string" && typeof value.pinyin === "boolean") return value;
    }
  } catch { /* Use defaults when device storage is unavailable. */ }
  return defaults;
}

export function saveSpeechPreferences(id: string, value: SpeechPreferences) {
  window.localStorage.setItem(key(id), JSON.stringify(value));
}

function pickChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices();
  if (cachedVoice && voices.some((v) => v.voiceURI === cachedVoice?.voiceURI)) {
    return cachedVoice;
  }
  const zh =
    voices.find((v) => v.lang.toLowerCase() === "zh-cn") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("zh")) ??
    null;
  cachedVoice = zh;
  return zh;
}

export function speakChinese(text: string, rate = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    const prefs = loadSpeechPreferences();
    utterance.rate = Math.min(1.4, Math.max(0.5, rate * prefs.rate));
    const voice = synth.getVoices().find(item => item.voiceURI === prefs.voice && item.lang.toLowerCase().startsWith("zh")) ?? pickChineseVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    synth.speak(utterance);
  });
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export async function speakKokoro(text: string): Promise<boolean> {
  const baseUrl =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_KOKORO_URL
      ? String(process.env.NEXT_PUBLIC_KOKORO_URL).replace(/\/$/, "")
      : null;
  if (!baseUrl || typeof window === "undefined") return false;

  try {
    const res = await fetch(`${baseUrl}/tts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, lang: "zh" }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await new Promise<void>((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = reject;
      audio.play();
    });
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

export function primeVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener(
    "voiceschanged",
    () => {
      cachedVoice = null;
    },
    { once: true },
  );
}
