import type { Metadata } from "next";
import { QwenProvider } from "@/components/sites/qwenwork/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "千问办公",
  description: "你的智能工作伙伴，描述需求，直接交付。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="qwen-root flex min-h-full flex-col">
        <QwenProvider>{children}</QwenProvider>
      </body>
    </html>
  );
}
