"use client";

import { useEffect, useRef } from "react";

// Giscus configuration is pulled from environment variables (NEXT_PUBLIC_*),
// so you can configure it per-deployment without code changes.
// Required envs:
// - NEXT_PUBLIC_GISCUS_REPO (e.g., "owner/repo")
// - NEXT_PUBLIC_GISCUS_REPO_ID
// - NEXT_PUBLIC_GISCUS_CATEGORY
// - NEXT_PUBLIC_GISCUS_CATEGORY_ID
// Optional envs:
// - NEXT_PUBLIC_GISCUS_MAPPING (default: "pathname")
// - NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED ("1" | "0", default: "1")
// - NEXT_PUBLIC_GISCUS_EMIT_METADATA ("1" | "0", default: "0")
// - NEXT_PUBLIC_GISCUS_INPUT_POSITION ("top" | "bottom", default: "bottom")
// - NEXT_PUBLIC_GISCUS_THEME (default: "preferred_color_scheme")
// - NEXT_PUBLIC_GISCUS_LANG (default: "en")

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Clear any existing iframe when navigating between posts
    while (el.firstChild) el.removeChild(el.firstChild);

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    const cfg: Record<string, string> = {
      "data-repo": process.env.NEXT_PUBLIC_GISCUS_REPO || "",
      "data-repo-id": process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
      "data-category": process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "",
      "data-category-id": process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "",
      "data-mapping": process.env.NEXT_PUBLIC_GISCUS_MAPPING || "pathname",
      "data-reactions-enabled": process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED || "1",
      "data-emit-metadata": process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA || "0",
      "data-input-position": process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION || "bottom",
      "data-theme": process.env.NEXT_PUBLIC_GISCUS_THEME || "preferred_color_scheme",
      "data-lang": process.env.NEXT_PUBLIC_GISCUS_LANG || "en",
    };

    Object.entries(cfg).forEach(([k, v]) => script.setAttribute(k, v));
    el.appendChild(script);

    return () => {
      while (el.firstChild) el.removeChild(el.firstChild);
    };
  }, []);

  // If Giscus is not configured, render nothing to avoid layout jumps
  if (!process.env.NEXT_PUBLIC_GISCUS_REPO) {
    return null;
  }

  return <div ref={ref} />;
}
