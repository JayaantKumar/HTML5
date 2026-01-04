import { useParams, Link } from "react-router-dom";
import { useProjectBySlug } from "../hooks/useProjectBySlug";
import SmartImage from "../components/ui/SmartImage";
import * as FM from "framer-motion";

const { motion, AnimatePresence } = FM;

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = useProjectBySlug(slug);

  if (!project) return <div className="text-center pt-20">Loading Project...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: Text Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm">
              {project.type === 'ghost' ? 'Experimental' : 'Client Project'}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-6">
              {project.title}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              {/* Fallback description if one isn't in the mock data yet */}
              {project.description || "A cutting-edge web application built with modern technologies. Focused on performance, accessibility, and smooth user interactions."}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-3">
            {project.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {project.clientUrl && (
              <a 
                href={project.clientUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors"
              >
                Visit Live Site ↗
              </a>
            )}
            <Link 
              to="/portfolio"
              className="px-8 py-3 border border-slate-600 text-white font-medium rounded-full hover:bg-slate-800 transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Visual Preview (Laptop Style) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full" />
          
          <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 aspect-video">
            <SmartImage 
              src={project.bannerUrl} 
              className="w-full h-full object-cover" 
            />
            
            {/* Overlay for Ghost Projects (Video hint) */}
            {project.type === 'ghost' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <div className="w-0 h-0 border-l-[15px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;