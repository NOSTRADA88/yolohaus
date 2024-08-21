export const SkeletonProject = () => {
  return (
    <div className="bg-white shadow-md overflow-hidden border-[#E5E5E5] transition-all duration-300 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <div className="w-full h-[200px] bg-lightwhite animate-pulse"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-lightwhite mb-4 animate-pulse"></div>
        <div className="flex gap-[9px] mt-4">
          <div className="flex gap-[4px]">
            <div className="w-4 h-4 bg-lightwhite animate-pulse"></div>
            <div className="w-24 h-4 bg-lightwhite animate-pulse"></div>
          </div>
          <div className="flex gap-[4px]">
            <div className="w-4 h-4 bg-lightwhite animate-pulse"></div>
            <div className="w-24 h-4 bg-lightwhite animate-pulse"></div>
          </div>
          <div className="flex gap-[4px]">
            <div className="w-4 h-4 bg-lightwhite animate-pulse"></div>
            <div className="w-24 h-4 bg-lightwhite animate-pulse"></div>
          </div>
          <div className="flex gap-[4px]">
            <div className="w-4 h-4 bg-lightwhite animate-pulse"></div>
            <div className="w-24 h-4 bg-lightwhite animate-pulse"></div>
          </div>
        </div>
        <div className="h-4 bg-lightwhite mt-6 animate-pulse"></div>
      </div>
    </div>
  );
};
