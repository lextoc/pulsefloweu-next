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
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={palanquin.className}>{children}</body>
    </html>
  );
}
