"use client";

import { useLeadModal } from "./LeadModalContext";

export default function Header() {
  const openModal = useLeadModal();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="display text-lg font-bold tracking-tight text-ink">
            MCA<span className="text-amber">REVIVE</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 lg:flex">
            <a href="#solutions" className="transition-colors hover:text-ink">Solutions</a>
            <a href="#how" className="transition-colors hover:text-ink">How It Works</a>
            <a href="#results" className="transition-colors hover:text-ink">Results</a>
            <a href="#resources" className="transition-colors hover:text-ink">Resources</a>
            <a href="#faq" className="transition-colors hover:text-ink">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+18885551234" className="hidden text-sm font-semibold text-ink transition-colors hover:text-amber sm:block">
              (888) 555-1234
            </a>
            <button
              onClick={openModal}
              className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink-2 hover:shadow-lg"
            >
              Free Case Review
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sticky conversion bar. Deliberately rendered OUTSIDE <header>:
          the header uses backdrop-blur, and backdrop-filter creates a new
          containing block for fixed-position descendants, which was pinning
          this bar to the bottom of the (short) header instead of the actual
          viewport. Keeping it as a sibling fixes that. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white sm:hidden">
        <a href="tel:+18885551234" className="flex-1 border-r border-line py-3 text-center text-sm font-semibold text-ink">
          Call Now
        </a>
        <button onClick={openModal} className="flex-1 bg-ink py-3 text-center text-sm font-semibold text-white">
          Free Case Review
        </button>
      </div>
    </>
  );
}
