import { db } from "../../firebase";
import { collection, addDoc, Timestamp, getDocs, writeBatch } from "firebase/firestore";

const MOCK_GAMES = [
  // --- ACTION ---
  {
    title: "Cyber Shooter",
    slug: "cyber-shooter",
    description: "Blast through neon enemies in this fast-paced action shooter.",
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    tags: ["Action", "Shooter", "Sci-Fi"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },
  {
    title: "Ninja Run",
    slug: "ninja-run",
    description: "Jump, slide, and slice your way through ancient dojos.",
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
    tags: ["Action", "Jump & Run", "Arcade"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- PUZZLE & MATCH 3 ---
  {
    title: "Jewel Crush Saga",
    slug: "jewel-crush",
    description: "Match 3 sparkling gems to clear the board.",
    bannerUrl: "https://images.unsplash.com/photo-1611996996137-bcf55079f17d?auto=format&fit=crop&q=80&w=600",
    tags: ["Puzzle", "Match 3", "Casual"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },
  {
    title: "Block Master 3D",
    slug: "block-master",
    description: "Fit the blocks together in this relaxing puzzle game.",
    bannerUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600",
    tags: ["Puzzle", "Strategy"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- BUBBLE SHOOTER ---
  {
    title: "Ocean Bubbles",
    slug: "ocean-bubbles",
    description: "Pop bubbles under the sea! Classic arcade fun.",
    bannerUrl: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=80&w=600",
    tags: ["Bubble Shooter", "Arcade", "Casual"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- RACING ---
  {
    title: "Neon Drift",
    slug: "neon-drift",
    description: "High speed drifting on cyberpunk tracks.",
    bannerUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    tags: ["Racing", "Cars", "Sport"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },
  {
    title: "Highway Racer",
    slug: "highway-racer",
    description: "Dodge traffic and reach the finish line.",
    bannerUrl: "https://images.unsplash.com/photo-1547754980-3df97fed72a8?auto=format&fit=crop&q=80&w=600",
    tags: ["Racing", "Action"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- SPORTS ---
  {
    title: "Super Soccer Star",
    slug: "super-soccer",
    description: "Score the winning goal in the world cup final.",
    bannerUrl: "https://images.unsplash.com/photo-1579952363873-27f3bde9be2e?auto=format&fit=crop&q=80&w=600",
    tags: ["Sport", "Soccer", "Multiplayer"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },
  {
    title: "Basket Champ",
    slug: "basket-champ",
    description: "Shoot hoops and become the MVP.",
    bannerUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600",
    tags: ["Sport", "Arcade"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- GIRLS ---
  {
    title: "Fashion Stylist",
    slug: "fashion-stylist",
    description: "Dress up models for the runway show.",
    bannerUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
    tags: ["Girls", "Casual", "Simulation"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },
  {
    title: "Cooking Mama",
    slug: "cooking-mama",
    description: "Bake delicious cakes and run your own bakery.",
    bannerUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600",
    tags: ["Girls", "Simulation", "Puzzle"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- CARDS & QUIZ ---
  {
    title: "Solitaire Classic",
    slug: "solitaire-classic",
    description: "The timeless card game for relaxing moments.",
    bannerUrl: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?auto=format&fit=crop&q=80&w=600",
    tags: ["Cards", "Strategy"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },
  {
    title: "Brain Trivia",
    slug: "brain-trivia",
    description: "Test your general knowledge in this quiz game.",
    bannerUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600",
    tags: ["Quiz", "Puzzle", "Education"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  },

  // --- STRATEGY ---
  {
    title: "Kingdom Defense",
    slug: "kingdom-defense",
    description: "Defend your castle from waves of monsters.",
    bannerUrl: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?auto=format&fit=crop&q=80&w=600",
    tags: ["Strategy", "Action", "Fantasy"],
    type: "game", isVisible: true, createdAt: Timestamp.now()
  }
];

const Seeder = () => {
  const handleSeed = async () => {
    const confirm = window.confirm("Add 15+ mock games for ALL categories? (This prevents duplicates)");
    if (!confirm) return;

    try {
      const gamesRef = collection(db, "games");
      
      // Optional: Clear existing games first (to prevent duplicates)
      // const snapshot = await getDocs(gamesRef);
      // const batch = writeBatch(db);
      // snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      // await batch.commit();

      for (const game of MOCK_GAMES) {
        await addDoc(gamesRef, game);
      }
      alert("✅ Data Uploaded! Now click the Categories in Footer/Navbar.");
      window.location.reload();
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
      [DEV] Populate Categories
    </button>
  );
};

export default Seeder;