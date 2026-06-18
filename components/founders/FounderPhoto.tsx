"use client";

import Image from "next/image";

export const FOUNDER_PHOTO_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 320px";
export const FOUNDER_PHOTO_QUALITY = 90;

type FounderPhotoProps = {
  src: string;
  alt: string;
  /** Wrapper className — must have explicit width/height or aspect-ratio set */
  className?: string;
  imageClassName?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  fit?: "cover" | "contain";
  /** Aspect ratio for CLS prevention — default "3/4" */
  aspectRatio?: string;
};

/**
 * FounderPhoto
 *
 * CLS-safe: always wraps Image in a positioned container with explicit
 * aspect-ratio, never relies on fill alone without a fixed parent dimension.
 */
export function FounderPhoto({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = FOUNDER_PHOTO_SIZES,
  quality = FOUNDER_PHOTO_QUALITY,
  priority = false,
  fit = "cover",
  aspectRatio = "3/4",
}: FounderPhotoProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`
          ${fit === "contain" ? "object-contain object-center" : "object-cover object-top"}
          transition-transform duration-700 ease-out
          ${imageClassName}
        `}
      />
    </div>
  );
}
