import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="label-md" style={{ color: "var(--tertiary)" }}>ESTABLISHED 2026</span>
          <h1 className="display-font about-title">The Architecture<br />of Clothing</h1>
          <p className="about-subtitle">
            VORTEX was born from the intersection of athletic performance and dark minimalist aesthetics.
            We design gear for those who move through the world with intention.
          </p>
        </div>
        <div className="about-hero-image"></div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-mission-text">
          <span className="label-md" style={{ marginBottom: "1rem", display: "block", color: "var(--secondary)" }}>OUR MISSION</span>
          <h2 className="display-font" style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            Precision-engineered for the modern athlete
          </h2>
          <p style={{ color: "var(--secondary)", lineHeight: "1.9", marginBottom: "1.5rem" }}>
            Every VORTEX garment begins as a sketch — hand-drawn by our founders in a dark studio, 
            fueled by a singular obsession: to create compression wear that feels like a second skin 
            while making a visceral aesthetic statement.
          </p>
          <p style={{ color: "var(--secondary)", lineHeight: "1.9" }}>
            We source only the highest-grade performance fabrics from certified European mills, 
            then pair them with our proprietary bio-mechanical graphic system — a visual language 
            drawn from anatomy, tribal lore, and architectural theory.
          </p>
        </div>
        <div className="about-mission-grid">
          {[
            { num: "100%", label: "Performance Fabrics" },
            { num: "5+", label: "Signature Designs" },
            { num: "2026", label: "Archival Collection" },
            { num: "1", label: "Design Philosophy" },
          ].map((stat) => (
            <div key={stat.num} className="stat-block">
              <span className="stat-number display-font">{stat.num}</span>
              <span className="stat-label label-md">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <h2 className="display-font about-section-title">What We Stand For</h2>
        <div className="values-grid">
          {[
            { icon: "◈", title: "Dark Aesthetics", desc: "Every design draws from the beauty found in shadows, tribal patterns, and bio-mechanical form." },
            { icon: "◉", title: "Performance First", desc: "If it doesn't enhance your athletic performance, it doesn't go into production. Form follows function." },
            { icon: "◍", title: "Precise Craft", desc: "From pattern cutting to final stitching, every detail is obsessed over to achieve perfection." },
            { icon: "◌", title: "Archive Mentality", desc: "We design collections meant to be worn for decades. No fast fashion. Only lasting pieces." },
          ].map((v) => (
            <div key={v.title} className="value-card">
              <span className="value-icon">{v.icon}</span>
              <h3 className="title-md" style={{ margin: "1rem 0 0.75rem" }}>{v.title}</h3>
              <p style={{ color: "var(--secondary)", fontSize: "0.875rem", lineHeight: "1.7" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2 className="display-font" style={{ fontSize: "3rem", marginBottom: "2rem" }}>Join the Movement</h2>
        <p style={{ color: "var(--secondary)", marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
          Explore the VORTEX 2026 Archival Collection — performance wear built for those who demand more.
        </p>
        <Link href="/shop" className="btn-primary">SHOP THE COLLECTION</Link>
      </section>

      <Footer />
    </main>
  );
}
