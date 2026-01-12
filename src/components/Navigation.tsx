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
    <nav aria-label="Primary navigation" className="nav">
      <a className="nav__skip" href="#main">
        Skip to content
      </a>

      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="Team Hortons home">
          <span className="nav__logo" aria-hidden="true">
            ☕☕
          </span>
          <span className="nav__title">Team Hortons</span>
        </a>

        <ul className="nav__list">
          {navItems.map((item) => (
            <li className="nav__item" key={item.id}>
              <a
                className="nav__link"
                href={item.href}
                aria-current={item.id === currentPageId ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <button className="nav__button" type="button">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
