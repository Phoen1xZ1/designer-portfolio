import type { PortfolioDictionary } from "@/lib/i18n";

type ProcessSection = PortfolioDictionary["process"];

interface WorkflowSectionProps {
  dictionary: ProcessSection;
}

export default function WorkflowSection({ dictionary }: WorkflowSectionProps) {
  return (
    <section id="process" className="portfolio-section border-t border-foreground/12">
      <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
        <div className="grid gap-10 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
              {dictionary.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[12ch] font-heading text-[clamp(1.9rem,4.8vw,4rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
              {dictionary.title}
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
              {dictionary.workflow.designerColTitle}
            </p>
            <ol className="mt-6 space-y-6">
              {dictionary.workflow.designerSteps.map((step) => (
                <li key={`${step.step}-${step.title}`} className="border-l border-foreground/12 pl-5">
                  <p className="font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground">
                    {step.step}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
              {dictionary.workflow.clientColTitle}
            </p>
            <ol className="mt-6 space-y-6">
              {dictionary.workflow.clientSteps.map((step) => (
                <li key={`${step.step}-${step.title}`} className="border-l border-foreground/12 pl-5">
                  <p className="font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground">
                    {step.step}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24">
          <div className="flex items-center justify-between border-b border-foreground/12 pb-4">
            <h3 className="text-[1.1rem] font-semibold text-foreground">
              {dictionary.tos.title}
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {dictionary.tos.items.map((item) => (
              <div key={item.title} className="space-y-3">
                <h4 className="text-base font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
