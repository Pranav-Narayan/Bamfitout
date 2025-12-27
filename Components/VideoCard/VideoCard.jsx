import { useState } from "react";
import { Play, X } from "lucide-react";

const VideoCard = ({ videoId, title, isPlaying, onPlay, onStop }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleStop = (e) => {
    e.stopPropagation();
    onStop();
  };

  return (
    <div className="group relative rounded-xl overflow-hidden bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="aspect-4/3 relative">
        {isPlaying ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={handleStop}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors"
              aria-label="Stop video"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </>
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <button
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label={`Play ${title}`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default VideoCard;