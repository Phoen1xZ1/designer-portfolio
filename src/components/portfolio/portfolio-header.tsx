"use client";

import { useMemo } from "react";

import type { Locale, NavigationItem } from "@/lib/i18n";
import { useActiveSection } from "@/hooks/use-active-section";

import LanguageToggle from "@/components/portfolio/language-toggle";
import ScrollAwareHeader from "@/components/portfolio/scroll-aware-header";
import SpotlightNav from "@/components/portfolio/spotlight-nav";

interface PortfolioHeaderProps {
  locale: Locale;
  brand: string;
  role: string;
  nav: NavigationItem[];
  mobileMenuLabel: string;
}

const getSectionId = (href: string) => href.replace("#", "").trim();

const PortfolioHeader = ({
  locale,
  brand,
  role,
  nav,
  mobileMenuLabel,
}: PortfolioHeaderProps) => {
  const sectionIds = useMemo(() => nav.map((item) => getSectionId(item.href)), [nav]);
  const activeId = useActiveSection(sectionIds);

  return (
    <ScrollAwareHeader>
      <div className="mx-auto max-w-440 px-6 md:px-10 xl:px-16">
        <div className="flex items-center justify-between gap-6 border-b border-foreground/15 py-5 md:py-7">
          <div className="min-w-0">
            <p className="truncate font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-3xl">
              {brand}
            </p>
            <p className="truncate text-[0.66rem] tracking-[0.2em] text-muted-foreground uppercase">
              {role}
            </p>
          </div>

          <SpotlightNav items={nav} activeId={activeId} />

          <div className="flex items-center gap-3">
            <LanguageToggle locale={locale} />
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto border-b border-foreground/12 py-3 md:hidden">
          <span className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
            {mobileMenuLabel}
          </span>
          {nav.map((item) => {
            const id = getSectionId(item.href);
            const isActive = activeId === id;

            return (
              <a
                key={`mobile-${item.href}`}
                href={item.href}
                className="nav-link-mobile"
                data-active={isActive ? "true" : "false"}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </ScrollAwareHeader>
  );
};

export default PortfolioHeader;
