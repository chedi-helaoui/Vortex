"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@/lib/auth";

interface AuthContextType {
  user: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suppress benign AbortErrors caused by Firebase fetch being interrupted
    // during Next.js page navigation (component unmount race condition).
    const handleError = (event: PromiseRejectionEvent) => {
      if (event.reason?.name === "AbortError") {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handleError);

    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
