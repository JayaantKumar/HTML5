import { useParams, Link } from "react-router-dom";
import { useProjectBySlug } from "../hooks/useProjectBySlug";
import SmartImage from "../components/ui/SmartImage";
import { motion } from "framer-motion";

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = useProjectBySlug(slug);

  if (!project) return <div className="text-center pt-20 text-contrast">Loading Project...</div>;

  return (
    // 1. Changed bg to Cream (#FEFAE0)
    <div className="min-h-screen bg-[#FEFAE0] pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: Text Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            {/* 2. Changed text color to Sage Green (primary) */}
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              {project.type === 'ghost' ? 'Experimental' : 'Client Project'}
            </span>
            
            {/* 3. Changed heading to Dark Green (contrast) */}
            <h1 className="text-5xl md:text-6xl font-black text-contrast mt-2 mb-6">
              {project.title}
            </h1>
            
            {/* 4. Changed description to softer dark green */}
            <p className="text-contrast/80 text-lg leading-relaxed">
              {project.description || "A cutting-edge web application built with modern technologies. Focused on performance, accessibility, and smooth user interactions."}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-3">
            {project.tags?.map(tag => (
              // 5. Styled tags with Primary Green borders
              <span key={tag} className="px-3 py-1 bg-white border border-secondary rounded-full text-sm text-contrast font-medium">
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
                // 6. Primary Button Style
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-contrast transition-colors shadow-lg shadow-primary/20"
              >
                Visit Live Site ↗
              </a>
            )}
            <Link 
              to="/portfolio"
              // 7. Secondary Button Style
              className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Visual Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Glow (Sage Green) */}
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          
          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-secondary aspect-video">
            <SmartImage 
              src={project.bannerUrl} 
              className="w-full h-full object-cover" 
            />
            
            {project.type === 'ghost' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white shadow-lg">
                  <div className="w-0 h-0 border-l-[15px] border-l-primary border-y-[10px] border-y-transparent ml-1" />
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