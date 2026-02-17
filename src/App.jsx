import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SearchResults from "./pages/SearchResults";
import Contact from "./pages/Contact";
import HomeSkeleton from "./components/components/skeletons/HomeSkeleton";
import "./App.css";
import Cart from "./pages/Cart";
import Checkout from "./components/home/Checkout";

const App = () => {
  const [products, setProducts] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSeller, setBestSeller] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        const allProducts = response.data;
        setProducts(allProducts);

        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setHomeProducts(shuffled.slice(0, 5));

        const best = allProducts
          .filter((p) => p.category.name === "Shoes")
          .slice(0, 8);

        setBestSeller(best);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    setCartProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <HomeSkeleton />;

  return (
    <MainLayout cartCount={cartProducts.length}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allProducts={products}
              homeProducts={homeProducts}
              bestSeller={bestSeller}
              addToCart={addToCart}
              cartItems={cartProducts}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <Product
              onAddToCart={addToCart}
              cartItems={cartProducts}
              onUpdateQuantity={updateQuantity} 
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartProducts}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartProducts} />}
        />

        <Route
          path="/searchResults"
          element={<SearchResults products={products} />}
        />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
