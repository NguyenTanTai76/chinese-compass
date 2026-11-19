"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type RecorderState = "idle" | "requesting" | "recording" | "processing";

export function useRecorder(
  maxSeconds = 300,
  onAutoStop?: (file: File) => void,
) {
  const [state, setState] = useState<RecorderState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blobResolveRef = useRef<((file: File | null) => void) | null>(null);
  const blobPromiseRef = useRef<Promise<File | null> | null>(null);
  const lastBlobRef = useRef<File | null>(null);
  const autoStopRef = useRef(false);
  const onAutoStopRef = useRef(onAutoStop);

  useEffect(() => {
    onAutoStopRef.current = onAutoStop;
  }, [onAutoStop]);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const start = useCallback(async (): Promise<boolean> => {
    if (recorderRef.current) return false;
    setError(null);
    setState("requesting");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
    } catch {
      setState("idle");
      setError("Không truy cập được micro. Hãy cấp quyền micro cho trình duyệt.");
      return false;
    }

    streamRef.current = stream;
    chunksRef.current = [];
    lastBlobRef.current = null;
    autoStopRef.current = false;

    const preferred = "audio/webm;codecs=opus";
    const mimeType = MediaRecorder.isTypeSupported(preferred)
      ? preferred
      : undefined;
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );
    recorderRef.current = recorder;

    blobPromiseRef.current = new Promise<File | null>((resolve) => {
      blobResolveRef.current = resolve;
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const type = recorder.mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type });
      const ext = type.includes("mp4")
        ? "mp4"
        : type.includes("ogg")
          ? "ogg"
          : "webm";
      const file = new File([blob], `recording.${ext}`, { type });
      lastBlobRef.current = file;
      cleanup();
      setState("idle");
      blobResolveRef.current?.(file);
      blobResolveRef.current = null;
      if (autoStopRef.current) {
        autoStopRef.current = false;
        lastBlobRef.current = null;
        onAutoStopRef.current?.(file);
      }
    };

    recorder.start();
    setState("recording");
    setSeconds(0);

    const startedAt = performance.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((performance.now() - startedAt) / 1000);
      setSeconds(Math.min(elapsed, maxSeconds));
      if (elapsed >= maxSeconds) {
        clearInterval(timer);
        timerRef.current = null;
        if (recorder.state !== "inactive") {
          autoStopRef.current = true;
          recorder.stop();
        }
      }
    }, 1000);
    timerRef.current = timer;

    return true;
  }, [cleanup, maxSeconds]);

  const stop = useCallback(async (): Promise<File | null> => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      const pending = lastBlobRef.current;
      lastBlobRef.current = null;
      return pending;
    }
    setState("processing");
    recorder.stop();
    return blobPromiseRef.current ?? null;
  }, []);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = null;
      recorder.stop();
    }
    cleanup();
    blobResolveRef.current?.(null);
    blobResolveRef.current = null;
    lastBlobRef.current = null;
    autoStopRef.current = false;
    setState("idle");
    setSeconds(0);
  }, [cleanup]);

  return {
    state,
    seconds,
    error,
    maxSeconds,
    isRecording: state === "recording",
    isRequesting: state === "requesting",
    isProcessing: state === "processing",
    start,
    stop,
    cancel,
  };
}
