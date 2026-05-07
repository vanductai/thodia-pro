"use client";

interface PhotoGalleryProps {
  photos: string[];
  altPrefix: string;
}

export function PhotoGallery({ photos, altPrefix }: PhotoGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {photos.map((src, i) => (
        <div key={i} className="aspect-video rounded-md overflow-hidden bg-muted border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${altPrefix} — ảnh ${i + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ))}
    </div>
  );
}
