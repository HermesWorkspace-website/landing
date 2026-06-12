import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] font-sans px-6 m-0">
      <div className="flex flex-col items-center text-center max-w-[420px]">
        <Link
          href="/"
          className="flex items-center gap-3 mb-8 no-underline text-inherit"
          aria-label="HermesWorkspace home"
        >
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#161922] flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="HermesWorkspace logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-['DM_Sans',system-ui,sans-serif] font-bold text-[22px] tracking-[-0.02em] text-[#161922]">
            HermesWorkspace
          </span>
        </Link>

        <h1 className="text-5xl leading-none font-extrabold tracking-[-0.03em] text-[#161922] m-0 mb-2">
          Page not found
        </h1>

        <p className="text-[15px] leading-relaxed text-[#62666D] m-0 mb-9">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#6063EE] text-white text-[13px] font-bold font-inherit no-underline shadow-[0_4px_16px_rgba(96,99,238,0.3)]"
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border-[1.5px] border-solid border-[#D0D6E0] text-[#161922] text-[13px] font-semibold font-inherit no-underline"
          >
            Contact Support
          </Link>
        </div>
      </div>

      <p className="mt-16 text-xs text-[#A0A5B0] tracking-[0.03em]">
        HermesWorkspace &middot; Every school. One platform.
      </p>
    </main>
  );
}
