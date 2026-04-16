"use client";

import { startTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Locale, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  locale: Locale;
  className?: string;
}

const LanguageToggle = ({ locale, className }: LanguageToggleProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const buildLocalePath = (nextLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      return `/${nextLocale}`;
    }

    segments[0] = nextLocale;
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    return `/${segments.join("/")}${hash}`;
  };

  const handleSwitch = (nextLocale: Locale) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (nextLocale === locale) {
      return;
    }

    event.preventDefault();

    const targetPath = buildLocalePath(nextLocale);

    startTransition(() => {
      const navigate = () => router.replace(targetPath, { scroll: false });

      const maybeDocument = document as Document & {
        startViewTransition?: (callback: () => void) => void;
      };

      if (typeof maybeDocument.startViewTransition === "function") {
        maybeDocument.startViewTransition(navigate);
        return;
      }

      navigate();
    });
  };

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
            onClick={handleSwitch(item)}
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
