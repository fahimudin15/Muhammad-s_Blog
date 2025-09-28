import Link from "next/link";
import TagBadge from "./TagBadge";

export type PostCardProps = {
  title: string;
  slug: string;
  date: string;
  description?: string;
  tags?: string[];
};

export default function PostCard({ title, slug, date, description, tags }: PostCardProps) {
  return (
    <article className="group rounded-lg border p-4 transition hover:shadow-sm">
      <h2 className="text-xl font-semibold">
        <Link className="hover:underline" href={`/posts/${slug}`}>
          {title}
        </Link>
      </h2>
      <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
      {description && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  );
}
