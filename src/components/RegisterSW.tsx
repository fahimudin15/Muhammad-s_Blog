"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      const url = "/sw.js";
      navigator.serviceWorker
        .register(url)
        .catch((err) => console.warn("SW registration failed", err));
    }
  }, []);
  return null;
}
