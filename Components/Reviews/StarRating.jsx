import { Star } from "lucide-react";

const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-yellow-400/40"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;