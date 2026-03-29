"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { getProductById, getProducts } from "@/lib/products";
import { Product } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { Star, Heart, Share2, ChevronRight, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("");

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchProduct = async () => {
      try {
        const [fetchedProduct, allProducts] = await Promise.all([
          getProductById(id as string),
          getProducts(),
        ]);

        if (!fetchedProduct) {
          setNotFound(true);
        } else {
          setProduct(fetchedProduct);
          setActiveImage(fetchedProduct.image);
          setRecommendations(
            allProducts.filter((p) => p.id !== fetchedProduct.id).slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="product-page">
        <Navbar />
        <div style={{ padding: "20vh 4rem", textAlign: "center" }}>
          <p className="label-md">LOADING...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <div className="error-page">
        <Navbar />
        <div style={{ padding: "20vh 4rem", textAlign: "center" }}>
          <h1 className="title-md">Product Not Found</h1>
          <Link
            href="/shop"
            className="btn-primary"
            style={{ marginTop: "2rem", display: "inline-block" }}
          >
            BACK TO SHOP
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = [
    product.image,
    ...(product.imageBack ? [product.imageBack] : []),
  ];

  return (
    <main className="product-page">
      <Navbar />
      <CartDrawer />

      <div className="product-container">
        {/* Breadcrumb */}
        <div className="breadcrumb label-md">
          <Link href="/">HOME</Link> <ChevronRight size={12} />
          <Link href="/shop">SHOP</Link> <ChevronRight size={12} />
          <span>{product.name.toUpperCase()}</span>
        </div>

        <div className="product-main">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div
              className="main-image"
              style={{
                backgroundImage: `url(${activeImage})`,
                transition: "background-image 0.3s ease",
              }}
            ></div>

            {galleryImages.length > 1 && (
              <div className="thumbnail-grid">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className={`thumb ${activeImage === img ? "active" : ""}`}
                    style={{ backgroundImage: `url(${img})`, cursor: "pointer" }}
                    onClick={() => setActiveImage(img)}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="info-header">
              <span className="category label-md">{product.category}</span>
              <h1 className="display-font">{product.name}</h1>
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="var(--primary)" />
                  ))}
                </div>
                <span className="review-count label-md">48 REVIEWS</span>
              </div>
              <p className="price">{product.price} TND</p>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="selectors">
              <div className="selector-group">
                <h4 className="label-md">COLOR: {selectedColor}</h4>
                <div className="color-options">
                  <button
                    className="color-btn active"
                    style={{ backgroundColor: "black" }}
                  ></button>
                </div>
              </div>

              <div className="selector-group">
                <h4 className="label-md">SIZE</h4>
                <div className="size-options">
                  {["S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      className={`size-btn ${selectedSize === s ? "active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selector-group">
                <h4 className="label-md">QUANTITY</h4>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="actions">
              <button
                className="btn-primary add-to-cart"
                onClick={() =>
                  addToCart(product, quantity, selectedSize, selectedColor)
                }
              >
                ADD TO CART
              </button>
              <button className="wishlist-btn">
                <Heart size={20} />
              </button>
              <button className="share-btn">
                <Share2 size={20} />
              </button>
            </div>

            <div className="product-meta-details">
              <div className="meta-item">
                <h5 className="label-md">DETAILS</h5>
                <p>Dry clean only. 100% fine materials. Architectural fit.</p>
              </div>
              <div className="meta-item">
                <h5 className="label-md">SHIPPING</h5>
                <p>Complimentary worldwide shipping on orders over $500.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <section className="recommendations">
          <h2 className="display-font">YOU MAY ALSO LIKE</h2>
          <div className="recommendations-grid">
            {recommendations.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="rec-card">
                <div
                  className="rec-image"
                  style={{ backgroundImage: `url(${p.image})` }}
                ></div>
                <div className="rec-info">
                  <h3 className="title-sm">{p.name}</h3>
                  <p className="price">{p.price} TND</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
