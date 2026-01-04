import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const MOCK_GAMES = [
  {
    title: "Cyber Racer 2077",
    slug: "cyber-racer",
    description: "High speed racing in a neon city.",
    isVisible: true,
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    tags: ["Racing", "Sci-Fi"],
    createdAt: Timestamp.now(),
    type: "game"
  },
  {
    title: "Forest Guardian",
    slug: "forest-guardian",
    description: "A cozy adventure game.",
    isVisible: true,
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    tags: ["Adventure", "Relaxing"],
    createdAt: Timestamp.now(),
    type: "game"
  }
];

const Seeder = () => {
  const handleSeed = async () => {
    const confirm = window.confirm("This will add mock data to your REAL Firebase DB. Proceed?");
    if (!confirm) return;

    try {
      const gamesRef = collection(db, "games");
      for (const game of MOCK_GAMES) {
        await addDoc(gamesRef, game);
      }
      alert("✅ Data Uploaded! Refresh the page.");
    } catch (error) {
      console.error("Error seeding:", error);
      alert("❌ Error: Check console");
    }
  };

  return (
    <button 
      onClick={handleSeed}
      className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold z-50 hover:bg-red-700"
    >
      [DEV] Seed Database
    </button>
  );
};

export default Seeder;