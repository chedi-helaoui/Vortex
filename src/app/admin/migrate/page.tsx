"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import { setProductWithId } from "@/lib/products";
import { useAuth } from "@/context/AuthContext";

export default function MigratePage() {
  const { user } = useAuth();
  const [status, setStatus] = useState("Idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleMigrate = async () => {
    if (!user) {
      setStatus("Error: You must be logged in to migrate data.");
      return;
    }

    setStatus("Migrating...");
    setLogs(["Starting migration..."]);

    let successCount = 0;
    try {
      for (const p of products) {
        setLogs((prev) => [...prev, `Uploading ${p.name}...`]);
        await setProductWithId(p.id, {
          name: p.name,
          price: p.price,
          category: p.category,
          image: p.image,
          description: p.description
        });
        successCount++;
        setLogs((prev) => [...prev, `✅ Uploaded ${p.name}`]);
      }
      setStatus(`Success! Uploaded ${successCount} products.`);
    } catch (e: any) {
      console.error(e);
      setStatus("Error: " + e.message);
      setLogs((prev) => [...prev, `❌ Error: ${e.message}`]);
    }
  };

  return (
    <div style={{ padding: "100px 20px", maxWidth: "600px", margin: "0 auto", minHeight: "80vh" }}>
      <h1 className="display-font" style={{ fontSize: "3rem", marginBottom: "1rem" }}>Database Migration</h1>
      <p style={{ marginBottom: "2rem", color: "var(--secondary)" }}>
        Current user: {user?.email || "Not logged in"}
      </p>
      
      <button 
        onClick={handleMigrate} 
        className="btn-primary" 
        style={{ width: "100%", marginBottom: "2rem" }}
      >
        MIGRATE LOCAL DATA TO FIRESTORE
      </button>
      
      <div style={{ padding: "1.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "var(--radius-lg)" }}>
        <h3 className="title-md" style={{ marginBottom: "1rem" }}>Status: {status}</h3>
        <div style={{ fontSize: "0.875rem", fontFamily: "monospace", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
