const PENDING_SCROLL_KEY = "hermes:scroll-to";

/** Section ids that differ between mobile/desktop layouts */
const SECTION_ALIASES: Record<string, string[]> = {
  inquiry: ["inquiry", "m-inquiry"],
  features: ["features", "m-features"],
  founders: ["founders", "team"],
  team: ["team"],
};

function getHeaderOffset(): number {
  if (typeof window === "undefined") return 96;
  return window.innerWidth >= 768 ? 96 : 56;
}

function isElementVisible(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function pickVisibleElement(matches: NodeListOf<Element>): HTMLElement | null {
  if (matches.length === 0) return null;
  if (matches.length === 1) return matches[0] as HTMLElement;

  const visible = Array.from(matches).find(isElementVisible);
  return (visible ?? matches[matches.length - 1]) as HTMLElement;
}

function resolveSectionIds(id: string): string[] {
  return SECTION_ALIASES[id] ?? [id];
}

function getScrollTarget(id: string): HTMLElement | null {
  for (const sectionId of resolveSectionIds(id)) {
    const matches = document.querySelectorAll(`#${CSS.escape(sectionId)}`);
    const target = pickVisibleElement(matches);
    if (target) return target;
  }
  return null;
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const target = getScrollTarget(id);
  if (!target) return false;

  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
  );

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("hermes:scroll-to", { detail: { top, behavior } })
    );
  }

  return true;
}

export function parseNavHref(href: string): { path: string; hash: string | null } {
  if (href.startsWith("#")) {
    return { path: "", hash: href.slice(1) || null };
  }

  try {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost";
    const url = new URL(href, base);
    return {
      path: url.pathname,
      hash: url.hash ? url.hash.slice(1) : null,
    };
  } catch {
    return { path: href, hash: null };
  }
}

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "") || "/";
}

export function pathsMatch(current: string, target: string): boolean {
  return normalizePath(current) === normalizePath(target || "/");
}

export function setPendingScrollTarget(id: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_SCROLL_KEY, id);
}

function consumePendingScrollTarget(): string | null {
  if (typeof window === "undefined") return null;
  const id = sessionStorage.getItem(PENDING_SCROLL_KEY);
  if (id) sessionStorage.removeItem(PENDING_SCROLL_KEY);
  return id;
}

export function getScrollIdFromLocation(): string | null {
  if (typeof window === "undefined") return null;

  const pending = consumePendingScrollTarget();
  if (pending) return pending;

  const hash = window.location.hash.slice(1);
  if (hash) return hash;

  return new URLSearchParams(window.location.search).get("scroll");
}

export function stripHashFromUrl(): void {
  if (typeof window === "undefined" || !window.location.hash) return;
  const query = window.location.search;
  window.history.replaceState({}, "", `${window.location.pathname}${query}`);
}

function cleanScrollQueryParam(): void {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("scroll")) return;
  params.delete("scroll");
  const query = params.toString();
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}${query ? `?${query}` : ""}`
  );
}

export function cleanUrlAfterScroll(): void {
  stripHashFromUrl();
  cleanScrollQueryParam();
}
