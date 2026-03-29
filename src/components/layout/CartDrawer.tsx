"use client";

import Link from "next/link";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const SHIPPING_FEE = 8;

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const total = subtotal + (cart.length > 0 ? SHIPPING_FEE : 0);

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="title-md">YOUR CART ({cart.length})</h2>
          <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)}>CONTINUE SHOPPING</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="item-details">
                  <div className="item-top">
                    <h4 className="item-name">{item.name}</h4>
                    <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}>
                      <Trash2 size={16} color="var(--secondary)" />
                    </button>
                  </div>
                  <p className="item-options">
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                  </p>
                  <div className="item-bottom">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="item-price">{item.price * item.quantity} TND</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>SUBTOTAL</span>
              <span>{subtotal} TND</span>
            </div>
            <div className="subtotal" style={{ fontSize: "0.8rem", color: "var(--secondary)", marginTop: "0.5rem" }}>
              <span>SHIPPING</span>
              <span>{SHIPPING_FEE} TND</span>
            </div>
            <div className="subtotal" style={{ fontWeight: 600, borderTop: "1px solid var(--outline-variant)", paddingTop: "0.75rem", marginTop: "0.75rem" }}>
              <span>TOTAL</span>
              <span>{total} TND</span>
            </div>
            <Link
              href="/checkout"
              className="btn-primary checkout-btn"
              onClick={() => setIsCartOpen(false)}
              style={{ display: 'block', textAlign: 'center', marginTop: "1rem" }}
            >
              CHECKOUT NOW
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
