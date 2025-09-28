import Image from "next/image";
import Link from "next/link";

type Social = { label: string; href: string };

export type AuthorCardProps = {
  name: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  socials?: Social[];
};

export default function AuthorCard({ name, role, bio, avatarUrl, socials = [] }: AuthorCardProps) {
  return (
    <section className="flex items-start gap-4 rounded-lg border p-4">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={`${name} avatar`}
          width={72}
          height={72}
          className="size-18 rounded-full object-cover"
        />
      ) : (
        <div className="size-18 rounded-full bg-gray-200 dark:bg-gray-800" aria-hidden />
      )}
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        {role && <p className="text-sm text-gray-500">{role}</p>}
        {bio && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{bio}</p>}
        {socials.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {socials.map((s) => (
              <Link key={s.href} className="text-blue-600 hover:underline dark:text-blue-400" href={s.href}>
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
