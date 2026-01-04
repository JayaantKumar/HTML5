import { useState } from "react";
import * as FM from "framer-motion";

const { motion, AnimatePresence } = FM;
import { getImgSrc } from "../../utils/adapters";

const SmartImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const safeSrc = getImgSrc(src);

  return (
    <div className={`relative overflow-hidden bg-slate-800 ${className}`}>
      {/* 1. Blurred Background Fill (Prevents whitespace on weird aspect ratios) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 blur-xl scale-110"
        style={{ backgroundImage: `url(${safeSrc})` }}
      />

      {/* 2. Main Image on Top */}
      <motion.img
        src={safeSrc}
        alt={alt || "Content"}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoad={() => setIsLoaded(true)}
        className="relative z-10 w-full h-full object-cover"
      />
    </div>
  );
};

export default SmartImage;