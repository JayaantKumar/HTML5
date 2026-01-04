import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export const useGames = (fetchLimit = 10) => {
  // 🔴 IMPORTANT: Must initialize with [] (empty array), NOT empty/undefined
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const gamesRef = collection(db, "games");
        
        // Query: Visible games only
        const q = query(
          gamesRef,
          where("isVisible", "==", true),
          limit(fetchLimit)
        );

        const snapshot = await getDocs(q);
        
        const gamesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Handle Firestore Timestamps safely
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date()
        }));

        setGames(gamesList);
      } catch (error) {
        console.error("Error fetching games:", error);
        // On error, keep games as [] so app doesn't crash
        setGames([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [fetchLimit]);

  return { games, loading };
};