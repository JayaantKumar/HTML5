import { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    type: "game",
    isVisible: true,
    tags: "",
    banner: null,
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

      const storageRef = ref(storage, `banners/${Date.now()}_${formData.banner.name}`);
      const snapshot = await uploadBytes(storageRef, formData.banner);
      const bannerUrl = await getDownloadURL(snapshot.ref);

      const docData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        type: formData.type,
        isVisible: formData.isVisible,
        bannerUrl: bannerUrl,
        youtubeUrl: formData.youtubeUrl,
        clientUrl: formData.clientUrl,
        tags: formData.tags.split(",").map(t => t.trim()),
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, "games"), docData);
      alert("✅ Project Added Successfully!");
      navigate("/admin");

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-8 pb-20">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl border border-secondary/20 shadow-xl">
        <h1 className="text-3xl font-black text-contrast mb-8 border-b border-secondary/10 pb-4">
          Add New Project
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-contrast font-bold text-sm mb-2">Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title} 
                onChange={handleTitleChange}
                className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-0 outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-contrast font-bold text-sm mb-2">Slug (Auto)</label>
              <input 
                type="text" 
                name="slug"
                value={formData.slug} 
                onChange={handleChange}
                className="w-full bg-secondary/10 border-2 border-transparent rounded-xl p-3 text-primary font-mono text-sm"
                required
              />
            </div>
          </div>

          {/* Type & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FEFAE0] p-6 rounded-xl border border-secondary/10">
            <div>
              <label className="block text-contrast font-bold text-sm mb-2">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary outline-none"
              >
                <option value="game">Game (Home & Portfolio)</option>
                <option value="client">Client Project (Portfolio Only)</option>
                <option value="ghost">Experiment (Portfolio Only)</option>
              </select>
            </div>
            <div className="flex items-center pt-8">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={handleChange}
                  className="size-6 accent-primary rounded focus:ring-0 cursor-pointer"
                />
                <span className="text-contrast font-bold group-hover:text-primary transition-colors">Visible to Public</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-contrast font-bold text-sm mb-2">Short Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-0 outline-none transition-colors h-32"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="p-6 border-2 border-dashed border-secondary/40 rounded-xl hover:border-primary/50 transition-colors bg-secondary/5">
            <label className="block text-contrast font-bold text-sm mb-2">Banner Image (Required)</label>
            <input 
              type="file" 
              name="banner"
              onChange={handleChange}
              accept="image/*"
              className="w-full text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-contrast transition-all cursor-pointer"
              required
            />
          </div>

          {/* Extra Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-contrast font-bold text-sm mb-2">Tags (comma separated)</label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="RPG, React, 3D"
                className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-0 outline-none"
              />
            </div>
            <div>
              <label className="block text-contrast font-bold text-sm mb-2">Client/Demo URL</label>
              <input 
                type="url" 
                name="clientUrl"
                value={formData.clientUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-0 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-xl ${
                loading ? "bg-secondary cursor-not-allowed" : "bg-primary hover:bg-contrast hover:scale-[1.01]"
              }`}
            >
              {loading ? "Uploading..." : "🚀 Publish Project"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddGame;