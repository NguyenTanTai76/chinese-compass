import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — Chinese Compass",
  description: "Thử học tiếng Trung không cần đăng ký. Dữ liệu lưu trên trình duyệt.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}
