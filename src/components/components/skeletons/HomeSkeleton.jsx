const HomeSkeleton = () => {
  return (
    <div className="container mx-auto animate-pulse p-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="h-80 bg-gray-300 rounded"></div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        <div className="h-24 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
