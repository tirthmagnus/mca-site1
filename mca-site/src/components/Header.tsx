export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <div className="display text-lg font-bold tracking-tight text-ink">
          Summit<span className="text-amber">Cap</span>
        </div>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
          <a href="#how" className="hover:text-ink">How it works</a>
          <a href="#industries" className="hover:text-ink">Industries</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+18005551234" className="hidden text-sm font-semibold text-ink sm:block">
            (800) 555-1234
          </a>
          <a
            href="#apply"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-2"
          >
            Apply Now
          </a>
        </div>
      </div>
    </header>
  );
}
