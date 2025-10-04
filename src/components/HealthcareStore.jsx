import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  CheckCircle,
  X,
  Plus,
  Minus,
  Package,
  Stethoscope,
  Pill,
  TrendingUp,
  Award,
  Truck,
  Shield,
} from "lucide-react";

const HealthcareStore = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      price: 3999,
      originalPrice: 5999,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.5,
      reviews: 342,
      category: "equipment",
      badge: "Bestseller",
      stock: 15,
      features: ["Auto-inflate", "Large Display", "Memory Function"],
    },
    {
      id: 2,
      name: "Vitamin D3 Supplements (60 Tablets)",
      price: 599,
      originalPrice: 899,
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.8,
      reviews: 589,
      category: "medicine",
      badge: "Top Rated",
      stock: 50,
      features: ["1000 IU", "60 Days Supply", "Veg Capsules"],
    },
    {
      id: 3,
      name: "First Aid Kit Premium - 100 Pieces",
      price: 1299,
      originalPrice: 1899,
      image:
        "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.6,
      reviews: 421,
      category: "equipment",
      badge: "Essential",
      stock: 25,
      features: ["100 Items", "Portable Case", "Complete Kit"],
    },
    {
      id: 4,
      name: "Infrared Thermometer Non-Contact",
      price: 1499,
      originalPrice: 2499,
      image:
        "https://images.unsplash.com/photo-1584555684040-bad07f3e0c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.7,
      reviews: 298,
      category: "equipment",
      badge: "Fast Delivery",
      stock: 30,
      features: ["1 Second Reading", "Fever Alarm", "Memory Recall"],
    },
    {
      id: 5,
      name: "Omega-3 Fish Oil (90 Capsules)",
      price: 849,
      originalPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1550572017-4764bdec0bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.9,
      reviews: 712,
      category: "medicine",
      badge: "Bestseller",
      stock: 40,
      features: ["1000mg EPA/DHA", "Triple Strength", "Heart Health"],
    },
    {
      id: 6,
      name: "Pulse Oximeter Fingertip",
      price: 899,
      originalPrice: 1499,
      image:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.4,
      reviews: 267,
      category: "equipment",
      badge: "Popular",
      stock: 20,
      features: ["SpO2 Monitor", "LED Display", "Portable"],
    },
    {
      id: 7,
      name: "Multivitamin Tablets (120 Count)",
      price: 699,
      originalPrice: 999,
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.6,
      reviews: 534,
      category: "medicine",
      badge: "Value Pack",
      stock: 60,
      features: ["Daily Nutrition", "120 Tablets", "All Ages"],
    },
    {
      id: 8,
      name: "Digital Weighing Scale",
      price: 1199,
      originalPrice: 1799,
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.5,
      reviews: 445,
      category: "equipment",
      badge: "New Arrival",
      stock: 18,
      features: ["150kg Capacity", "LCD Display", "Auto-On"],
    },
    {
      id: 9,
      name: "Calcium + Vitamin D (90 Tablets)",
      price: 549,
      originalPrice: 799,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
      rating: 4.7,
      reviews: 398,
      category: "medicine",
      badge: "Recommended",
      stock: 45,
      features: ["Bone Health", "500mg Calcium", "Easy to Swallow"],
    },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSavings = () => {
    return cart.reduce(
      (total, item) =>
        total + (item.originalPrice - item.price) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    setShowSuccess(true);
    setCart([]);
    setShowCart(false);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-25 via-red-25 to-yellow-25"
      style={{
        background:
          "linear-gradient(to bottom right, #fff7ed, #fef2f2, #fefce8)",
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 p-3 rounded-xl shadow-lg">
                <Package className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Bharat Care Store
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Your Complete Wellness Store
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-3 hover:scale-105 font-bold"
            >
              <ShoppingCart size={24} />
              <span className="text-lg">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center animate-bounce shadow-lg">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Category Navigation */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <TrendingUp size={20} />
              All Products
            </button>
            <button
              onClick={() => setActiveCategory("equipment")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                activeCategory === "equipment"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Stethoscope size={20} />
              Medical Equipment
            </button>
            <button
              onClick={() => setActiveCategory("medicine")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                activeCategory === "medicine"
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Pill size={20} />
              Medicines & Supplements
            </button>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-around items-center flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Truck size={32} />
            <div>
              <p className="font-bold text-lg">Free Delivery</p>
              <p className="text-sm opacity-90">On orders above ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield size={32} />
            <div>
              <p className="font-bold text-lg">100% Authentic</p>
              <p className="text-sm opacity-90">Genuine products only</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award size={32} />
            <div>
              <p className="font-bold text-lg">Certified Quality</p>
              <p className="text-sm opacity-90">FDA approved products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {activeCategory === "all" && "All Products"}
          {activeCategory === "equipment" && "Medical Equipment"}
          {activeCategory === "medicine" && "Medicines & Supplements"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-4 border-transparent hover:border-orange-200 relative group"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.badge}
                </span>
              </div>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:scale-125 transition-transform duration-300"
              >
                <Heart
                  size={24}
                  className={
                    likedProducts.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }
                />
              </button>

              {/* Product Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredProduct === product.id ? "scale-110" : "scale-100"
                  }`}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/500x400/f97316/ffffff?text=${encodeURIComponent(
                      product.name.split(" ")[0]
                    )}`;
                  }}
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        product.stock > 20 ? "bg-green-500" : "bg-orange-500"
                      } animate-pulse`}
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {product.stock > 20
                        ? "In Stock"
                        : `Only ${product.stock} left`}
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="border-t pt-4">
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-lg text-gray-400 line-through mb-1">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4">
                    <p className="text-green-700 font-bold text-center">
                      Save ₹
                      {(product.originalPrice - product.price).toLocaleString(
                        "en-IN"
                      )}{" "}
                      (
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF)
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 font-bold text-lg group"
                  >
                    <ShoppingCart
                      size={22}
                      className="group-hover:animate-bounce"
                    />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Shopping Cart</h2>
                <p className="text-sm opacity-90">{getTotalItems()} items</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart
                    size={80}
                    className="mx-auto text-gray-300 mb-6"
                  />
                  <p className="text-gray-500 text-xl font-semibold">
                    Your cart is empty
                  </p>
                  <p className="text-gray-400 mt-2">
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 shadow-lg border-2 border-orange-100 hover:border-red-200 transition-all"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/96x96/f97316/ffffff?text=${encodeURIComponent(
                              item.name.split(" ")[0]
                            )}`;
                          }}
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-orange-600">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-md">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 p-1 rounded-full transition-all"
                              >
                                <Minus size={18} />
                              </button>
                              <span className="font-bold text-lg w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 p-1 rounded-full transition-all"
                              >
                                <Plus size={18} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all"
                            >
                              <X size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6 bg-gradient-to-br from-orange-50 to-red-50">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold">
                      ₹{getTotalPrice().toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="font-medium">You Save:</span>
                    <span className="font-bold">
                      ₹{getSavings().toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="border-t-2 border-dashed pt-3 flex justify-between">
                    <span className="text-xl font-bold text-gray-800">
                      Total:
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ₹{getTotalPrice().toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                >
                  <CheckCircle size={24} />
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-md animate-bounce-in border-4 border-green-200">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle size={64} className="text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Order Placed Successfully!
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              Thank you for shopping with HealthCart Plus
            </p>
            <p className="text-orange-600 font-semibold">
              Your order will be delivered soon
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-2xl">
              <p className="text-sm text-gray-600">
                You saved{" "}
                <span className="font-bold text-green-600">
                  ₹{getSavings().toLocaleString("en-IN")}
                </span>{" "}
                on this order!
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HealthcareStore;
