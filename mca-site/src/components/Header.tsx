export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <div className="display text-lg font-bold tracking-tight text-ink">
          [COMPANY <span className="text-amber">NAME]</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 lg:flex">
          <a href="#solutions" className="hover:text-ink">Solutions</a>
          <a href="#how" className="hover:text-ink">How It Works</a>
          <a href="#results" className="hover:text-ink">Results</a>
          <a href="#resources" className="hover:text-ink">Resources</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+10000000000" className="hidden text-sm font-semibold text-ink sm:block">
            [PHONE]
          </a>
          <a
            href="#apply"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-2"
          >
            Free Case Review
          </a>
        </div>
      </div>

      {/* Mobile sticky conversion bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white sm:hidden">
        <a href="tel:+10000000000" className="flex-1 border-r border-line py-3 text-center text-sm font-semibold text-ink">
          Call Now
        </a>
        <a href="#apply" className="flex-1 bg-ink py-3 text-center text-sm font-semibold text-white">
          Free Case Review
        </a>
      </div>
    </header>
  );
}
