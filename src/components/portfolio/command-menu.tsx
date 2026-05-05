"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import type { Locale, NavigationItem } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface CommandMenuProps {
  sections: NavigationItem[];
  locale: Locale;
  className?: string;
}

interface CommandAction {
  id: string;
  label: string;
  hint?: string;
  group: "Sections" | "Language";
  onSelect: () => void;
}

const CommandMenu = ({ sections, locale, className }: CommandMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previousOverflow = useRef<string>("");

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const buildLocalePath = useCallback(
    (nextLocale: Locale) => {
      const segments = pathname.split("/").filter(Boolean);

      if (segments.length === 0) {
        return `/${nextLocale}`;
      }

      segments[0] = nextLocale;
      const hash = typeof window !== "undefined" ? window.location.hash : "";

      return `/${segments.join("/")}${hash}`;
    },
    [pathname],
  );

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "").trim();

    if (!id) {
      return;
    }

    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const actions = useMemo<CommandAction[]>(() => {
    const sectionActions = sections.map((section) => ({
      id: `section-${section.href}`,
      label: section.label,
      hint: section.href.replace("#", ""),
      group: "Sections" as const,
      onSelect: () => scrollToSection(section.href),
    }));

    const languageActions = locales.map((targetLocale) => ({
      id: `locale-${targetLocale}`,
      label: targetLocale.toUpperCase(),
      hint: targetLocale === locale ? "Current" : "Switch language",
      group: "Language" as const,
      onSelect: () => {
        const targetPath = buildLocalePath(targetLocale);
        router.replace(targetPath, { scroll: false });
      },
    }));

    return [...sectionActions, ...languageActions];
  }, [sections, locale, buildLocalePath, scrollToSection, router]);

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return actions;
    }

    return actions.filter((action) => {
      const haystack = `${action.label} ${action.hint ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [actions, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = previousOverflow.current;
      return;
    }

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleAction = (action: CommandAction) => {
    action.onSelect();
    setOpen(false);
    setQuery("");
  };

  const handleKeyNavigation = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (filteredActions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredActions.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const action = filteredActions[activeIndex];

      if (action) {
        handleAction(action);
      }
    }
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
        aria-label="Open command menu"
      >
        Menu
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-999 flex items-start justify-center bg-black/35 px-4 py-10 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-foreground/15 bg-background/95 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-foreground/10 px-4 py-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyNavigation}
                placeholder="Search sections or languages..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <p className="px-3 py-6 text-sm text-muted-foreground">No matches.</p>
              ) : (
                filteredActions.map((action, index) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleAction(action)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm",
                      index === activeIndex
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <span>{action.label}</span>
                    {action.hint && <span className="text-xs opacity-70">{action.hint}</span>}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandMenu;
