import { promotionsTestData } from "../testData/promotionsTestData";

let promotionsStore = [...promotionsTestData];

export const promotionRepository = {
  async getAll() {
    return [...promotionsStore];
  },

  async create(promotion: { id: string; title: string; description: string; discountPercentage: number; isActive: boolean }) {
    promotionsStore = [promotion, ...promotionsStore];
    return promotion;
  },

  async delete(id: string) {
    const beforeCount = promotionsStore.length;
    promotionsStore = promotionsStore.filter((promo) => promo.id !== id);
    return promotionsStore.length < beforeCount;
  }
};