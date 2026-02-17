import React from "react";
import {
  Trash2,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 500 ? 0 : 20;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our
          latest collections to find something you love.
        </p>
        <Link
          to="/"
          className="inline-block bg-accent text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-orange-100"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-gray-900">Shopping Cart</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
              <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                My Cart
              </h1>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {cartItems.length} Items
              </span>
            </div>

            <div className="space-y-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row items-center gap-8 py-8 border-b border-gray-50 last:border-0 transition-all"
                >
                  <div className="relative w-32 h-32 bg-gray-50 flex-shrink-0 overflow-hidden rounded-sm border border-gray-100">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg hover:text-accent cursor-pointer transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest mt-1">
                          {item.category?.name || "Premium Collection"}
                        </p>
                      </div>
                      <div className="text-xl font-black text-gray-900">
                        ${item.price * item.quantity}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 mt-6">
                      {/* Quantity Control */}
                      <div className="flex items-center border border-gray-200 bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-sm text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[10px] font-bold text-gray-300 hover:text-red-500 uppercase flex items-center gap-1.5 transition-colors tracking-widest"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-12 text-[10px] font-bold text-gray-400 hover:text-accent transition-colors uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
          </div>

          <div className="w-full lg:w-1/3 sticky top-8">
            <div className="bg-gray-50/50 border border-gray-100 p-10 rounded-sm">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">
                      Free Shipping
                    </span>
                  ) : (
                    <span className="font-bold text-gray-900">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-sm border-b border-gray-200 pb-5">
                  <span className="text-gray-500 font-medium">
                    Estimated Tax
                  </span>
                  <span className="font-bold text-gray-900">$0.00</span>
                </div>
                <div className="pt-2 flex justify-between items-end">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-4xl font-black text-accent tracking-tighter">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-accent text-white text-center font-bold py-5 rounded-sm hover:bg-orange-500 transition-all shadow-xl shadow-orange-100 uppercase tracking-[0.2em] text-xs mb-6"
              >
                Proceed to Checkout
              </Link>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-500">
                  <Truck size={18} className="text-cyan-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Fast Delivery Worldwide
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <ShieldCheck size={18} className="text-cyan-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Secure SSL Payment
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE"
                className="bg-white border border-gray-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest w-full focus:outline-none focus:border-accent"
              />
              <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-gray-900 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
