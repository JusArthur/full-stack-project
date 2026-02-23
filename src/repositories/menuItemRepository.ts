import type { MenuItem } from "../components/menu/types/menu";
import { menuItemsTestData } from "../testData/menuItemsTestData";

/**
 * MenuItem Repository (Sprint 3 - I.1 - Yunfei)
 */
let menuItemsStore: MenuItem[] = structuredClone(menuItemsTestData);

export const menuItemRepository = {
  async getAll(): Promise<MenuItem[]> {
    return structuredClone(menuItemsStore);
  },

  async getById(id: number): Promise<MenuItem | undefined> {
    return menuItemsStore.find((item) => item.id === id);
  },

  async create(item: MenuItem): Promise<MenuItem> {
    menuItemsStore = [...menuItemsStore, item];
    return item;
  },

  async update(id: number, patch: Partial<MenuItem>): Promise<MenuItem | undefined> {
    const existing = menuItemsStore.find((item) => item.id === id);
    if (!existing) return undefined;

    const updated: MenuItem = { ...existing, ...patch };
    menuItemsStore = menuItemsStore.map((item) => (item.id === id ? updated : item));
    return updated;
  },

  async delete(id: number): Promise<boolean> {
    const before = menuItemsStore.length;
    menuItemsStore = menuItemsStore.filter((item) => item.id !== id);
    return menuItemsStore.length < before;
  },

  async reset(): Promise<void> {
    menuItemsStore = structuredClone(menuItemsTestData);
  },
};
