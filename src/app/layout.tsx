import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "설탭 선생님 탐색",
  description: "데이터 기반의 투명한 대기열 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
