import { NavLink } from "react-router-dom";

type NavItem = {
  id: string;
  label: string;
  to: string;
};

export function Navigation() {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", to: "/" },
    { id: "menu", label: "Menu", to: "/menu" },
    { id: "orders", label: "Orders", to: "/orders" },
  ];

  return (
    <section className="navigation">
      <nav
        aria-label="Primary navigation"
        className="bg-[#C8102E] text-white"
      >
        <a
          href="#main"
          className="absolute left-[-999px] top-0 focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-[#3B2316]"
        >
          Skip to content
        </a>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <NavLink
            to="/"
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
          </NavLink>

          <ul
            className="m-0 hidden list-none items-center gap-6 p-0 sm:flex"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "rounded px-2 py-1 text-sm font-semibold no-underline text-inherit hover:bg-white/10",
                      isActive ? "bg-white/15 underline underline-offset-8" : "",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div
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
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "block rounded px-2 py-2 text-sm font-semibold no-underline text-inherit hover:bg-white/10",
                      isActive ? "bg-white/15" : "",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
}
