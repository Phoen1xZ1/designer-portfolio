import type { PortfolioDictionary } from "@/lib/i18n";

type ContactSectionData = PortfolioDictionary["contact"];

interface ContactSectionProps {
  dictionary: ContactSectionData;
}

export default function ContactSection({ dictionary }: ContactSectionProps) {
  return (
    <section id="contact" className="portfolio-section border-t border-foreground/12 pb-24 md:pb-32">
      <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
              {dictionary.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-foreground/70">
              {dictionary.description}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:pt-2">
            {dictionary.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex items-center justify-between gap-6 transition-transform duration-300 hover:translate-x-2"
              >
                <span className="text-[0.66rem] tracking-[0.2em] uppercase text-muted-foreground">
                  {social.label}
                </span>
                <span className="text-base font-semibold text-foreground text-right">
                  {social.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
