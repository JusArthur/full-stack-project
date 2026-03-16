import React from "react";
import MenuItem from "./MenuItem";
import { useMenuItems } from "../../hooks/useMenuItems";
import { useMenuReviews } from "../../hooks/useMenuReviews";

/* * ARCHITECTURE INTEGRATION COMMENT:
 * Invokes `useMenuReviews` without an ID to fetch all system-wide reviews globally.
 * This separates concerns by relying on the service-repository pipeline to provide the total.
 */
const Menu: React.FC = () => {
  const { menuItems } = useMenuItems();
  const { reviews: allReviews } = useMenuReviews(); 

  if (!menuItems || menuItems.length === 0) return <div>Loading menu...</div>;

  return (
    <section className="max-w-4xl mx-auto p-6 mt-8 mb-16 bg-white shadow-xl rounded-2xl border border-gray-100">
      <header className="border-b-2 border-amber-500 pb-2 mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 tracking-tight">
          Daily Specials
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
          Freshly Prepared • Loved by {allReviews.length} total reviewers
        </p>
      </header>
      
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default Menu;