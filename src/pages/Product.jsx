import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Star,
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getCleanImage } from "../utils/helpers";

const Product = ({ onAddToCart, cartItems, onUpdateQuantity }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  // 2. Fetch Product Data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        const firstImage = Array.isArray(res.data.images)
          ? res.data.images[0]
          : undefined;
        setMainImage(getCleanImage(firstImage));
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // 3. Find this specific item in the cart
  // We use Number(id) because useParams returns a string, but API IDs are numbers
  const cartItem = cartItems?.find((item) => Number(item.id) === Number(id));
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          Loading Product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <Link to="/" className="mt-4 text-accent font-bold hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors mb-10"
      >
        <ArrowLeft size={14} /> Back to Collection
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="aspect-square bg-gray-50 border border-gray-100 rounded-sm mb-4 overflow-hidden">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {Array.isArray(product.images) && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => {
                const cleaned = getCleanImage(img);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMainImage(cleaned)}
                    className={`aspect-square border-2 rounded-sm overflow-hidden transition-all ${
                      mainImage === cleaned
                        ? "border-accent"
                        : "border-transparent hover:border-gray-200"
                    }`}
                    aria-label={`View image ${index + 1} for ${product.title}`}
                  >
                    <img
                      src={cleaned}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2">
          <span className="text-cyan-500 text-xs font-black uppercase tracking-[0.2em] mb-4 block">
            {product.category?.name}
          </span>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < 4 ? "#fbbf24" : "none"}
                  className={i < 4 ? "text-yellow-400" : "text-gray-200"}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-l border-gray-200 pl-4">
              42 Reviews
            </span>
          </div>

          <p className="text-gray-500 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">
            ${product.price}
          </div>

          {/* Product.jsx Action Row Section */}
          <div className="flex flex-wrap gap-4 mb-10">
            {quantityInCart > 0 ? (
              /* THE COUNTER UI */
              <div className="flex items-center border-2 border-gray-900 rounded-sm h-[56px] bg-white">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, -1)}
                  className="px-6 h-full hover:bg-gray-50 transition-colors text-gray-900"
                  aria-label="Decrease quantity"
                >
                  <Minus size={20} />
                </button>

                <span className="px-8 font-black text-xl text-gray-900 min-w-[70px] text-center">
                  {quantityInCart}
                </span>

                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, 1)}
                  className="px-6 h-full hover:bg-gray-50 transition-colors text-gray-900"
                  aria-label="Increase quantity"
                >
                  <Plus size={20} />
                </button>
              </div>
            ) : (
              /* ADD TO CART BUTTON */
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="flex-1 min-w-[200px] h-[56px] bg-accent text-white font-bold px-10 rounded-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg shadow-orange-100"
                aria-label="Add product to cart"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            )}

            <button
              type="button"
              className="h-[56px] w-[56px] border-2 border-gray-200 flex items-center justify-center rounded-sm hover:text-red-500 hover:border-red-500 transition-all"
              aria-label="Add to wishlist"
            >
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <Truck className="text-accent" size={24} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                  Free Shipping
                </h4>
                <p className="text-[10px] text-gray-400 mt-1 uppercase">
                  On all orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-accent" size={24} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">
                  2 Year Warranty
                </h4>
                <p className="text-[10px] text-gray-400 mt-1 uppercase">
                  Full manufacturer coverage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
