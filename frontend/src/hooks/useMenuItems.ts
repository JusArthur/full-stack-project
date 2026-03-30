import { useEffect, useMemo, useState } from "react";
import type { MenuItem } from "../components/menu/types/menu";
import { menuItemRepository } from "../repositories/menuItemRepository";

interface UseMenuItemsResult {
  /**
   * All menu items loaded from the repository.
   */
  menuItems: MenuItem[];

  /**
   * Items filtered by current searchTerm.
   */
  filteredItems: MenuItem[];

  /**
   * Items marked as favorite by user.
   */
  favoriteItems: MenuItem[];

  /**
   * Current search value used for filtering.
   */
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  /**
   * Favorite ids and toggle helper.
   */
  favorites: number[];
  toggleFavorite: (id: number) => void;

  /**
   * Loading/error states for UI.
   */
  isLoading: boolean;
  error: string | null;

  /**
   * Re-fetch items from repository (useful later when data becomes API-based).
   */
  refresh: () => Promise<void>;
}

/**
 * Sprint 3 Hook (T.1 - Yunfei)
 * Presentation logic only:
 * - loads menu items via repository
 * - manages search & favorites state
 * - derives filtered & favorite lists for UI rendering
 */
export function useMenuItems(): UseMenuItemsResult {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const items = await menuItemRepository.getAll();
      setMenuItems(items);
    } catch {
      setError("Failed to load menu items.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }, [menuItems, searchTerm]);

  const favoriteItems = useMemo(() => {
    return menuItems.filter((item) => favorites.includes(item.id));
  }, [menuItems, favorites]);

  return {
    menuItems,
    filteredItems,
    favoriteItems,
    searchTerm,
    setSearchTerm,
    favorites,
    toggleFavorite,
    isLoading,
    error,
    refresh,
  };
}
