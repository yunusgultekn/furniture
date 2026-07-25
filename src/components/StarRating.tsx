import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: number;
  showText?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewsCount,
  size = 14,
  showText = true,
}) => {
  const percentage = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-stone-600">
      <div className="relative inline-flex items-center" title={`${rating.toFixed(1)} / 5`}>
        {/* Background stars */}
        <div className="flex text-stone-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={size} className="fill-current stroke-none" />
          ))}
        </div>
        {/* Foreground filled stars */}
        <div
          className="absolute top-0 left-0 flex overflow-hidden text-amber-500"
          style={{ width: `${percentage}%` }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={size} className="fill-current stroke-none shrink-0" />
          ))}
        </div>
      </div>
      {showText && (
        <span className="font-semibold text-stone-700">
          {rating.toFixed(1)}
          {reviewsCount !== undefined && (
            <span className="text-stone-400 font-normal ml-0.5">({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
};
