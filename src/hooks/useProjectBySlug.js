import { useMemo } from "react";
import { useAllPortfolioItems } from "./useAllPortfolioItems";

export const useProjectBySlug = (slug) => {
  // 1. Get all items (Client + Ghost + Games)
  const { items } = useAllPortfolioItems();

  // 2. Find the specific project
  const project = useMemo(() => {
    if (!items || items.length === 0) return null;
    return items.find((item) => item.slug === slug);
  }, [items, slug]);

  return project;
};