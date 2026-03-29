"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getOrdersByUser, Order } from "@/lib/orders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "#e9c176",
  confirmed: "#4CAF50",
  shipped: "#2196F3",
  delivered: "#9E9E9E",
};

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;
    getOrdersByUser(user.uid)
      .then(setOrders)
      .finally(() => setFetching(false));
  }, [user]);

  if (loading || fetching) {
    return (
      <main>
        <Navbar />
        <div className="orders-page">
          <div style={{ textAlign: "center", paddingTop: "10rem", color: "var(--secondary)" }}>
            Loading your orders...
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <Navbar />
        <div className="orders-page">
          <div className="orders-empty">
            <ShoppingBag size={48} />
            <h2 className="display-font" style={{ fontSize: "2rem", margin: "1.5rem 0 1rem" }}>Sign in to view orders</h2>
            <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>You need to be logged in to see your order history.</p>
            <Link href="/login" className="btn-primary">SIGN IN</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="orders-page">
        <div className="orders-header">
          <span className="label-md" style={{ color: "var(--secondary)", display: "block", marginBottom: "0.75rem" }}>MY ACCOUNT</span>
          <h1 className="display-font orders-title">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <Package size={48} />
            <h2 className="display-font" style={{ fontSize: "2rem", margin: "1.5rem 0 1rem" }}>No orders yet</h2>
            <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>When you place an order, it will appear here.</p>
            <Link href="/shop" className="btn-primary">START SHOPPING</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="label-md" style={{ display: "block", marginBottom: "0.25rem", color: "var(--secondary)" }}>ORDER ID</span>
                    <span className="order-id">#{order.id?.slice(0, 8).toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="label-md" style={{ display: "block", marginBottom: "0.25rem", color: "var(--secondary)" }}>DATE</span>
                    <span style={{ fontSize: "0.875rem" }}>
                      {order.createdAt ? new Date((order.createdAt as any).seconds * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="label-md" style={{ display: "block", marginBottom: "0.25rem", color: "var(--secondary)" }}>TOTAL</span>
                    <span style={{ fontWeight: 500 }}>${order.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span
                      className="label-md order-status-badge"
                      style={{ background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status], border: `1px solid ${STATUS_COLORS[order.status]}` }}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <div className="order-item-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="order-item-info">
                        <span className="title-sm">{item.name}</span>
                        {item.selectedSize && <span className="label-md" style={{ color: "var(--secondary)" }}>Size: {item.selectedSize}</span>}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "block" }}>Qty: {item.quantity}</span>
                        <span style={{ fontWeight: 500 }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>
                    Shipped to {order.shippingAddress.firstName} {order.shippingAddress.lastName} · {order.shippingAddress.city}, {order.shippingAddress.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
