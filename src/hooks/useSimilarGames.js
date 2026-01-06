import { useMemo } from "react";
import { useGames } from "./useGames";

export const useSimilarGames = (currentGameId, currentTags = []) => {
  const { games } = useGames(50); // Fetch a pool of games

  const similarGames = useMemo(() => {
    if (!games || games.length === 0 || !currentTags) return [];

    return games
      .filter(game => {
        // 1. Don't include the current game itself
        if (game.id === currentGameId) return false;
        
        // 2. Check for matching tags
        const hasMatchingTag = game.tags?.some(tag => currentTags.includes(tag));
        return hasMatchingTag;
      })
      // 3. Sort by number of matching tags (optional) or just take first 4
      .slice(0, 4); 
  }, [games, currentGameId, currentTags]);

  return similarGames;
};