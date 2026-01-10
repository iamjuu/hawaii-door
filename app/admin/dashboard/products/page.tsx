"use client";

import { useState, useEffect } from "react";
import ProductForm from "@/components/dashboard/ProductForm";
import ProductList from "@/components/dashboard/ProductList";

type Product = {
  _id: string;
  name?: string;
  price: number;
  createdAt: string;
  imageUrl?: string[];
  type?: string;
  category?: string;
};

type TabType = "normal" | "glass";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("normal");

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddComplete = () => {
    setShowAddForm(false);
    fetchProducts();
  };

  // Filter products based on active tab
  const filteredProducts = products.filter(
    (product) => product.type === activeTab
  );

  return (
    <div className="min-h-screen bg-zinc-900 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Products Management</h1>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Add Product
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-8">
            <ProductForm onComplete={handleAddComplete} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-zinc-700">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("normal")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "normal"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Normal Door
            </button>
            <button
              onClick={() => setActiveTab("glass")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "glass"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Glass Door
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading products...</div>
        ) : (
          <ProductList products={filteredProducts} onRefresh={fetchProducts} />
        )}
      </div>
    </div>
  );
}

