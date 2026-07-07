import { Star, StarHalf } from "lucide-react";

export default function StarRating({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-[1px]" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return (
            <Star
              key={i}
              size={size}
              className="fill-star text-star"
              strokeWidth={0}
            />
          );
        }
        if (i === full && hasHalf) {
          return (
            <StarHalf
              key={i}
              size={size}
              className="fill-star text-star"
              strokeWidth={0}
            />
          );
        }
        return (
          <Star
            key={i}
            size={size}
            className="fill-gray-200 text-gray-200"
            strokeWidth={0}
          />
        );
      })}
    </div>
  );
}
