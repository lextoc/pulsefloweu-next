import "./reset.css";
import "./variables.css";
import "./elements.css";
import "./globals.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Head from "next/head";
import { cookies } from "next/headers";

import validateToken from "@/api/auth/validateToken";
import { IUser } from "@/api/types/auth";
import Main from "@/components/shared/Main";
import NavigationMenu from "@/components/shared/Navigation/NavigationMenu";
import SideNavigation from "@/components/shared/Navigation/SideNavigation";
import { Snackbar } from "@/components/shared/Snackbar";

const font = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracky • Track your timesheets with ease",
  description: "Track your timesheets with ease",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await validateToken(cookies());
  let user: IUser | null = null;
  if (response.success) user = response.data;

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={font.className}>
        <NavigationMenu user={user} />
        <SideNavigation user={user} />
        <Main user={user}>{children}</Main>
        <Snackbar />
      </body>
    </html>
  );
}
