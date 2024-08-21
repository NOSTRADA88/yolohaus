export const SkeletonHouse = () => {
  return (
    <div className="bg-white shadow-md overflow-hidden border-[#E5E5E5] transition-all duration-300 hover:shadow-2xl">
      <div className="relative overflow-hidden h-[200px] flex items-center justify-center max-md:h-[400px] max-sm:h-auto">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 mb-4 animate-pulse"></div>
        <div className="flex gap-[9px] mt-4 flex-col">
          <div className="flex gap-10">
            <div className="flex gap-[4px]">
              <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="flex gap-[4px]">
              <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-[4px] mt-2">
            <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
            <div className="w-40 h-4 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
