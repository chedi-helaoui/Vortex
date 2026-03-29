"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getProducts } from "@/lib/products";
import { Product, useCart } from "@/context/CartContext";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [addedId, setAddedId] = React.useState<string | null>(null);
  const { addToCart } = useCart();

  React.useEffect(() => {
    getProducts().then((data) => setFeaturedProducts(data.slice(0, 4)));
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="landing-page">
      <Navbar />
      <CartDrawer />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="label-md slide-up">VORTEX ARCHIVAL 2026</span>
          <h1 className="display-lg slide-up" style={{ animationDelay: "0.15s" }}>
            THE MODERN<br />MINIMALIST
          </h1>
          <p className="hero-description slide-up" style={{ animationDelay: "0.3s" }}>
            A curated selection of archival pieces designed for the contemporary wardrobe.
            High-precision garments that bridge the gap between architectural form and wearable art.
          </p>
          <div className="hero-actions slide-up" style={{ animationDelay: "0.45s" }}>
            <Link href="/shop" className="btn-primary hero-btn">SHOP THE COLLECTION</Link>
            <Link href="/about" className="btn-secondary">LEARN MORE</Link>
          </div>
        </div>
        <div className="hero-image-container slide-in-right" style={{ animationDelay: "0.1s" }}>
          <div className="hero-image"></div>
          <div className="hero-image-badge">
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {["PERFORMANCE", "◈", "DARK AESTHETIC", "◈", "COMPRESSION", "◈", "TRIBAL DESIGN", "◈", "ARCHIVAL", "◈", "PRECISION CRAFT", "◈", "PERFORMANCE", "◈", "DARK AESTHETIC", "◈", "COMPRESSION", "◈", "TRIBAL DESIGN", "◈"].map((t, i) => (
            <span key={i} className="marquee-item label-md">{t}</span>
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <section className="categories reveal-section">
        <div className="category-card large">
          <div className="category-img woman-essentials"></div>
          <div className="category-info">
            <h2 className="title-md">Men's Compression</h2>
            <Link href="/shop" className="label-md explore-link">Explore <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="category-group">
          <div className="category-card">
            <div className="category-img best-sellers"></div>
            <div className="category-info">
              <h2 className="title-md">Best Sellers</h2>
              <Link href="/shop" className="label-md explore-link">Shop <ArrowRight size={14} /></Link>
            </div>
          </div>
          <div className="category-card">
            <div className="category-img accessories"></div>
            <div className="category-info">
              <h2 className="title-md">Vibes Collection</h2>
              <Link href="/shop" className="label-md explore-link">View <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="showcase reveal-section">
        <div className="showcase-header">
          <h2 className="display-font" style={{ fontSize: "3rem" }}>CURATED SELECTION</h2>
          <Link href="/shop" className="label-md">View All</Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product, i) => (
            <Link key={product.id} href={`/product/${product.id}`} className="product-card reveal-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}></div>
              <div className="product-meta">
                <div>
                  <h3 className="title-sm">{product.name}</h3>
                  <span className="price" style={{ marginTop: "0.25rem", display: "block", fontSize: "0.875rem" }}>{product.price} TND</span>
                </div>
                <button
                  className={`card-add-to-cart home-card-btn label-md ${addedId === product.id ? "added" : ""}`}
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingBag size={14} />
                  {addedId === product.id ? "✓" : ""}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2 className="display-font">Invitations to the avant-garde</h2>
          <p>Join our journal for exclusive access to collection drops and editorial stories.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="YOUR EMAIL ADDRESS" />
            <button type="submit" className="label-md">SUBSCRIBE</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
