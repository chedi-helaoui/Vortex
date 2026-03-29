"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { ChevronDown, SlidersHorizontal, Search, ShoppingBag } from "lucide-react";
import { getProducts } from "@/lib/products";
import { Product, useCart } from "@/context/CartContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  React.useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchPrice = p.price <= priceRange;
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPrice && matchSearch;
    });
  }, [priceRange, searchQuery, products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="shop-page">
      <Navbar />
      <CartDrawer />

      <div className="shop-container">
        <header className="shop-header">
          <div className="breadcrumb label-md">HOME / SHOP</div>
          <h1 className="display-font">SHOP ALL</h1>
          <div className="shop-controls">
            <button className="filter-toggle label-md" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <SlidersHorizontal size={16} /> {isFilterOpen ? "HIDE FILTERS" : "SHOW FILTERS"}
            </button>
            <div className="shop-search">
              <Search size={15} />
              <input
                type="text"
                placeholder="SEARCH PRODUCTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="shop-search-input"
              />
            </div>
            <div className="sort-dropdown">
              <span className="label-md">SORT BY: RELEVANCE</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="shop-content">
          {/* Sidebar Filters */}
          <aside className={`filters ${isFilterOpen ? "active" : ""}`}>
            <div className="filter-section">
              <h3 className="label-md">PRICE RANGE</h3>
              <div className="price-slider-container">
                <input
                  type="range" min="0" max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>$0</span>
                  <span>UP TO ${priceRange}</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="label-md">SIZE</h3>
              <div className="size-grid">
                {["S", "M", "L", "XL"].map((size) => (
                  <button key={size} className="size-btn">{size}</button>
                ))}
              </div>
            </div>

            <button
              className="clear-filters label-md underline"
              onClick={() => { setPriceRange(1000); setSearchQuery(""); }}
            >
              CLEAR FILTERS
            </button>
          </aside>

          {/* Product Grid */}
          <section className="product-results">
            <div className="results-count label-md">{filteredProducts.length} PRODUCTS</div>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "var(--secondary)" }}>
                <p className="title-md">No products found</p>
                <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>Try a different search or clear filters.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="product-card">
                    <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}></div>
                    <div className="product-info-box">
                      <h3 className="title-sm">{product.name}</h3>
                      <p className="price">{product.price} TND</p>
                      <span className="category-tag label-md">{product.category}</span>
                      <button
                        className={`card-add-to-cart label-md ${addedId === product.id ? "added" : ""}`}
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingBag size={14} />
                        {addedId === product.id ? "ADDED ✓" : "ADD TO CART"}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="pagination">
              <button className="btn-primary">EXPLORE MORE</button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--background)' }} />}>
      <ShopContent />
    </Suspense>
  );
}
