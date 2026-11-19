import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PwaRegister } from "@/components/pwa-register";
import { AuthProvider } from "@/lib/auth/context";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Chinese Compass — Học tiếng Trung từ số 0",
  description:
    "Học tiếng Trung từ số 0: pinyin, từ vựng, phản xạ, nghe chép, đọc hiểu và nói cùng AI.",
  applicationName: "Chinese Compass",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Chinese Compass",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b0000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${notoSansSC.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
          <PwaRegister />
        </AuthProvider>
      </body>
    </html>
  );
}
