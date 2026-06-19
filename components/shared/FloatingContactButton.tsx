import { IconHeadset } from "@tabler/icons-react";
import Link from "next/link";

export default function FloatingContactButton() {
  return (
    <Link
      href="/contact#inquiry"
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full bg-brand-ink text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#6063EE] hover:shadow-[#6063EE]/25 hover:shadow-xl active:scale-95"
      style={{
        width: "clamp(52px, 8vw, 60px)",
        height: "clamp(52px, 8vw, 60px)",
      }}
      aria-label="Contact support"
      title="Contact support"
    >
      <IconHeadset
        className="size-5 md:size-6"
        strokeWidth={1.5}
      />
    </Link>
  );
}
