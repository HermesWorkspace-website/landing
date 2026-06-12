"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  normalizePath,
  parseNavHref,
  pathsMatch,
  scrollToSection,
  setPendingScrollTarget,
} from "@/lib/scroll-to-section";

type NavHashLinkProps = React.ComponentProps<typeof Link>;

export default function NavHashLink({
  href,
  onClick,
  ...props
}: NavHashLinkProps) {
  const router = useRouter();
  const hrefStr = typeof href === "string" ? href : href.toString();
  const { path, hash } = parseNavHref(hrefStr);
  const targetPath = normalizePath(path || "/");
  const linkHref = hash ? targetPath : href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !hash) return;

    e.preventDefault();

    if (pathsMatch(window.location.pathname, targetPath)) {
      scrollToSection(hash);
      return;
    }

    setPendingScrollTarget(hash);
    router.push(targetPath);
  };

  return <Link href={linkHref} onClick={handleClick} {...props} />;
}
