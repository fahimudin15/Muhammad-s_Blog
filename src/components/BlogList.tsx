"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import PostCard from "./PostCard";

export type BlogListItem = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  slug: string;
};

export default function BlogList({ items }: { items: BlogListItem[] }) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((it) => (it.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: ["title", "description", "tags"],
      includeScore: true,
      threshold: 0.35,
    });
  }, [items]);

  const filtered = useMemo(() => {
    let base: BlogListItem[] = items;

    if (query.trim()) {
      base = fuse.search(query.trim()).map((r) => r.item);
    }

    if (selectedTags.length > 0) {
      base = base.filter((it) => (it.tags || []).some((t) => selectedTags.includes(t)));
    }

    return base;
  }, [items, fuse, query, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full max-w-md rounded border bg-white px-3 py-2 text-sm outline-none ring-0 dark:bg-zinc-900"
        />
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => {
            const active = selectedTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`rounded-full border px-2 py-1 text-xs ${
                  active ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                aria-pressed={active}
              >
                #{t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            slug={post.slug}
            date={post.date}
            description={post.description}
            tags={post.tags}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No posts match your filters.</p>
        )}
      </div>
    </div>
  );
}
