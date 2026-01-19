type NavItem = {
  id: string;
  label: string;
  href: string;
};

export function Navigation() {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", href: "/" },
    { id: "menu", label: "Menu", href: "/menu" },
    { id: "orders", label: "Orders", href: "/orders" },
  ];

  const currentPageId = "menu";

  return (
    <section className="navigation">
      <nav
        aria-label="Primary navigation"
        // CHANGE BEM -> Tailwind
        className="bg-[#C8102E] text-white"
      >
        <a
          href="#main"
          className="absolute left-[-999px] top-0 focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-[#3B2316]"
        >
          Skip to content
        </a>

        <div
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3"
        >
          <a
            href="/"
            aria-label="Team Hortons home"
            className="inline-flex items-center gap-2 font-extrabold tracking-wide no-underline text-inherit"
          >
            <span
              aria-hidden="true"
              className="text-lg"
            >
              ☕
            </span>
            <span
              className="text-base sm:text-lg"
            >
              Team Hortons
            </span>
          </a>

          <ul
            className="m-0 hidden list-none items-center gap-6 p-0 sm:flex"
          >
            {navItems.map((item) => (
              <li
                key={item.id}
                className=""
              >
                <a
                  href={item.href}
                  aria-current={item.id === currentPageId ? "page" : undefined}
                  className="rounded px-2 py-1 text-sm font-semibold no-underline text-inherit hover:bg-white/10 aria-[current=page]:bg-white/15 aria-[current=page]:underline aria-[current=page]:underline-offset-8"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            // CHANGED: Tailwind layout
            className="flex items-center gap-3"
          >
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#C8102E] hover:bg-[#F7F3E9]"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* this is my addtional feature - mobile links */}
        <div
          // add simple mobile stack for small screens
          className="border-t border-white/15 px-5 py-2 sm:hidden"
        >
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {navItems.map((item) => (
              <li key={`${item.id}-mobile`}>
                <a
                  href={item.href}
                  aria-current={item.id === currentPageId ? "page" : undefined}
                  className="block rounded px-2 py-2 text-sm font-semibold no-underline text-inherit hover:bg-white/10 aria-[current=page]:bg-white/15"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
}
