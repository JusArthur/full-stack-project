import React, { useState, useMemo } from "react";
import MenuItem from "./MenuItem";
import { menuData } from "./data/menuData";

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Filter items for the main list based on search
  const filteredItems = useMemo(() => {
    return menuData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Derive favorite items object
  const favoriteItems: typeof menuData = menuData.filter((item) => favorites.includes(item.id));

  return (
    <div className="max-w-3xl mx-auto my-10 space-y-10 px-4 sm:px-0">
      
      {/* Search Filter Form */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
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

      {/* Favorites List (Conditional Render) */}
      {favoriteItems.length > 0 && (
        <section className="bg-[#F7F3E9] p-6 rounded-xl border-2 border-[#C8102E]/20">
          <header className="mb-4 flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <h2 className="text-2xl font-serif font-bold text-[#3B2316]">Your Favorites</h2>
          </header>
          <ul className="space-y-4">
            {favoriteItems.map((item) => (
              <MenuItem
                key={`fav-${item.id}`}
                item={item}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(item.id)}
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