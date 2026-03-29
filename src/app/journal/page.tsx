import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const articles = [
  {
    id: 1,
    category: "DESIGN",
    title: "The Philosophy Behind Bio-Mechanical Graphics",
    excerpt: "We explore how the human body's internal architecture became the primary inspiration for the VORTEX 2026 graphic system.",
    date: "March 20, 2026",
    readTime: "5 min read",
    image: "/images/products/vortex-tshirt-1.png",
  },
  {
    id: 2,
    category: "PERFORMANCE",
    title: "Why Compression Matters: A Deep Dive into Athletic Fabric Science",
    excerpt: "The science behind our proprietary compression technology and how it enhances muscle performance and recovery during intense training.",
    date: "March 15, 2026",
    readTime: "7 min read",
    image: "/images/products/vortex-tshirt-2.png",
  },
  {
    id: 3,
    category: "CULTURE",
    title: "Tribal Motifs in Modern Athletic Wear",
    excerpt: "A deep exploration of how ancient tribal visual language translates into contemporary performance fashion for the modern warrior.",
    date: "March 10, 2026",
    readTime: "4 min read",
    image: "/images/products/vortex-tshirt-3.png",
  },
  {
    id: 4,
    category: "CRAFT",
    title: "Behind the Seams: How We Build the Nocturne Base Layer",
    excerpt: "An exclusive look inside our production process — from pattern cutting to final quality inspection on our flagship stealth piece.",
    date: "March 5, 2026",
    readTime: "6 min read",
    image: "/images/products/vortex-tshirt-4.png",
  },
  {
    id: 5,
    category: "EDITORIAL",
    title: "Shadow Strike: The Making of a New Compression Icon",
    excerpt: "The creative director walks us through every design decision that went into the VORTEX Shadow Strike Rashguard.",
    date: "February 28, 2026",
    readTime: "8 min read",
    image: "/images/products/vortex-tshirt-5.png",
  },
];

export default function JournalPage() {
  const [featured, ...rest] = articles;

  return (
    <main>
      <Navbar />

      <div className="journal-page">
        <div className="journal-header">
          <span className="label-md" style={{ color: "var(--tertiary)", display: "block", marginBottom: "1rem" }}>THE VORTEX JOURNAL</span>
          <h1 className="display-font journal-title">Stories, Design &<br />Culture</h1>
        </div>

        {/* Featured Article */}
        <Link href="#" className="journal-featured">
          <div className="journal-featured-image" style={{ backgroundImage: `url(${featured.image})` }}></div>
          <div className="journal-featured-content">
            <span className="label-md journal-category">{featured.category}</span>
            <h2 className="display-font journal-featured-title">{featured.title}</h2>
            <p className="journal-excerpt">{featured.excerpt}</p>
            <div className="journal-meta">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </Link>

        {/* Article Grid */}
        <div className="journal-grid">
          {rest.map((article) => (
            <Link key={article.id} href="#" className="journal-card">
              <div className="journal-card-image" style={{ backgroundImage: `url(${article.image})` }}></div>
              <div className="journal-card-content">
                <span className="label-md journal-category">{article.category}</span>
                <h3 className="title-md journal-card-title">{article.title}</h3>
                <p className="journal-excerpt">{article.excerpt}</p>
                <div className="journal-meta">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
