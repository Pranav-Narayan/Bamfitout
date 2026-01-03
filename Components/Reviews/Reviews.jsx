'use client';

import { useState, useEffect, useCallback } from "react";
import { reviews } from "@/Data/CustomerReviews";
import { useCarouselDrag } from "@/app/hooks/useCarousel";
import StarRating from "./StarRating";
import './Reviews.scss';
import { motion, AnimatePresence } from "framer-motion";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  const goToSlide = useCallback((index) => {
    const diff = index - currentIndex;
    setDirection(diff > 0 ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const { isDragging, dragOffset, handlers } = useCarouselDrag({
    onNext: goToNext,
    onPrev: goToPrev,
  });

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const currentReview = reviews[currentIndex];

  // Variants for slide animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  return (
    <div className="pt-28">
      <section
        className="relative h-137.5 bg-cover bg-bottom bg-no-repeat reviews"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 18, 23, 0.45), rgba(15, 18, 23, 0.45)), url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80')`,
        }}
        aria-label="Customer Reviews"
      >
        <div className="container h-full">
          <div className="box bg-black/65 text-white w-full md:w-1/2 h-full flex flex-col p-8 relative">
            <span>Customer Reviews</span>
            <h2>What They're Talking About Company?</h2>

            {/* Draggable Card */}
            <div
              className="text absolute bottom-[5%] w-full md:w-full p-8 flex flex-col items-center gap-6 cursor-grab active:cursor-grabbing select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              {...handlers}
              style={{
                transform: isDragging ? `translateX(${dragOffset * 0.3}px)` : undefined,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >
              {/* Animated Review Content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="content flex gap-6 items-start justify-between w-full"
                >
                  {currentReview.gender === "Male" ? <img
                    src="./man.png"
                    alt={currentReview.name}
                    className="h-20 w-20 rounded-full object-cover shrink-0"
                    draggable={false}
                  /> : <img
                    src="./woman.png"
                    alt={currentReview.name}
                    className="h-20 w-20 rounded-full object-cover shrink-0"
                    draggable={false}
                  />}
                  <div className="flex flex-col gap-3">
                    <StarRating rating={currentReview.rating} />
                    <p className="text-lg text-white leading-relaxed">
                      "{currentReview.review}"
                    </p>
                    <p className="text-black font-bold text-xl">
                      {currentReview.name}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot Navigation */}
              <div className="dotbar flex gap-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                        ? "bg-black scale-110"
                        : "bg-white/50 hover:bg-white/70"
                      }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;