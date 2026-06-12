import Image from "next/image";
import Link from "next/link";

export default function AppNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-6">
      <div className="flex flex-col items-center text-center max-w-md">
        <Link href="/" className="flex items-center gap-3 mb-8" aria-label="HermesWorkspace home">
          <div className="size-14 rounded-2xl overflow-hidden bg-brand-ink flex items-center justify-center shadow-sm">
            <Image
              src="/logo.png"
              alt="HermesWorkspace logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-display font-bold text-[22px] text-brand-ink tracking-[-0.02em]">
            HermesWorkspace
          </span>
        </Link>

        <h1 className="font-display text-[48px] font-extrabold tracking-tight text-brand-ink leading-none mb-2">
          Page not found
        </h1>

        <p className="text-[15px] leading-relaxed text-brand-muted mb-9">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(96,99,238,0.3)] hover:shadow-[0_8px_24px_rgba(96,99,238,0.4)] transition-shadow"
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-brand-ink/10 text-brand-ink text-[13px] font-semibold hover:bg-black/[0.03] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>

      <p className="mt-16 text-[11px] tracking-wider text-brand-muted/50">
        HermesWorkspace &middot; Every school. One platform.
      </p>
    </main>
  );
}
