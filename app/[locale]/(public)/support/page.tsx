import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/shared/config/locales";

const supportEmail = "support.calmia@gmail.com";

interface SupportPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: SupportPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SupportPage" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SupportPage" });
  const products = t.raw("products") as string[];

  return (
    <main
      className="min-h-screen px-3.5 py-7 text-[#2b241c] sm:px-4"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(203, 171, 105, 0.18), transparent 30%), linear-gradient(180deg, #f7f1e8 0%, #efe3d3 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[760px]">
        <section
          className="relative mb-[18px] overflow-hidden rounded-[22px] px-8 py-[34px] text-white shadow-[0_22px_60px_rgba(57,40,22,0.22)] sm:px-8 max-sm:rounded-[18px] max-sm:px-[22px] max-sm:py-7"
          style={{
            background:
              "linear-gradient(135deg, rgba(44, 35, 25, 0.96), rgba(90, 68, 38, 0.95)), url('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=1400&q=80') center/cover",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(222,188,115,0.32),transparent_28%)]" />

          <div className="relative z-10 mb-6 flex items-center gap-3.5">
            <div className="grid size-[50px] place-items-center rounded-full bg-[linear-gradient(135deg,#f5d27b,#c89b3f)] text-2xl text-[#2c2319] shadow-[0_8px_30px_rgba(245,210,123,0.22)]">
              *
            </div>
            <div>
              <div className="text-3xl font-extrabold leading-none text-white max-sm:text-[26px]">
                calmia.club
              </div>
              <span className="mt-1 block text-[13px] font-normal leading-snug text-white/75">
                {t("brandSubtitle")}
              </span>
            </div>
          </div>

          <h1 className="relative z-10 mb-3 max-w-[620px] text-[34px] font-extrabold leading-[1.08] text-white max-sm:text-[28px]">
            {t("title")}
          </h1>
          <p className="relative z-10 max-w-[620px] text-[15px] leading-relaxed text-white/80">
            {t("intro")}
          </p>
        </section>

        <section className="mb-3.5 rounded-2xl border border-[#bc9345]/25 border-l-[5px] border-l-[#c89b3f] bg-[#fffaf2] px-5 py-[18px] shadow-[0_12px_35px_rgba(56,42,26,0.08)]">
          <strong className="mb-2 block text-lg text-[#2b241c]">{t("noticeTitle")}</strong>
          <span className="block text-[13px] font-bold uppercase leading-normal text-[#6e5a3d]">
            {t("noticeText")}
          </span>
        </section>

        <form
          action={`mailto:${supportEmail}`}
          method="post"
          encType="text/plain"
          className="grid gap-3.5"
        >
          <input type="hidden" name="language" value={locale} />

          <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
            <FieldCard htmlFor="name" label={t("nameLabel")} required>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("namePlaceholder")}
                required
                className={inputClassName}
              />
            </FieldCard>

            <FieldCard htmlFor="email" label={t("emailLabel")} required>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                required
                className={inputClassName}
              />
            </FieldCard>
          </div>

          <FieldCard htmlFor="product" label={t("productLabel")} required>
            <select id="product" name="product" required defaultValue="" className={inputClassName}>
              <option value="" disabled>
                {t("productPlaceholder")}
              </option>
              {products.map((product) => (
                <option key={product}>{product}</option>
              ))}
            </select>
          </FieldCard>

          <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
            <FieldCard htmlFor="amount" label={t("amountLabel")} required>
              <input
                id="amount"
                name="amount"
                type="text"
                placeholder={t("amountPlaceholder")}
                required
                className={inputClassName}
              />
            </FieldCard>

            <FieldCard htmlFor="order" label={t("orderLabel")}>
              <input
                id="order"
                name="order"
                type="text"
                placeholder={t("orderPlaceholder")}
                className={inputClassName}
              />
            </FieldCard>
          </div>

          <FieldCard htmlFor="reason" label={t("reasonLabel")} required>
            <textarea
              id="reason"
              name="reason"
              placeholder={t("reasonPlaceholder")}
              required
              className={`${inputClassName} min-h-24 resize-y font-[inherit]`}
            />
          </FieldCard>

          <FieldCard htmlFor="additional" label={t("additionalLabel")}>
            <textarea
              id="additional"
              name="additional"
              placeholder={t("additionalPlaceholder")}
              className={`${inputClassName} min-h-24 resize-y font-[inherit]`}
            />
          </FieldCard>

          <section className="mt-0.5 rounded-[18px] bg-[#2c2319] p-6 text-white shadow-[0_18px_45px_rgba(44,35,25,0.18)]">
            <h2 className="mb-2.5 text-lg font-bold text-white">{t("footerTitle")}</h2>
            <p className="text-sm leading-relaxed text-white/75">{t("footerText")}</p>

            <div className="mt-4 flex items-center justify-between gap-3.5 max-sm:flex-col max-sm:items-stretch">
              <span className="text-xs text-white/60">{t("secureText")}</span>
              <button
                type="submit"
                className="cursor-pointer rounded-full border-0 bg-[linear-gradient(135deg,#f6d57e,#c89b3f)] px-6 py-3.5 text-sm font-extrabold text-[#2c2319] shadow-[0_12px_28px_rgba(200,155,63,0.24)] transition hover:-translate-y-px hover:shadow-[0_16px_34px_rgba(200,155,63,0.32)] max-sm:w-full"
              >
                {t("submit")}
              </button>
            </div>
          </section>
        </form>

        <p className="mt-3.5 text-center text-xs leading-normal text-[#8a7553]">{t("smallNote")}</p>
      </div>
    </main>
  );
}

const inputClassName =
  "w-full border-0 border-b border-[#372b1d]/25 bg-transparent px-0.5 py-2.5 text-[15px] text-[#2b241c] outline-none transition placeholder:text-[#3c3021]/45 focus:border-[#c89b3f]";

function FieldCard({
  htmlFor,
  label,
  required = false,
  children,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-[#6d593a]/15 bg-white/85 px-[22px] pb-5 pt-[22px] shadow-[0_14px_35px_rgba(56,42,26,0.08)] backdrop-blur">
      <label htmlFor={htmlFor} className="mb-3 block text-sm font-extrabold text-[#2f271c]">
        {label}
        {required && <span className="ml-0.5 text-[#b4862d]">*</span>}
      </label>
      {children}
    </div>
  );
}
