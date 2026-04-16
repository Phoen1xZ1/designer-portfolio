import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LazyHeroCanvas from "@/components/3d/lazy-hero-canvas";
import InfiniteMarquee from "@/components/animations/infinite-marquee";
import LanguageToggle from "@/components/portfolio/language-toggle";
import ScrollAwareHeader from "@/components/portfolio/scroll-aware-header";
import {
  type Locale,
  getDictionary,
  isLocale,
  locales,
} from "@/lib/i18n";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

const CONTACT_EMAIL = "Cherrynguyenle133@gmail.com";
const CONTACT_PHONE = "0975000210";

const workVisuals = [
  "bg-[linear-gradient(140deg,#151515_0%,#2e2e2e_45%,#ceb286_120%)]",
  "bg-[linear-gradient(145deg,#0d1f27_0%,#27424f_52%,#d5be9b_120%)]",
  "bg-[linear-gradient(140deg,#1a1715_0%,#4f3626_48%,#dfc8ab_118%)]",
];

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
  const contactEyebrow = locale === "vi" ? "Hop tac" : "Collaboration";
  const directLineLabel = locale === "vi" ? "Liên hệ trực tiếp" : "Direct line";
  const mobileMenuLabel = locale === "vi" ? "Muc" : "Sections";
  const workIntroLabel = locale === "vi" ? "San pham" : "Projects";
  const processIntroLabel = locale === "vi" ? "Nhip lam viec" : "Workflow";
  const capabilityIntroLabel = locale === "vi" ? "He ky nang" : "Skill stack";
  const testimonialLabel = locale === "vi" ? "Cam nhan" : "Testimonial";
  const notesLabel = locale === "vi" ? "Mô tả" : "Notes";
  const placeholderLabel = locale === "vi" ? "Placeholder du an" : "Project placeholder";
  const marqueeText =
    locale === "vi"
      ? "Editorial Systems • Motion Direction • Story-led UX • Premium Web Craft"
      : "Editorial Systems • Motion Direction • Story-led UX • Premium Web Craft";

  return (
    <main className="portfolio-shell">
      <div aria-hidden className="portfolio-atmosphere" />
      <div aria-hidden className="portfolio-grid-overlay" />

      <ScrollAwareHeader>
        <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
          <div className="flex items-center justify-between gap-6 border-b border-foreground/15 py-5 md:py-7">
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-semibold tracking-[-0.015em] text-foreground">
                {dictionary.brand}
              </p>
              <p className="truncate text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
                {dictionary.role}
              </p>
            </div>

            <nav className="hidden items-center gap-8 text-sm uppercase md:flex">
              {dictionary.nav.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <LanguageToggle locale={locale} />
          </div>

          <div className="flex items-center gap-4 overflow-x-auto border-b border-foreground/12 py-3 md:hidden">
            <span className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
              {mobileMenuLabel}
            </span>
            {dictionary.nav.map((item) => (
              <a key={`mobile-${item.href}`} href={item.href} className="nav-link-mobile">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </ScrollAwareHeader>

      <div className="relative z-10 pb-24 md:pb-32">
        <section className="portfolio-section pt-24 md:pt-32 lg:pt-36">
          <div className="mx-auto grid max-w-440 gap-16 px-6 md:px-10 xl:grid-cols-12 xl:px-16">
            <div className="xl:col-span-8">
              <p className="text-[0.66rem] tracking-[0.21em] text-muted-foreground uppercase">
                {dictionary.hero.eyebrow}
              </p>

              <h1 className="mt-6 max-w-[17.8ch] text-balance font-heading text-[clamp(2.2rem,7.1vw,5.8rem)] leading-[1.03] font-semibold tracking-[-0.022em] text-foreground">
                {dictionary.hero.title}
              </h1>

              <p
                data-text-reveal
                className="mt-10 max-w-[54ch] text-[1.06rem] leading-relaxed text-foreground/90"
              >
                {dictionary.hero.subtitle}
              </p>
              <p
                data-text-reveal
                className="mt-4 max-w-[58ch] text-[0.97rem] leading-relaxed text-muted-foreground"
              >
                {dictionary.hero.description}
              </p>

              <ul className="mt-16 grid gap-8 sm:grid-cols-3">
                {dictionary.stats.map((stat) => (
                  <li key={stat.label} className="border-l border-foreground/18 pl-4">
                    <p className="font-heading text-[clamp(2rem,4.8vw,3.8rem)] leading-none tracking-[-0.03em] text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm text-foreground">{stat.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.detail}</p>
                  </li>
                ))}
              </ul>
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

        <section id="work" className="portfolio-section border-t border-foreground/12">
          <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
            <div className="grid gap-12 xl:grid-cols-12">
              <div className="xl:col-span-5">
                <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {dictionary.work.eyebrow}
                </p>
                <h2 className="mt-5 max-w-[13ch] font-heading text-[clamp(1.95rem,4.9vw,4.3rem)] leading-[1.03] tracking-[-0.022em] text-foreground">
                  {dictionary.work.title}
                </h2>
              </div>

              <div className="xl:col-span-7 xl:self-end">
                <p className="text-[0.68rem] tracking-[0.19em] text-muted-foreground uppercase">{workIntroLabel}</p>
                <p className="mt-3 max-w-[58ch] text-[0.97rem] leading-relaxed text-foreground/86">
                  {dictionary.work.description}
                </p>
              </div>
            </div>

            <ol className="mt-16 border-t border-foreground/16">
              {dictionary.work.items.map((item, index) => (
                <li
                  key={item.title}
                  data-parallax-wrap
                  className="group relative border-b border-foreground/14 py-12 md:py-16"
                >
                  <article className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,32vw)] xl:items-end">
                    <div>
                      <div className="flex items-end gap-4 md:gap-6">
                        <span className="font-mono text-[0.72rem] tracking-[0.2em] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-heading text-[clamp(1.6rem,4.7vw,4.2rem)] leading-[1.02] tracking-[-0.022em] text-foreground">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
                        {item.year} / {item.category}
                      </p>

                      <div className="mt-8 grid gap-8 md:grid-cols-2">
                        <div>
                          <p className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
                            {challengeLabel}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-foreground/84">{item.challenge}</p>
                        </div>
                        <div>
                          <p className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
                            {outcomeLabel}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-foreground/84">{item.outcome}</p>
                        </div>
                      </div>

                      <p className="mt-8 text-[0.66rem] tracking-[0.18em] text-muted-foreground uppercase">
                        {item.tools.join(" • ")}
                      </p>
                    </div>

                    <div className="relative h-52 overflow-hidden md:h-64 xl:h-72">
                      <div className="absolute inset-0 opacity-100 transition-opacity duration-500 xl:opacity-0 xl:group-hover:opacity-100">
                        <div
                          data-parallax-media
                          className={`absolute -inset-y-8 inset-x-0 ${workVisuals[index % workVisuals.length]} transition-transform duration-700 ease-out xl:scale-105 xl:group-hover:scale-100`}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.28))]" />
                        <div className="absolute left-5 top-5 text-[0.62rem] font-semibold tracking-[0.16em] text-white/85 uppercase">
                          {placeholderLabel} {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-5 text-[0.64rem] tracking-[0.16em] text-white/82 uppercase">
                          <span>{item.year}</span>
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <InfiniteMarquee text={marqueeText} className="portfolio-section py-0" />

        <section id="process" className="portfolio-section border-t border-foreground/12">
          <div className="mx-auto grid max-w-440 gap-16 px-6 md:px-10 xl:grid-cols-12 xl:px-16">
            <div className="xl:col-span-4">
              <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
                {dictionary.process.eyebrow}
              </p>
              <h2 className="mt-5 max-w-[12ch] font-heading text-[clamp(1.9rem,4.8vw,4rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
                {dictionary.process.title}
              </h2>
              <p className="mt-7 max-w-[42ch] text-[0.97rem] leading-relaxed text-foreground/82">
                {dictionary.process.description}
              </p>
              <p className="mt-10 text-[0.66rem] tracking-[0.19em] text-muted-foreground uppercase">
                {processIntroLabel}
              </p>
            </div>

            <ol className="space-y-14 xl:col-span-8">
              {dictionary.process.items.map((item, index) => (
                <li
                  key={`${item.period}-${item.role}`}
                  className="grid gap-8 border-l border-foreground/18 pl-6 md:grid-cols-[auto_1fr] md:gap-10 md:pl-8"
                >
                  <span className="font-mono text-[0.66rem] tracking-[0.18em] text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <article>
                    <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                      {item.period}
                    </p>
                    <h3 className="mt-3 font-heading text-[clamp(1.35rem,3.3vw,2.8rem)] leading-[1.04] tracking-[-0.016em] text-foreground">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.studio}</p>

                    <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-foreground/85">
                      {item.description}
                    </p>

                    <p className="mt-6 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
                      {highlightsLabel}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/82">
                      {item.wins.map((win) => (
                        <li key={win} className="pl-4 before:-ml-4 before:pr-2 before:content-['+']">
                          {win}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="capabilities" className="portfolio-section border-t border-foreground/12">
          <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
            <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
              {dictionary.capabilities.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[13ch] font-heading text-[clamp(1.9rem,4.9vw,4.2rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
              {dictionary.capabilities.title}
            </h2>

            <ul className="mt-16 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
              {dictionary.capabilities.items.map((item, index) => (
                <li key={item.title} className="border-t border-foreground/14 pt-6">
                  <p className="text-[0.62rem] tracking-[0.19em] text-muted-foreground uppercase">
                    {capabilityIntroLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-heading text-[clamp(1.35rem,2.7vw,2.15rem)] leading-[1.08] tracking-[-0.012em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/84">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="portfolio-section border-t border-foreground/12">
          <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
            <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">{testimonialLabel}</p>
            <blockquote className="mt-6 max-w-[36ch] font-heading text-[clamp(1.28rem,3.2vw,2.55rem)] leading-[1.1] tracking-[-0.012em] text-foreground">
              &ldquo;{dictionary.testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-8 text-sm font-semibold text-foreground">{dictionary.testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{dictionary.testimonial.role}</p>
          </div>
        </section>

        <section id="contact" className="portfolio-section border-t border-foreground/12 pb-24 md:pb-32">
          <div className="mx-auto grid max-w-440 gap-12 px-6 md:px-10 xl:grid-cols-12 xl:px-16">
            <div className="xl:col-span-8">
              <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">{contactEyebrow}</p>
              <h2 className="mt-5 max-w-[14ch] font-heading text-[clamp(2rem,4.8vw,4.4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
                {dictionary.contact.title}
              </h2>
              <p className="mt-7 max-w-[60ch] text-[0.98rem] leading-relaxed text-foreground/84">
                {dictionary.contact.description}
              </p>
            </div>

            <div className="space-y-6 xl:col-span-4 xl:self-end">
              <a href={`mailto:${CONTACT_EMAIL}`} className="editorial-link block w-fit text-sm">
                {dictionary.contact.primaryAction}
              </a>
              <a href="#work" className="editorial-link block w-fit text-sm">
                {dictionary.contact.secondaryAction}
              </a>

              <div className="border-t border-foreground/16 pt-5">
                <p className="text-[0.64rem] font-semibold tracking-[0.2em] text-foreground uppercase">{directLineLabel}</p>
                <p className="mt-2 text-base font-medium text-foreground">{CONTACT_EMAIL}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{CONTACT_PHONE}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {notesLabel}: concept review, scope framing, and rollout timing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto w-full max-w-440 border-t border-foreground/12 px-6 py-8 text-xs tracking-[0.08em] text-muted-foreground uppercase md:px-10 xl:px-16">
          {dictionary.footerNote}
        </footer>
      </div>
    </main>
  );
}