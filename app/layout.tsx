import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optimize YSWS",
  description: "Desktop app memory optimization YSWS. Build something incredible and win RAM upgrades."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
