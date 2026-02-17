import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Eye, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCleanImage } from "../utils/helpers";

const SearchResults = ({ products }) => {
  const [activeCategories, setActiveCategories] = useState([]);
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((p) => p.category && p.category.name)
          .filter((name) => typeof name === "string"),
      ),
    ];
    return unique.map((name) => ({ name, checked: true }));
  }, [products]);
  useEffect(() => {
    setActiveCategories(categories);
  }, [categories]);

  const filteredProducts = useMemo(() => {
    const checkedCategories = activeCategories
      .filter((c) => c.checked)
      .map((c) => c.name);

    if (checkedCategories.length === 0) return [];

    return products.filter(
      (p) =>
        p.category &&
        typeof p.category.name === "string" &&
        checkedCategories.includes(p.category.name),
    );
  }, [activeCategories, products]);

  // 1. State for Brands (UI only – no data available from API)
  const [brands, setBrands] = useState([
    { name: "Adidas", checked: false },
    { name: "Lacoste", checked: true },
    { name: "Polo", checked: true },
    { name: "Puma", checked: false },
  ]);

  // Toggle Logic for categories
  const toggleCategory = (name) => {
    setActiveCategories((prev) =>
      prev.map((c) => (c.name === name ? { ...c, checked: !c.checked } : c)),
    );
  };

  const toggleBrand = (index) => {
    const newBrands = [...brands];
    newBrands[index].checked = !newBrands[index].checked;
    setBrands(newBrands);
  };
  const navigate = useNavigate();


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
          <p className="text-xs text-gray-400 mt-1">
            <Link to={"/"} className="cursor-pointer hover:underline">
              Home
            </Link>
            / Advanced Search
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 bg-white border border-gray-100 p-6 h-fit sticky top-4">
          {/* Categories Filter */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
              Filter by Category
              <ChevronDown size={16} className="text-gray-400" />
            </h3>
            <div className="space-y-3">
              {activeCategories.map((cat) => (
                <label
                  key={cat.name}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={cat.checked}
                    onChange={() => toggleCategory(cat.name)}
                    className="hidden peer"
                  />

                  {/* Custom Checkbox */}
                  <div
                    className="w-5 h-5 border-2 border-gray-300 rounded-sm flex items-center justify-center
                  peer-checked:border-accent peer-checked:bg-accent
                  transition-all duration-200"
                  >
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <span className="text-sm text-gray-600 group-hover:text-accent transition-colors">
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Brands Filter */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
              Filter by Brand
              <ChevronDown size={16} className="text-gray-400" />
            </h3>
            <div className="space-y-3">
              {brands.map((brand, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors"
                >
                  {/* REAL CHECKBOX INPUT */}
                  <input
                    type="checkbox"
                    checked={brand.checked}
                    onChange={() => toggleBrand(index)}
                    className="w-4 h-4 accent-accent cursor-pointer rounded-sm"
                  />

                  <span
                    className={`text-sm ${brand.checked ? "text-gray-800 font-bold" : "text-gray-500"} group-hover:text-accent transition-colors`}
                  >
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-accent text-white font-bold py-3 text-sm rounded hover:bg-orange-500 transition-colors uppercase tracking-wide"
            aria-label="Apply filters"
          >
            Filter Results
          </button>
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Discount Badge */}
                {p.discount && (
                  <span className="absolute top-4 left-4 z-10 bg-cyan-400 text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                    {p.discount}-
                  </span>
                )}

                {/* Image */}
                <div className="aspect-square mb-4 overflow-hidden bg-gray-50 relative">
                  <img
                    src={getCleanImage(p.images)}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="bg-white p-2 rounded-full shadow-md hover:text-accent transition-colors"
                      aria-label={`View details for ${p.title}`}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      type="button"
                      className="bg-white p-2 rounded-full shadow-md hover:text-accent transition-colors"
                      aria-label="Add to cart (not implemented)"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">
                    {p.category.name}
                  </p>
                  <h3 className="text-sm font-medium text-gray-700 line-clamp-1 mb-2">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-lg font-bold text-gray-900">
                      ${p.price}
                    </p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < 4 ? "bg-yellow-400" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-accent hover:text-accent bg-white transition-colors">
              <ChevronDown className="rotate-90" size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-accent bg-accent text-white font-bold text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-accent hover:text-accent bg-white transition-colors text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-accent hover:text-accent bg-white transition-colors text-sm">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-accent hover:text-accent bg-white transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
