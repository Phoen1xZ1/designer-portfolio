import Link from "next/link";

import type { PortfolioDictionary } from "@/lib/i18n";

type WorkSection = PortfolioDictionary["work"];

interface ProjectGatewaysProps {
  dictionary: WorkSection;
}

export default function ProjectGateways({ dictionary }: ProjectGatewaysProps) {
  return (
    <section id="work" className="portfolio-section border-t border-foreground/12">
      <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
        <div className="grid gap-10 xl:grid-cols-12">
          <div className="xl:col-span-5">
            {dictionary.eyebrow ? (
              <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
                {dictionary.eyebrow}
              </p>
            ) : null}
            <h2 className="mt-5 max-w-[13ch] font-heading text-[clamp(1.95rem,4.9vw,4.3rem)] leading-[1.03] tracking-[-0.022em] text-foreground">
              {dictionary.title}
            </h2>
          </div>
          <div className="xl:col-span-7 xl:self-end">
            <p className="mt-3 max-w-[58ch] text-[0.97rem] leading-relaxed text-foreground/86">
              {dictionary.description}
            </p>
          </div>
        </div>

        <div className="mt-12 flex h-[60vh] w-full flex-col gap-4 md:h-[75vh] md:flex-row">
          {dictionary.gateways.map((gateway) => (
            <Link
              key={gateway.id}
              href={gateway.href}
              className="relative flex-1 overflow-hidden rounded-xl bg-muted/20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer md:hover:flex-2"
            >
              <div className="absolute inset-0 bg-black/5 transition-colors duration-700 group-hover:bg-black/40 z-10" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                <h3 className="text-4xl font-bold uppercase tracking-tighter text-foreground transition-colors duration-700 md:text-6xl group-hover:text-white">
                  {gateway.title}
                </h3>
                <p className="text-lg font-medium text-white/0 translate-y-8 transition-all duration-700 delay-100 group-hover:text-white/80 group-hover:translate-y-0">
                  {gateway.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
