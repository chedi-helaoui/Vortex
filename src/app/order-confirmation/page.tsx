"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Package } from "lucide-react";

function OrderConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("id");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className={`confirmation-icon ${step >= 1 ? "visible" : ""}`}>
          <CheckCircle size={64} strokeWidth={1.5} />
        </div>

        <div className={`confirmation-text ${step >= 2 ? "visible" : ""}`}>
          <span className="label-md" style={{ color: "var(--tertiary)", display: "block", marginBottom: "1rem" }}>ORDER CONFIRMED</span>
          <h1 className="display-font confirmation-title">Thank you!</h1>
          <p style={{ color: "var(--secondary)", lineHeight: "1.8", marginTop: "1rem" }}>
            Your VORTEX order has been received and is being prepared. You'll receive a confirmation at your email address.
          </p>
        </div>

        {orderId && (
          <div className={`confirmation-id ${step >= 3 ? "visible" : ""}`}>
            <span className="label-md" style={{ color: "var(--secondary)", display: "block", marginBottom: "0.5rem" }}>ORDER REFERENCE</span>
            <code className="order-ref">#{orderId.slice(0, 8).toUpperCase()}</code>
          </div>
        )}

        <div className={`confirmation-actions ${step >= 3 ? "visible" : ""}`}>
          <Link href="/account/orders" className="btn-primary">
            <Package size={16} style={{ display: "inline", marginRight: "0.5rem" }} />
            VIEW MY ORDERS
          </Link>
          <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: "60vh", background: "var(--background)" }} />}>
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </main>
  );
}
