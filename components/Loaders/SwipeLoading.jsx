export default function SwipeLoading() {
  return (
    <div className="flex w-[90%] mt-16 md:mt-0">
      <div className="h-[450px] w-[380px] flex flex-col gap-2 justify-center items-center bg-gray-300 animate-pulse">
        <div className="bg-gray-400 animate-pulse w-[60%] h-8"></div>
        <div className="w-[60%] grid grid-cols-4 gap-2">
          <div className="bg-gray-400 animate-pulse h-4"></div>
          <div className="bg-gray-400 animate-pulse h-4 col-span-3"></div>
          <div className="bg-gray-400 animate-pulse h-4 col-span-2"></div>
          <div className="bg-gray-400 animate-pulse h-4"></div>
        </div>
      </div>
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="hidden h-[450px] w-[380px] lg:flex flex-col gap-2 justify-center items-center bg-gray-300 animate-pulse"
        >
          <div className="bg-gray-400 animate-pulse w-[60%] h-8"></div>
          <div className="w-[60%] grid grid-cols-4 gap-2">
            <div className="bg-gray-400 animate-pulse h-4"></div>
            <div className="bg-gray-400 animate-pulse h-4 col-span-3"></div>
            <div className="bg-gray-400 animate-pulse h-4 col-span-2"></div>
            <div className="bg-gray-400 animate-pulse h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
