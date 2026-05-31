"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/** ~2× card width so portraits stay sharp on retina displays */
export const FOUNDER_PHOTO_SIZES = "(max-width: 768px) 480px, 640px";
export const FOUNDER_PHOTO_QUALITY = 92;

type FounderPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  fit?: "cover" | "contain";
};

export function FounderPhoto({
  src,
  alt,
  className,
  imageClassName,
  sizes = FOUNDER_PHOTO_SIZES,
  quality = FOUNDER_PHOTO_QUALITY,
  priority = false,
  fit = "cover",
}: FounderPhotoProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={cn(
          fit === "contain"
            ? "object-contain object-center"
            : "object-cover object-top",
          imageClassName
        )}
      />
    </div>
  );
}
