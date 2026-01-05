'use client'

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/Data/CustomerReviews";
import { useCarouselDrag } from "@/app/hooks/useCarousel";
import StarRating from "./StarRating";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

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

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to right, hsla(30, 10%, 10%, 0.85), hsla(30, 10%, 10%, 0.6)), url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80')`,
      }}
      aria-label="Customer Reviews"
    >
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row h-full gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center lg:w-1/2 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-white font-medium tracking-widest uppercase text-sm mb-4"
            >
              Customer Reviews
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              What They're Talking{" "}
              <span className="text-gradient-gold">About Us?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white text-base sm:text-lg max-w-md mx-auto lg:mx-0"
            >
              Discover why our clients trust us with their most cherished spaces and celebrations.
            </motion.p>
          </div>

          {/* Right Content - Review Card */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-lg"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Review Card */}
              <div
                className="bg-white md:min-h-100 relative bg-card/95 backdrop-blur-sm rounded-2xl shadow-elevated p-6 sm:p-8 lg:p-10 cursor-grab active:cursor-grabbing select-none overflow-hidden"
                {...handlers}
                style={{
                  transform: isDragging ? `translateX(${dragOffset * 0.3}px)` : undefined,
                  transition: isDragging ? "none" : "transform 0.3s ease-out",
                }}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 text-primary/20" />

                {/* Animated Content */}
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
                      scale: { duration: 0.3 },
                    }}
                    className="min-h-45 md:min-h-55 flex flex-col gap-5 sm:gap-6"
                  >
                    {/* Avatar and Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-xl sm:text-2xl font-display font-semibold">
                          {currentReview.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-sage rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-card-foreground">
                          {currentReview.name}
                        </h3>
                        <StarRating rating={currentReview.rating} />
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed italic">
                      "{currentReview.review}"
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 sm:mt-8 pt-6 border-t border-border">
                  {/* Arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={goToPrev}
                      className="p-2 sm:p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-2 sm:p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-primary w-6"
                            : "bg-muted hover:bg-muted-foreground/50 w-2"
                        }`}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-2xl border-2 border-primary/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;