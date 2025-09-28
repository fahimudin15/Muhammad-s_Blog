import AuthorCard from "@/components/AuthorCard";
export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">About</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Hi, I’m the author of this blog. This space covers web development, Next.js,
          and notes from projects I’m working on.
        </p>
        <p>
          You can customize this page to add your bio, links, and profile picture.
        </p>
      </div>

      <div className="mt-8">
        <AuthorCard
          name="Your Name"
          role="Web Developer"
          bio="I write about web dev, Next.js, and building side projects."
          avatarUrl="/favicon.ico"
          socials={[
            { label: "GitHub", href: "https://github.com/your-handle" },
            { label: "Twitter", href: "https://twitter.com/your-handle" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle/" },
          ]}
        />
      </div>
    </main>
  );
}
