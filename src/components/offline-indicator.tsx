"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-900 text-amber-100 px-4 py-2 flex items-center gap-2 text-sm font-medium">
      <WifiOff className="h-4 w-4" />
      Bạn đang làm việc offline. Các bài đã mở sẽ vẫn hoạt động; dữ liệu sẽ đồng bộ khi có mạng.
    </div>
  );
}
