const SkeletonCard = () => {
  return (
    <div className="h-64 rounded-xl bg-slate-800 overflow-hidden border border-slate-700/50 relative">
      {/* Shimmer Effect Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[shimmer_1.5s_infinite]" />
      
      {/* Fake Banner */}
      <div className="h-full w-full bg-slate-700/50" />
      
      {/* Fake Text Overlay */}
      <div className="absolute bottom-0 w-full p-4 space-y-2">
        <div className="h-6 w-3/4 bg-slate-600 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-4 w-12 bg-slate-600/50 rounded-full animate-pulse" />
          <div className="h-4 w-12 bg-slate-600/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;