import type { Metadata } from "next";
import "./globals.css";
import "./components.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "VORTEX | High-Performance Minimalist Fashion",
  description: "Experience the ultimate in minimalist design. VORTEX — where architectural form meets wearable precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
