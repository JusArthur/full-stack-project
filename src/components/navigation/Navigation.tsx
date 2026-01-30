import { NavLink } from "react-router-dom";
import { useCart } from "../layout/CartContext";
import { CartDrawer } from "../cart/CartDrawer"; 

type NavItem = {
  id: string;
  label: string;
  to: string;
};

export function Navigation() {
  const { cartCount, setIsCartOpen } = useCart();
  
  const navItems: NavItem[] = [
    { id: "home", label: "Home", to: "/" },
    { id: "menu", label: "Menu", to: "/menu" },
    { id: "orders", label: "Orders", to: "/orders" },
  ];

  return (
    <section className="navigation">
      <nav aria-label="Primary navigation" className="bg-[#C8102E] text-white">
        <a href="#main" className="absolute left-[-999px] top-0 focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-[#3B2316]">
          Skip to content
        </a>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <NavLink to="/" className="inline-flex items-center gap-2 font-extrabold tracking-wide no-underline text-inherit">
            <span aria-hidden="true" className="text-lg">☕</span>
            <span className="text-base sm:text-lg">Team Hortons</span>
          </NavLink>

          <ul className="m-0 hidden list-none items-center gap-6 p-0 sm:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.to} className={({ isActive }) => 
                  `rounded px-2 py-1 text-sm font-semibold no-underline text-inherit hover:bg-white/10 ${isActive ? "bg-white/15 underline underline-offset-8" : ""}`
                }>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>


          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label={`Open cart with ${cartCount} items`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#3B2316] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button type="button" className="hidden sm:block rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#C8102E] hover:bg-[#F7F3E9]">
              Sign in
            </button>
          </div>
        </div>

        <div className="border-t border-white/15 px-5 py-2 sm:hidden">
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {navItems.map((item) => (
              <li key={`${item.id}-mobile`}>
                <NavLink to={item.to} className={({ isActive }) => 
                  `block rounded px-2 py-2 text-sm font-semibold no-underline text-inherit hover:bg-white/10 ${isActive ? "bg-white/15" : ""}`
                }>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <CartDrawer />
    </section>
  );
}