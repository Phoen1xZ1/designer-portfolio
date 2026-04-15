import Link from "next/link";

import { Locale, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  locale: Locale;
  className?: string;
}

const LanguageToggle = ({ locale, className }: LanguageToggleProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/80 p-1 backdrop-blur-sm",
        className,
      )}
      aria-label="Language switch"
    >
      {locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={`/${item}`}
            className={cn(
              "inline-flex min-w-11 items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            prefetch
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
