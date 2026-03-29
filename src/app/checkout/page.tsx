"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder, ShippingAddress } from "@/lib/orders";
import { ChevronLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";

const SHIPPING_FEE = 8;

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const total = subtotal + (cart.length > 0 ? SHIPPING_FEE : 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsProcessing(true);
    setError("");

    try {
      const orderId = await createOrder({
        userId: user?.uid || "guest",
        userEmail: user?.email || address.email,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          selectedSize: item.selectedSize ?? null,
        })),
        shippingAddress: address,
        status: "pending",
        subtotal,
        total,
        paymentMethod: "Cash on Delivery",
      });

      clearCart();
      router.push(`/order-confirmation?id=${orderId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <Link href="/shop" className="back-link label-md">
            <ChevronLeft size={16} /> BACK TO SHOP
          </Link>
          <h1 className="title-md">CHECKOUT</h1>
        </header>

        <div className="checkout-grid">
          {/* Left Column */}
          <div className="checkout-main">
            <section className="checkout-section glass">
              <h2 className="section-title label-lg"><Truck size={18} /> SHIPPING INFORMATION</h2>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="checkout-form">
                <div className="form-group-row">
                  <input name="firstName" type="text" placeholder="FIRST NAME" required className="input-field" value={address.firstName} onChange={handleChange} />
                  <input name="lastName" type="text" placeholder="LAST NAME" required className="input-field" value={address.lastName} onChange={handleChange} />
                </div>
                <input name="email" type="email" placeholder="EMAIL ADDRESS" required className="input-field" value={address.email} onChange={handleChange} />
                <input name="street" type="text" placeholder="STREET ADDRESS" required className="input-field" value={address.street} onChange={handleChange} />
                <div className="form-group-row">
                  <input name="city" type="text" placeholder="CITY" required className="input-field" value={address.city} onChange={handleChange} />
                  <input name="postalCode" type="text" placeholder="POSTAL CODE" required className="input-field" value={address.postalCode} onChange={handleChange} />
                </div>
                <input name="country" type="text" placeholder="COUNTRY" required className="input-field" value={address.country} onChange={handleChange} />
                {error && <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.5rem" }}>{error}</p>}
              </form>
            </section>

            <section className="checkout-section glass">
              <h2 className="section-title label-lg"><CreditCard size={18} /> PAYMENT METHOD</h2>
              <div className="payment-options">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid var(--primary)", background: "rgba(0,0,0,0.02)" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--primary)" }}></div>
                  <span className="label-md">CASH ON DELIVERY</span>
                </div>
              </div>
              <p style={{ color: "var(--secondary)", lineHeight: 1.5, fontSize: "0.875rem", marginTop: "1.5rem" }}>
                You pay when you receive the package. Please prepare the exact amount.
              </p>
            </section>
          </div>

          {/* Right Column */}
          <aside className="checkout-summary glass">
            <h2 className="summary-title label-lg">ORDER SUMMARY</h2>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="summary-item">
                  <div className="item-info">
                    <span className="item-name label-md">{item.name}</span>
                    {item.selectedSize && <span className="item-variant label-sm">Size: {item.selectedSize}</span>}
                    <span className="item-variant label-sm">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price label-md">{item.price * item.quantity} TND</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span className="label-md">SUBTOTAL</span>
                <span className="label-md">{subtotal} TND</span>
              </div>
              <div className="total-row">
                <span className="label-md">SHIPPING</span>
                <span className="label-md">{SHIPPING_FEE} TND</span>
              </div>
              <div className="total-divider"></div>
              <div className="total-row final">
                <span className="label-lg">TOTAL</span>
                <span className="label-lg">{total} TND</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="btn-primary checkout-btn"
              disabled={isProcessing || cart.length === 0}
            >
              {isProcessing ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>

            <div className="trust-badges">
              <ShieldCheck size={14} />
              <span className="label-sm">SECURE CHECKOUT GUARANTEED</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
