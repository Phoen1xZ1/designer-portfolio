import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LazyHeroCanvas from "@/components/3d/lazy-hero-canvas";
import ContactSection from "@/components/portfolio/contact-section";
import PortfolioHeader from "@/components/portfolio/portfolio-header";
import ProjectGateways from "@/components/portfolio/project-gateways";
import TechStackMarquee from "@/components/portfolio/tech-stack-marquee";
import WorkflowSection from "@/components/portfolio/workflow-section";
import {
  type Locale,
  getDictionary,
  isLocale,
  locales,
} from "@/lib/i18n";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

const toLocale = (rawLocale: string): Locale => {
  if (!isLocale(rawLocale)) {
    notFound();
  }

  return rawLocale;
};

export const generateStaticParams = () =>
  locales.map((locale) => ({
    locale,
  }));

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return {
    title: `${dictionary.brand} Portfolio`,
    description: dictionary.hero.description,
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const dictionary = getDictionary(locale);

  const mobileMenuLabel = locale === "vi" ? "Muc" : "Sections";

  return (
    <main className="portfolio-shell">
      <div aria-hidden className="portfolio-atmosphere" />
      <div aria-hidden className="portfolio-grid-overlay" />

      <PortfolioHeader
        locale={locale}
        brand={dictionary.brand}
        role={dictionary.role}
        nav={dictionary.nav}
        mobileMenuLabel={mobileMenuLabel}
      />

      <div className="relative z-10 pb-24 md:pb-32">
        <section className="portfolio-section pt-24 md:pt-32 lg:pt-36">
          <div className="mx-auto grid max-w-440 gap-16 px-6 md:px-10 xl:grid-cols-12 xl:px-16">
            <div className="xl:col-span-8">
              <h1 className="mt-2 max-w-[10ch] text-balance font-heading text-[clamp(3.4rem,13vw,10rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-foreground">
                {dictionary.hero.title}
              </h1>

              <p
                data-text-reveal
                className="mt-10 max-w-[54ch] text-[1.06rem] leading-relaxed text-foreground/90"
              >
                {dictionary.hero.description}
              </p>

              <TechStackMarquee />
            </div>

            <aside className="hidden xl:col-span-4 xl:block xl:pt-18">
              <div className="relative h-120 overflow-hidden rounded-[1.8rem] border border-foreground/16 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.44),transparent_56%),linear-gradient(145deg,rgba(16,24,39,0.06),rgba(15,118,110,0.12)_55%,rgba(203,213,225,0.22))]">
                <div className="absolute inset-0">
                  <LazyHeroCanvas />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,249,251,0.08)_0%,rgba(8,15,27,0.2)_100%)]" />
              </div>
            </aside>
          </div>
        </section>

        <ProjectGateways dictionary={dictionary.work} />

        <WorkflowSection dictionary={dictionary.process} />

        <ContactSection dictionary={dictionary.contact} />

        <footer className="mx-auto w-full max-w-440 border-t border-foreground/12 px-6 py-8 text-xs tracking-[0.08em] text-muted-foreground uppercase md:px-10 xl:px-16">
          {dictionary.footerNote}
        </footer>
      </div>
    </main>
  );
}