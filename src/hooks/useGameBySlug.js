import { useMemo } from "react";
import { useGames } from "./useGames";

export const useGameBySlug = (slug) => {
  // 1. Get the raw list of games
  const { games } = useGames(100);

  // 2. FIX: Derive the specific game immediately.
  // "useMemo" remembers this result and only recalculates if 'games' or 'slug' changes.
  // This prevents the "cascading render" error.
  const game = useMemo(() => {
    if (!games || games.length === 0) return null;
    return games.find((g) => g.slug === slug) || null;
  }, [games, slug]);

  return game;
};