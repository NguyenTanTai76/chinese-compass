"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-lg font-bold text-primary">Đã xảy ra lỗi</h2>
      <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded bg-primary px-4 py-2 text-white">Thử lại</button>
    </div>
  );
}
