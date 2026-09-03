"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLeadModal } from "./LeadModalContext";
import { PHONE_DISPLAY, PHONE_TEL, hasPhone } from "@/lib/site";

const nav = [
  ["Solutions", "#solutions"],
  ["Process", "#how"],
  ["Stories", "#results"],
  ["Resources", "#resources"],
  ["FAQ", "#faq"],
] as const;

export default function Header() {
  const openModal = useLeadModal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/8 bg-ink/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-8">
          <a href="#top" className="display shrink-0 text-[17px] font-bold tracking-[-0.04em] text-white sm:text-xl">
            MCA<span className="text-amber">REVIVE</span>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-white/65 lg:flex">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-white">{label}</a>
            ))}
          </nav>

          <div className="flex min-w-0 items-center gap-2.5">
            {hasPhone && (
              <a href={`tel:${PHONE_TEL}`} className="hidden text-sm font-semibold text-white/75 transition-colors hover:text-amber md:block">
                {PHONE_DISPLAY}
              </a>
            )}
            <button
              onClick={openModal}
              className="whitespace-nowrap rounded-full bg-amber px-3.5 py-2.5 text-xs font-bold text-ink transition hover:bg-amber-2 sm:px-5 sm:text-sm"
            >
              Free Case Review
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-ink px-4 pb-5 pt-2 lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1">
              {nav.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div
        className="fixed inset-x-0 bottom-0 z-40 flex min-h-[var(--mobile-bar-height)] items-center gap-2 border-t border-line bg-[rgba(255,253,248,.96)] px-3 pt-2 backdrop-blur-xl sm:hidden"
        style={{ paddingBottom: "calc(.5rem + env(safe-area-inset-bottom))" }}
      >
        {hasPhone && (
          <a href={`tel:${PHONE_TEL}`} className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-ink/15 px-3 text-center text-sm font-semibold text-ink">
            Call {PHONE_DISPLAY}
          </a>
        )}
        <button onClick={openModal} className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-ink px-3 text-center text-sm font-semibold text-white">
          Free Case Review
        </button>
      </div>
    </>
  );
}
