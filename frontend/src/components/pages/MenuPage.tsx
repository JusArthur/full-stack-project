import { useMenuItems } from "../../hooks/useMenuItems";
import { useMenuReviews } from "../../hooks/useMenuReviews";
import MenuItem from "../menu/MenuItem";

export function MenuPage() {
  const { menuItems, isLoading, error } = useMenuItems();
  const { reviews: allReviews } = useMenuReviews(); 

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-10">
      {isLoading ? (
        <div className="text-center text-lg font-bold text-[#3B2316] py-10">Loading menu...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-bold py-10">{error}</div>
      ) : (
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
      )}
    </main>
  );
}