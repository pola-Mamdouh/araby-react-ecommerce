import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronRight, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-gray-900">Contact Us</span>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter text-center">
            Contact Us
          </h1>
          <div className="w-16 h-1 bg-accent mt-2"></div>
          <p className="text-gray-500 text-sm mt-4 max-w-lg text-center">
            Have a question or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-8 uppercase tracking-tight">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 py-3 px-4 focus:border-accent outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white font-bold py-5 rounded-sm hover:bg-orange-600 transition-all uppercase tracking-[0.2em] text-xs shadow-lg shadow-orange-100 flex items-center justify-center gap-3"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-gray-50 border border-gray-100 p-8 sticky top-8">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-tight">
                Get in touch
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-gray-100 rounded-sm shrink-0">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:support@araby.com"
                      className="text-gray-900 font-medium hover:text-accent transition-colors"
                    >
                      support@araby.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-gray-100 rounded-sm shrink-0">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-900 font-medium hover:text-accent transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-gray-100 rounded-sm shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
                      Address
                    </h4>
                    <p className="text-gray-900 font-medium">
                      123 Commerce Street
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-xs mt-8 leading-relaxed">
                We typically respond within 24–48 hours during business days. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
