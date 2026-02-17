import React, { useState } from "react";
import { CreditCard, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { getCleanImage } from "../../utils/helpers";


const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    city: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      // Prevent submitting an order with no items
      return;
    }
    console.log("Order Submitted:", { items: cartItems, customer: formData, total });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Checkout</h2>
        <div className="w-16 h-1 bg-orange-500 mt-2"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-[60%]">
          <div className="bg-white border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 uppercase tracking-tight">
              <Truck size={20} className="text-orange-500" /> Shipping Details
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div className="col-span-2">
                <h3 className="text-xl font-bold mt-10 mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <CreditCard size={20} className="text-orange-500" /> Payment Method
                </h3>
                <div className="p-5 border-2 border-orange-500 bg-orange-50/30 rounded-sm flex items-center justify-between">
                  <span className="font-bold text-gray-800 uppercase text-xs tracking-wider">Cash on Delivery</span>
                  <div className="w-5 h-5 rounded-full border-[5px] border-orange-500"></div>
                </div>
              </div>

              <button
                type="submit"
                className="col-span-2 mt-8 bg-gray-900 text-white font-bold py-5 px-8 flex items-center justify-center gap-4 hover:bg-black transition-all uppercase tracking-[0.2em] text-xs shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Place Order <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-[40%]">
          <div className="bg-gray-50 border border-gray-100 p-8 sticky top-8">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-tight">Order Summary</h3>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-white border border-gray-100 rounded-sm p-1 shrink-0">
                    <img 
                      src={getCleanImage(item.images)} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{item.quantity} x ${item.price}</p>
                  </div>
                  <p className="text-sm font-black text-gray-900">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-8">
              <div className="flex justify-between text-gray-500">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Shipping</span>
                <span className="font-bold text-gray-900">${shipping}</span>
              </div>
              <div className="flex justify-between items-center text-gray-900 pt-5 border-t border-gray-200">
                <span className="text-sm font-black uppercase tracking-[0.2em]">Total</span>
                <span className="text-3xl font-black tracking-tighter">${total}</span>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 text-green-600 bg-green-50/50 p-4 border border-green-100">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;