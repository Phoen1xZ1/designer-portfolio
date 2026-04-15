import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LanguageToggle from "@/components/portfolio/language-toggle";
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

  const challengeLabel = locale === "vi" ? "Bài toán" : "Challenge";
  const outcomeLabel = locale === "vi" ? "Kết quả" : "Outcome";
  const highlightsLabel = locale === "vi" ? "Điểm nổi bật" : "Highlights";

  return (
    <main>
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-4 md:px-10">
        <header className="sticky top-4 z-40 rounded-2xl border border-border bg-background/92 px-4 py-3 backdrop-blur-sm md:px-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-heading text-base font-semibold tracking-tight">
                {dictionary.brand}
              </p>
              <p className="text-xs text-muted-foreground">
                {dictionary.role}
              </p>
            </div>

            <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
              {dictionary.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground/90"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <LanguageToggle locale={locale} />
          </div>
        </header>

        <section className="grid min-h-[72vh] grid-cols-12 items-end gap-10 border-b border-border/80 pb-16 pt-12 md:pt-16">
          <div className="col-span-12 lg:col-span-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary">
              {dictionary.hero.eyebrow}
            </p>

            <h1 className="mt-5 max-w-[16ch] font-heading text-[clamp(2.3rem,5.6vw,4.6rem)] leading-[0.95] font-semibold tracking-[-0.02em] whitespace-pre-line text-foreground">
              {dictionary.hero.title}
            </h1>

            <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-muted-foreground">
              {dictionary.hero.subtitle}
            </p>
            <p className="mt-2 max-w-[64ch] text-[0.96rem] leading-relaxed text-muted-foreground">
              {dictionary.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {dictionary.hero.primaryCta}
              </a>

              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {dictionary.hero.secondaryCta}
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{dictionary.hero.availability}</p>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <aside className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground">{dictionary.role}</p>
              <div className="mt-5 space-y-4">
                {dictionary.stats.map((stat) => (
                  <div key={stat.label} className="border-t border-border/80 pt-4 first:border-t-0 first:pt-0">
                    <p className="font-heading text-3xl leading-none font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="work" className="pt-32 pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="max-w-[60ch]">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {dictionary.work.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.3vw,2.6rem)] leading-tight font-semibold tracking-tight">
                {dictionary.work.title}
              </h2>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-muted-foreground">
                {dictionary.work.description}
              </p>
            </div>

            <div className="space-y-4">
              {dictionary.work.items.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs font-medium tracking-[0.07em] text-muted-foreground">
                      {item.year} · {item.category}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.08em] text-primary">
                        {challengeLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.08em] text-primary">
                        {outcomeLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-border/80 pt-4">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/85"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="border-t border-border/80 pt-32 pb-16">
          <div className="grid gap-8">
            <div className="max-w-[72ch]">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {dictionary.process.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.1vw,2.45rem)] leading-tight font-semibold tracking-tight">
                {dictionary.process.title}
              </h2>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-muted-foreground">
                {dictionary.process.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {dictionary.process.items.map((item) => (
                <article key={`${item.period}-${item.role}`} className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <p className="text-xs font-semibold tracking-[0.08em] text-primary">{item.period}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold leading-tight text-foreground">
                    {item.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.studio}</p>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <p className="mt-4 text-xs font-semibold tracking-[0.08em] text-primary">
                    {highlightsLabel}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                    {item.wins.map((win) => (
                      <li key={win} className="leading-relaxed text-muted-foreground">
                        • {win}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="border-t border-border/80 pt-32 pb-16">
          <div className="grid gap-6">
            <div className="max-w-[68ch]">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {dictionary.capabilities.eyebrow}
              </p>
              <h3 className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-tight">
                {dictionary.capabilities.title}
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dictionary.capabilities.items.map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold tracking-[0.08em] text-primary">
                    0{index + 1}
                  </p>
                  <h4 className="mt-3 font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/80 py-16">
          <blockquote className="max-w-[78ch] text-[1.25rem] leading-relaxed text-foreground/95 md:text-[1.45rem]">
            &ldquo;{dictionary.testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm font-semibold text-foreground">{dictionary.testimonial.author}</p>
          <p className="text-sm text-muted-foreground">{dictionary.testimonial.role}</p>
        </section>

        <section
          id="contact"
          className="grid gap-6 border-t border-border/80 pt-32 pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
        >
          <div className="max-w-[72ch]">
            <h2 className="font-heading text-[clamp(1.8rem,3vw,2.4rem)] leading-tight font-semibold tracking-tight">
                {dictionary.contact.title}
            </h2>
            <p className="mt-3 text-[0.96rem] leading-relaxed text-muted-foreground">
              {dictionary.contact.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="mailto:studio@thuandesign.com"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {dictionary.contact.primaryAction}
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {dictionary.contact.secondaryAction}
            </a>
          </div>
        </section>

        <footer className="border-t border-border/80 py-7 text-center text-xs tracking-[0.06em] text-muted-foreground md:text-sm">
          {dictionary.footerNote}
        </footer>
      </div>
    </main>
  );
}