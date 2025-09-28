export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">
      #{tag}
    </span>
  );
}
