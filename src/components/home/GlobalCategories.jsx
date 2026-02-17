import CategoryCard from "../layout/CategoryCard";

const GlobalCategories = ({ allProducts }) => {
  // 1. Group products by category name
  const grouped = allProducts.reduce((acc, product) => {
    if (!product || !product.category || !product.category.name) return acc;
    const catName = product.category.name;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(product);
    return acc;
  }, {});

  // 2. Get the top 4 categories that have at least 2 products
  const categoryNames = Object.keys(grouped)
    .filter(name => grouped[name].length >= 2)
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-[#fcfcfc]">
      {/* Header matching BestSeller style */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Popular Categories</h2>
        <div className="w-20 h-1 bg-accent mt-2"></div>
      </div>

      {/* 2x2 Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryNames.map((name) => (
          <CategoryCard
            key={name} 
            categoryName={name} 
            products={grouped[name]} 
          />
        ))}
      </div>
    </section>
  );
};

export default GlobalCategories;