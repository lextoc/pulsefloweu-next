import "./reset.css";
import "./variables.css";
import "./elements.css";
import "./globals.css";

import type { Metadata } from "next";
import { Assistant } from "next/font/google";

import { Snackbar } from "@/components/shared/Snackbar";

const font = Assistant({
  weight: ["300", "400", "500", "700", "800"],
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={font.className}>
        {children}
        <Snackbar />
      </body>
    </html>
  );
}
