"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded bg-gray-100">
        <Image
          src={images[active]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Lihat gambar ${i + 1}`}
            onClick={() => setActive(i)}
            className={clsx(
              "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2",
              i === active ? "border-brand" : "border-transparent"
            )}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
