import MenuItem from "./MenuItem";
import { useMenuItems } from "../../hooks/useMenuItems";
import { usePromotions } from "../../hooks/usePromotions";

const Menu = () => {
  const {
    filteredItems,
    favoriteItems,
    searchTerm,
    setSearchTerm,
    favorites,
    toggleFavorite,
    isLoading: isMenuLoading,
    error: menuError,
  } = useMenuItems();

  /**
   * Sprint 3 (Justin Xia)
   * I.3: New / Refactored Component(s)
   * This component uses the `usePromotions` custom hook to manage the presentation state of promotions.
   * The hook interacts with `promotionRepository` to fetch external data and `promotionService` to apply 
   * business logic (verifying if promotions are active), keeping this component focused strictly on UI rendering.
   */
  const { promotions, isLoading: isPromoLoading } = usePromotions();

  if (isMenuLoading) {
    return <p className="text-center py-20 text-gray-500">Loading menu...</p>;
  }

  if (menuError) {
    return <p className="text-center py-20 text-red-700">{menuError}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 space-y-10 px-4 sm:px-0">
      {/* Search Filter Form */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Find your craving
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-[#C8102E] outline-none transition-all"
        />
      </section>

      {/* Promotions Section */}
      {!isPromoLoading && promotions.length > 0 && (
        <section className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-400">
          <header className="mb-4 flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <h2 className="text-2xl font-serif font-bold text-[#3B2316]">
              Special Offers
            </h2>
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <li key={promo.id} className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
                <h3 className="text-lg font-bold text-[#C8102E]">{promo.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
                <div className="mt-2 text-sm font-semibold text-green-700">
                  {promo.discountPercentage}% OFF!
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Favorites List (Conditional Render) */}
      {favoriteItems.length > 0 && (
        <section className="bg-[#F7F3E9] p-6 rounded-xl border-2 border-[#C8102E]/20">
          <header className="mb-4 flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <h2 className="text-2xl font-serif font-bold text-[#3B2316]">
              Your Favorites
            </h2>
          </header>
          <ul className="space-y-4">
            {favoriteItems.map((item) => (
              <MenuItem
                key={`fav-${item.id}`}
                item={item}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(item.id)}
                variant="favorite-list"
              />
            ))}
          </ul>
        </section>
      )}

      {/* Main Menu List */}
      <section className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
        <header className="border-b-2 border-amber-500 pb-2 mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-800 tracking-tight">
            Daily Specials
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
            Freshly Prepared
          </p>
        </header>

        {filteredItems.length > 0 ? (
          <ul className="space-y-8">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 italic py-8">
            No items match your search.
          </p>
        )}
      </section>
    </div>
  );
};

export default Menu;