import { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    type: "game", // 'game', 'client', 'ghost'
    isVisible: true,
    tags: "", // Comma separated string
    banner: null, // File object
    youtubeUrl: "",
    clientUrl: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.banner) return alert("Title and Banner are required!");

    try {
      setLoading(true);

      // 1. Upload Image to Firebase Storage
      const storageRef = ref(storage, `banners/${Date.now()}_${formData.banner.name}`);
      const snapshot = await uploadBytes(storageRef, formData.banner);
      const bannerUrl = await getDownloadURL(snapshot.ref);

      // 2. Prepare Data for Firestore
      const docData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        type: formData.type,
        isVisible: formData.isVisible,
        bannerUrl: bannerUrl,
        youtubeUrl: formData.youtubeUrl,
        clientUrl: formData.clientUrl,
        tags: formData.tags.split(",").map(t => t.trim()), // Convert "Action, RPG" -> ["Action", "RPG"]
        createdAt: Timestamp.now()
      };

      // 3. Save to Firestore
      await addDoc(collection(db, "games"), docData);

      alert("✅ Project Added Successfully!");
      navigate("/admin"); // Go back to dashboard

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 pb-20">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-6">Add New Project</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title & Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title} 
                onChange={handleTitleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Slug (URL)</label>
              <input 
                type="text" 
                name="slug"
                value={formData.slug} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-400"
                required
              />
            </div>
          </div>

          {/* Type & Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              >
                <option value="game">Game (Home & Portfolio)</option>
                <option value="client">Client Project (Portfolio Only)</option>
                <option value="ghost">Experiment (Portfolio Only)</option>
              </select>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={handleChange}
                  className="w-5 h-5 accent-cyan-500"
                />
                <span className="text-white">Visible to Public</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-400 text-sm mb-1">Short Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white h-24"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-slate-400 text-sm mb-1">Banner Image (Required)</label>
            <input 
              type="file" 
              name="banner"
              onChange={handleChange}
              accept="image/*"
              className="w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
              required
            />
          </div>

          {/* Extra Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Tags (comma separated)</label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="RPG, React, 3D"
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Client/Demo URL</label>
              <input 
                type="url" 
                name="clientUrl"
                value={formData.clientUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded font-bold text-black transition ${
              loading ? "bg-slate-600 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-400"
            }`}
          >
            {loading ? "Uploading..." : "🚀 Publish Project"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddGame;