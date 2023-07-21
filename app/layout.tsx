import "./globals.css";

import type { Metadata } from "next";
import { Palanquin } from "next/font/google";

const palanquin = Palanquin({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracky",
  description: "Track your timesheets with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={palanquin.className}>{children}</body>
    </html>
  );
}
