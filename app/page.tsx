import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-rose-50">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-serif text-rose-900">
          Valentine's Day, thoughtfully done
        </h1>

        <p className="text-lg text-rose-700">
          Get a simple idea. Write a meaningful letter. No pressure.
        </p>

        <Link
          href="/idea"
          className="inline-block rounded-full bg-rose-500 hover:bg-rose-600 px-8 py-3 text-white transition-colors"
        >
          Help me plan Valentine's Day
        </Link>
      </div>
    </main>
  );
}
