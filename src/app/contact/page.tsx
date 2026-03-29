"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <Navbar />

      <div className="contact-page">
        <div className="contact-header">
          <span className="label-md" style={{ color: "var(--tertiary)", display: "block", marginBottom: "1rem" }}>GET IN TOUCH</span>
          <h1 className="display-font contact-title">Contact Us</h1>
          <p style={{ color: "var(--secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.8" }}>
            Whether it's a question about sizing, a collaboration proposal, or simply a conversation about design — we'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className="contact-info-panel">
            <h2 className="title-md" style={{ marginBottom: "2.5rem" }}>Our Details</h2>
            {[
              { icon: <MapPin size={18} />, label: "Studio", value: "VORTEX ,Mahdia" },
              { icon: <Mail size={18} />, label: "Email", value: "achref.boudhiba7@gmail.com" },
              { icon: <Phone size={18} />, label: "Phone", value: "+216 27 855 400" },
            ].map((item) => (
              <div key={item.label} className="contact-detail">
                <span className="contact-icon">{item.icon}</span>
                <div>
                  <span className="label-md" style={{ display: "block", marginBottom: "0.25rem", color: "var(--secondary)" }}>{item.label}</span>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}

            <div className="contact-hours">
              <h3 className="label-md" style={{ marginBottom: "1rem" }}>STUDIO HOURS</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--secondary)", fontSize: "0.875rem" }}>
                <span>Monday – Friday: 9:00am – 6:00pm</span>
                <span>Saturday: 10:00am – 4:00pm</span>
                <span>Sunday: Closed</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success">
                <Send size={48} />
                <h2 className="display-font" style={{ fontSize: "2rem", margin: "1.5rem 0 1rem" }}>Message Sent</h2>
                <p style={{ color: "var(--secondary)" }}>We'll be in touch within 48 hours. Thank you for reaching out.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <input className="input-field" placeholder="YOUR NAME" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  <input className="input-field" type="email" placeholder="YOUR EMAIL" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <input className="input-field" placeholder="SUBJECT" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                <textarea
                  className="input-field contact-textarea"
                  placeholder="YOUR MESSAGE..."
                  rows={7}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
                <button type="submit" className="btn-primary contact-submit">SEND MESSAGE</button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
