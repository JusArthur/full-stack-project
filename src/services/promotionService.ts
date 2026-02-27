export const promotionService = {
    getValidPromotions(promotions: { isActive: boolean }[]) {
      // Business logic: filter out inactive promotions
      return promotions.filter((promo) => promo.isActive);
    }
  };