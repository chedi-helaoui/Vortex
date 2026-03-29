"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { VortexLogo } from "@/components/ui/VortexLogo";

const footerLinks = {
  SHOP: [
    { label: "New Arrivals", href: "/shop" },
    { label: "Men's Collection", href: "/shop" },
    { label: "Accessories", href: "/shop" },
    { label: "Sale", href: "/shop" },
  ],
  SUPPORT: [
    { label: "Shipping & Returns", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Track Order", href: "#" },
  ],
  COMPANY: [
    { label: "About Us", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter / X" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      {/* Top strip */}
      <div className="footer-top-strip">
        <div className="footer-top-inner">
          <div className="footer-newsletter">
            <div className="newsletter-text">
              <p className="label-md footer-eyebrow">JOIN THE MOVEMENT</p>
              <h3 className="footer-newsletter-title">
                Exclusive drops & insider access
              </h3>
            </div>
            {subscribed ? (
              <p className="newsletter-success label-md">✓ YOU&apos;RE IN. WELCOME.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-submit" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="footer-body">
        <div className="footer-container">
          {/* Brand col */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo">
              <VortexLogo size={24} className="footer-logo-icon" />
              <span className="logo-text title-md">VORTEX</span>
            </Link>
            <p className="footer-desc">
              Engineered for performance. Designed for dominance. Every piece built to outlast the grind.
            </p>
            <div className="social-links">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div className="footer-col" key={section}>
                <h4 className="label-md">{section}</h4>
                <ul>
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} VORTEX. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
