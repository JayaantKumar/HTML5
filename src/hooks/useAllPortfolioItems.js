import { useMemo } from "react";
import { useGames } from "./useGames";

// MOCK DATA: Client Projects
const MOCK_CLIENT_PROJECTS = [
  {
    id: "c1",
    type: "client",
    title: "Bank App UI",
    slug: "bank-app-ui",
    bannerUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    clientUrl: "https://example.com",
    createdAt: new Date("2025-11-15"),
    tags: ["FinTech", "React"],
  }
];

// MOCK DATA: Ghost/Experimental
const MOCK_GHOST = [
  {
    id: "g1",
    type: "ghost",
    title: "Neon Shader Test",
    slug: "neon-shader",
    bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date("2025-10-01"),
    tags: ["WebGL", "Experiment"],
  }
];

export const useAllPortfolioItems = () => {
  // 1. Get games and loading state directly
  const { games, loading: gamesLoading } = useGames(100);

  // 2. Derive the merged list immediately using useMemo
  // This runs only when 'games' changes, avoiding the useEffect loop.
  const items = useMemo(() => {
    // Tag games with type 'game'
    const formattedGames = games.map(g => ({ ...g, type: "game" }));
    
    // Merge everything
    const allItems = [
      ...formattedGames, 
      ...MOCK_CLIENT_PROJECTS, 
      ...MOCK_GHOST
    ];

    // Sort by date (Newest First)
    // We use a safe date conversion to handle both mock Dates and Strings
    allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return allItems;
  }, [games]);

  return { items, loading: gamesLoading };
};