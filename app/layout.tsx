import "./reset.css";
import "./variables.css";
import "./elements.css";
import "./globals.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Head from "next/head";
import { cookies } from "next/headers";

import validateToken from "@/api/auth/validateToken";
import { User } from "@/api/types/auth";
import NavigationProgress from "@/components/Navigation/Progress";
import Main from "@/components/Shared/Main";
import { AuthenticationProvider } from "@/lib/Authentication/Context";
import NavigationMenu from "@/lib/Navigation/Menu";
import SideNavigation from "@/lib/Navigation/Side";
import QueryClientProvider from "@/lib/Shared/QueryClientProvider";
import Snackbar from "@/lib/Shared/Snackbar";

const font = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracky • The open-source time tracking website",
  description: "The open-source time tracking website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await validateToken(cookies());
  let user: User | null = null;
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
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={font.className}>
        <QueryClientProvider>
          <AuthenticationProvider initialUser={user}>
            <NavigationProgress />
            <NavigationMenu />
            <SideNavigation />
            <Main>{children}</Main>
            <Snackbar />
          </AuthenticationProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
