"use client";

let cachedVoice: SpeechSynthesisVoice | null = null;

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
    utterance.rate = rate;
    const voice = pickChineseVoice();
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
