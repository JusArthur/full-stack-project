import { useState, useEffect } from "react";
import { promotionRepository } from "../repositories/promotionRepository";
import { promotionService } from "../services/promotionService";

export function usePromotions() {
  const [promotions, setPromotions] = useState<{ isActive: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const data = await promotionRepository.getAll();
      const validPromotions = promotionService.getValidPromotions(data);
      setPromotions(validPromotions);
    } catch (err) {
      setError("Failed to fetch promotions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return { promotions, isLoading, error };
}