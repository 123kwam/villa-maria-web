"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export type Tab = { key: string; slug: string; label: string; number: string };

type Ctx = { active: string; activate: (key: string) => void };
const TabsContext = createContext<Ctx | null>(null);

function useMenuTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Must be inside MenuTabs");
  return ctx;
}

type Props = {
  tabs: Tab[];
  defaultKey: string;
  children: React.ReactNode;
};

export function MenuTabs({ tabs, defaultKey, children }: Props) {
  const [active, setActive] = useState(defaultKey);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const match = tabs.find((t) => t.slug === hash || t.key === hash);
    if (match) setActive(match.key);
  }, [tabs]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const activate = useCallback(
    (key: string) => {
      setActive(key);
      const tab = tabs.find((t) => t.key === key);
      if (!tab) return;
      const url = new URL(window.location.href);
      url.hash = `#${tab.slug}`;
      window.history.replaceState(null, "", url);
    },
    [tabs]
  );

  const focusAndCenter = (slug: string) => {
    requestAnimationFrame(() => {
      const btn = document.getElementById(`tab-${slug}`);
      if (!btn) return;
      btn.focus();
      if (window.innerWidth < 768) {
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    });
  };

  const onClick = (tab: Tab) => {
    activate(tab.key);
    if (window.innerWidth < 768) {
      requestAnimationFrame(() => {
        const btn = document.getElementById(`tab-${tab.slug}`);
        btn?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((t) => t.key === active);
    if (idx === -1) return;
    let next = idx;
    switch (e.key) {
      case "ArrowRight":
        next = (idx + 1) % tabs.length;
        break;
      case "ArrowLeft":
        next = (idx - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const nextTab = tabs[next];
    activate(nextTab.key);
    focusAndCenter(nextTab.slug);
  };

  return (
    <TabsContext.Provider value={{ active, activate }}>
      <div ref={sentinelRef} aria-hidden className="h-px" />

      <div
        className={`sticky top-20 z-30 transition-[background-color,backdrop-filter] duration-200 print-hide ${
          stuck ? "bg-vm-cream/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="relative">
          <div
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={onKeyDown}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-6 md:justify-center md:px-10"
          >
            {tabs.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  id={`tab-${tab.slug}`}
                  type="button"
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.slug}`}
                  onClick={() => onClick(tab)}
                  className={`group relative shrink-0 snap-center px-4 pb-3 pt-3 text-sm transition-colors duration-[250ms] ${
                    isActive ? "text-vm-black" : "text-vm-smoke hover:text-vm-black"
                  }`}
                >
                  <span
                    className={`mr-2 font-sans text-[10px] tabular-nums tracking-[0.3em] transition-colors duration-[250ms] ${
                      isActive ? "text-vm-red" : "text-vm-smoke"
                    }`}
                  >
                    {tab.number}
                  </span>
                  <span className="font-sans tracking-wide">{tab.label}</span>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 -bottom-2 h-0.5 bg-vm-red transition-opacity duration-[250ms] ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-30"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-vm-cream to-transparent md:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-vm-cream to-transparent md:hidden"
          />
        </div>
      </div>

      {children}
    </TabsContext.Provider>
  );
}

export function TabPanel({
  sectionKey,
  slug,
  children,
}: {
  sectionKey: string;
  slug: string;
  children: React.ReactNode;
}) {
  const { active } = useMenuTabs();
  const visible = active === sectionKey;
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (visible) setAnimKey((k) => k + 1);
  }, [visible]);

  return (
    <div
      role="tabpanel"
      id={`panel-${slug}`}
      aria-labelledby={`tab-${slug}`}
      hidden={!visible}
      className="menu-category"
    >
      <div key={animKey} className="animate-panel-fade">
        {children}
      </div>
    </div>
  );
}
