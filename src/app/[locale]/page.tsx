import type { Metadata } from "next";
import { notFound } from "next/navigation";

import InfiniteMarquee from "@/components/animations/infinite-marquee";
import TextRevealRoot from "@/components/animations/text-reveal-root";
import ParallaxPlaceholder from "@/components/portfolio/parallax-placeholder";
import LanguageToggle from "@/components/portfolio/language-toggle";
import LazyHeroCanvas from "@/components/3d/lazy-hero-canvas";
import { type Locale, getDictionary, isLocale, locales } from "@/lib/i18n";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

const CONTACT_INFO = {
  stageName: "Noirr",
  email: "Cherrynguyenle133@gmail.com",
  phone: "0975000210",
};

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

  const challengeLabel = locale === "vi" ? "Bài toán" : "Challenge";
  const outcomeLabel = locale === "vi" ? "Kết quả" : "Outcome";
  const highlightsLabel = locale === "vi" ? "Điểm nổi bật" : "Highlights";
  const stageLabel = locale === "vi" ? "Nghệ danh" : "Stage name";
  const phoneLabel = locale === "vi" ? "Điện thoại" : "Phone";
  const contactLabel = locale === "vi" ? "Liên hệ trực tiếp" : "Direct contact";

  const marqueePrimary =
    locale === "vi"
      ? [
          "Premium Editorial Portfolio",
          "Noirr",
          "Visual Direction",
          "Digital Storytelling",
          "Creative Development",
        ]
      : [
          "Premium Editorial Portfolio",
          "Noirr",
          "Visual Direction",
          "Digital Storytelling",
          "Creative Development",
        ];

  const marqueeSecondary =
    locale === "vi"
      ? [
          "Noirr Studio Practice",
          "Bilingual Portfolio",
          "UI / UX Craft",
          "Motion Direction",
          "Creative Systems",
        ]
      : [
          "Noirr Studio Practice",
          "Bilingual Portfolio",
          "UI / UX Craft",
          "Motion Direction",
          "Creative Systems",
        ];

  return (
    <TextRevealRoot>
      <main>
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 xl:px-12">
          <header className="sticky top-5 z-40 border-b border-border/80 bg-background/92 py-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="font-heading text-lg leading-none font-semibold tracking-tight">
                  {dictionary.brand}
                </p>
                <p className="mt-1 text-xs tracking-[0.08em] text-muted-foreground uppercase">
                  {dictionary.role}
                </p>
              </div>

              <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                {dictionary.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <LanguageToggle locale={locale} />
            </div>
          </header>

          <section className="relative overflow-hidden py-16 md:py-20 xl:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,34vw)] xl:gap-14">
              <div className="relative z-10 max-w-[860px]">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  {dictionary.hero.eyebrow}
                </p>
                <h1
                  data-text-reveal
                  className="mt-5 max-w-[16ch] font-heading text-[clamp(1.9rem,5.2vw,4.3rem)] leading-[1.08] font-semibold tracking-[-0.015em] whitespace-pre-line"
                >
                  {dictionary.hero.title}
                </h1>
                <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                  {dictionary.hero.subtitle}
                </p>
                <p className="mt-3 max-w-[58ch] text-[0.98rem] leading-relaxed text-muted-foreground">
                  {dictionary.hero.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {dictionary.hero.primaryCta}
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {dictionary.hero.secondaryCta}
                  </a>
                </div>
              </div>

              <div className="hidden lg:flex lg:justify-end">
                <div className="relative h-[clamp(20rem,35vw,33rem)] w-[clamp(20rem,35vw,33rem)] overflow-hidden rounded-[1.8rem] bg-linear-to-br from-[#f7f9fc] via-[#edf2f8] to-[#dfe8f1]">
                  <LazyHeroCanvas />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,transparent_34%,rgba(248,250,253,0.84)_100%)]" />
                </div>
              </div>
            </div>

            <div className="mt-10 h-44 overflow-hidden rounded-[1.55rem] bg-linear-to-br from-[#f7f9fc] via-[#edf2f8] to-[#e3eaf2] lg:hidden" />
          </section>

          <section id="work" className="py-24 md:py-32">
            <div className="grid items-end gap-8 lg:grid-cols-12">
              <h2
                data-text-reveal
                className="lg:col-span-8 font-heading text-[clamp(1.7rem,4.6vw,3.65rem)] leading-[1.03] font-semibold tracking-[-0.015em]"
              >
                {dictionary.work.title}
              </h2>
              <p className="lg:col-span-4 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
                {dictionary.work.description}
              </p>
            </div>

            <ul className="mt-16 border-y border-border/80">
              {dictionary.work.items.map((item, index) => (
                <li key={item.title} className="group border-t border-border/80 py-10 first:border-t-0 md:py-14">
                  <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                        {item.year} · {item.category}
                      </p>
                      <h3
                        data-text-reveal
                        className="mt-3 font-heading text-[clamp(1.65rem,4.2vw,3.45rem)] leading-[1.03] font-semibold tracking-[-0.015em]"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-6 lg:col-span-5">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.1em] text-primary uppercase">
                          {challengeLabel}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.challenge}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-[0.1em] text-primary uppercase">
                          {outcomeLabel}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.outcome}
                        </p>
                      </div>

                      <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                        {item.tools.join(" • ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 overflow-hidden">
                    <div className="h-[16rem] md:h-0 md:group-hover:h-[21rem] md:group-focus-within:h-[21rem] transition-[height] duration-700 ease-out">
                      <ParallaxPlaceholder
                        title={item.title}
                        subtitle={`${item.category} Placeholder`}
                        index={index}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <InfiniteMarquee items={marqueePrimary} className="border-y border-border/80" />

          <section id="process" className="py-24 md:py-32">
            <div className="max-w-[82ch]">
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                {dictionary.process.eyebrow}
              </p>
              <h2
                data-text-reveal
                className="mt-4 font-heading text-[clamp(1.65rem,4.2vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.012em]"
              >
                {dictionary.process.title}
              </h2>
              <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                {dictionary.process.description}
              </p>
            </div>

            <div className="mt-16 border-y border-border/80">
              {dictionary.process.items.map((item) => (
                <article
                  key={`${item.period}-${item.role}`}
                  className="grid gap-6 border-t border-border/80 py-10 first:border-t-0 md:py-14 lg:grid-cols-12 lg:gap-10"
                >
                  <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase lg:col-span-3">
                    {item.period}
                  </p>

                  <div className="lg:col-span-4">
                    <h3
                      data-text-reveal
                      className="font-heading text-[clamp(1.32rem,2.5vw,2rem)] leading-[1.1] font-semibold tracking-[-0.005em]"
                    >
                      {item.role}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.studio}</p>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-4 text-xs font-semibold tracking-[0.1em] text-primary uppercase">
                      {highlightsLabel}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.wins.map((win) => (
                        <li key={win}>• {win}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="capabilities" className="border-t border-border/80 py-24 md:py-32">
            <div className="max-w-[85ch]">
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                {dictionary.capabilities.eyebrow}
              </p>
              <h2
                data-text-reveal
                className="mt-4 font-heading text-[clamp(1.65rem,4vw,3.35rem)] leading-[1.04] font-semibold tracking-[-0.01em]"
              >
                {dictionary.capabilities.title}
              </h2>
            </div>

            <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {dictionary.capabilities.items.map((item, index) => (
                <article key={item.title} className="border-t border-border/80 pt-5">
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    data-text-reveal
                    className="mt-3 font-heading text-[clamp(1.25rem,2vw,1.72rem)] leading-[1.1] font-semibold tracking-[-0.005em]"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <InfiniteMarquee
            items={marqueeSecondary}
            className="border-y border-border/80"
            duration={32}
          />

          <section id="contact" className="py-24 md:py-32">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2
                  data-text-reveal
                  className="max-w-[17ch] font-heading text-[clamp(1.72rem,4.2vw,3.45rem)] leading-[1.05] font-semibold tracking-[-0.01em]"
                >
                  {dictionary.contact.title}
                </h2>
                <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                  {dictionary.contact.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {dictionary.contact.primaryAction}
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {dictionary.contact.secondaryAction}
                  </a>
                </div>
              </div>

              <aside className="space-y-6 border-t border-border/80 pt-7 text-sm lg:col-span-4 lg:border-t-0 lg:pl-12 lg:pt-0">
                <p className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
                  {contactLabel}
                </p>

                <div>
                  <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                    {stageLabel}
                  </p>
                  <p className="mt-2 font-heading text-2xl leading-none font-semibold">
                    {CONTACT_INFO.stageName}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="mt-2 block text-base font-medium">
                    {CONTACT_INFO.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">{phoneLabel}</p>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="mt-2 block text-base font-medium">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </aside>
            </div>
          </section>

          <footer className="border-t border-border/80 py-8 text-center text-xs tracking-[0.08em] text-muted-foreground md:text-sm">
            {dictionary.footerNote}
          </footer>
        </div>
      </main>
    </TextRevealRoot>
  );
}