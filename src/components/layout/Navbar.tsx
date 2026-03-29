"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, LogOut, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/auth";
import { VortexLogo } from "@/components/ui/VortexLogo";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setMenuOpen(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
    { href: "/journal", label: "JOURNAL" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      <nav className="navbar glass">
        <div className="navbar-container">
          <div className="nav-left">
            <button
              className="mobile-menu-icon"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="nav-links">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="label-md">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-center">
            <Link href="/" className="logo-container">
              <VortexLogo size={28} className="logo-icon" />
              <span className="logo-text title-md">VORTEX</span>
            </Link>
          </div>

          <div className="nav-right">
            {/* Search — hidden on mobile */}
            <button
              className="nav-icon-btn nav-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={20} className="nav-icon" />
            </button>

            {loading ? (
              <User size={20} className="nav-icon" style={{ opacity: 0.5 }} />
            ) : user ? (
              <button
                onClick={() => logOut()}
                title="Log Out"
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <LogOut size={20} className="nav-icon" />
              </button>
            ) : (
              <Link href="/login" style={{ display: "flex", alignItems: "center" }}>
                <User size={20} className="nav-icon" />
              </Link>
            )}

            <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} className="nav-icon" />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <Link href="/" className="logo-container" onClick={() => setMenuOpen(false)}>
                <VortexLogo size={24} className="logo-icon" />
                <span className="logo-text title-md">VORTEX</span>
              </Link>
              <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-menu-links">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="mobile-menu-link label-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              {user ? (
                <button
                  className="mobile-menu-link label-md"
                  onClick={() => { logOut(); setMenuOpen(false); }}
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, color: "inherit", fontFamily: "inherit", letterSpacing: "inherit" }}
                >
                  LOG OUT
                </button>
              ) : (
                <Link href="/login" className="mobile-menu-link label-md" onClick={() => setMenuOpen(false)}>
                  SIGN IN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="search-form">
              <Search size={20} style={{ color: "var(--secondary)", flexShrink: 0 }} />
              <input
                autoFocus
                type="text"
                className="search-overlay-input"
                placeholder="SEARCH PRODUCTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <X size={20} style={{ color: "var(--secondary)" }} />
              </button>
            </form>
            <p className="search-hint label-md">Press Enter to search — results shown on shop page</p>
          </div>
        </div>
      )}
    </>
  );
}
