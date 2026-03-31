import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { OPEN_GRAPH_IMAGE_PATH } from "@/shared/config/metadata";

const localizedMetadata: Record<string, Metadata> = {
  pt: {
    title: "Calmia.club",
    description: "Crie o habito de agradecer e orar com mais presenca no seu dia a dia.",
    openGraph: {
      title: "Calmia.club",
      description: "Crie o habito de agradecer e orar com mais presenca no seu dia a dia.",
      siteName: "Calmia.club",
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
    twitter: {
      card: "summary_large_image",
      title: "Calmia.club",
      description: "Crie o habito de agradecer e orar com mais presenca no seu dia a dia.",
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  },
  es: {
    title: "Calmia.club",
    description: "Crea el habito de agradecer y orar con mas presencia en tu vida diaria.",
    openGraph: {
      title: "Calmia.club",
      description: "Crea el habito de agradecer y orar con mas presencia en tu vida diaria.",
      siteName: "Calmia.club",
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
    twitter: {
      card: "summary_large_image",
      title: "Calmia.club",
      description: "Crea el habito de agradecer y orar con mas presencia en tu vida diaria.",
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  },
  en: {
    title: "Calmia.club",
    description: "Build the habit of gratitude and prayer with more presence in your daily life.",
    openGraph: {
      title: "Calmia.club",
      description: "Build the habit of gratitude and prayer with more presence in your daily life.",
      siteName: "Calmia.club",
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
    twitter: {
      card: "summary_large_image",
      title: "Calmia.club",
      description: "Build the habit of gratitude and prayer with more presence in your daily life.",
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return localizedMetadata[locale] || localizedMetadata.en;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  return children;
}
