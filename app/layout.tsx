import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';

import { OPEN_GRAPH_IMAGE_PATH } from "@/shared/config/metadata";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calmia.club",
  description: "Calmia.club ajuda voce a criar o habito de agradecer e orar com mais presenca no dia a dia.",
  openGraph: {
    title: "Calmia.club",
    description: "Calmia.club ajuda voce a criar o habito de agradecer e orar com mais presenca no dia a dia.",
    images: [OPEN_GRAPH_IMAGE_PATH],
    siteName: "Calmia.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calmia.club",
    description: "Calmia.club ajuda voce a criar o habito de agradecer e orar com mais presenca no dia a dia.",
    images: [OPEN_GRAPH_IMAGE_PATH],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className="antialiased">
         <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
