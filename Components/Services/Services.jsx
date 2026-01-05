'use client'

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { services } from "@/Data/ourServices";
import "./Services.scss";

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMounted, setIsMounted] = useState(false); // ← Add this

  const trackRef = useRef(null);
  const carouselRef = useRef(null);

  // Update items per page based on screen size
  useEffect(() => {
    setIsMounted(true); // Mark as mounted (client-side)

    const updateItemsPerPage = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      if (width <= 480) {
        setItemsPerPage(1);
      } else if (width <= 768) {
        setItemsPerPage(2);
      } else if (width <= 1024) {
        setItemsPerPage(2);
      } else if (width <= 1200) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, services.length - itemsPerPage);
  const totalDots = maxIndex + 1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Safe card width calculation
  const getCardWidth = useCallback(() => {
    if (!isMounted || !carouselRef.current) return 300; // fallback width
    const carouselWidth = carouselRef.current.offsetWidth;
    const screenWidth = window.innerWidth;
    const gap = itemsPerPage === 1 ? 0 : (screenWidth <= 768 ? 16 : 24);
    return (carouselWidth - gap) / itemsPerPage;
  }, [itemsPerPage, isMounted]);

  // Drag handlers remain the same
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = getCardWidth() * 0.25;

    if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (translateX < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }

    setTranslateX(0);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => handleDragEnd();

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  // Safe transform calculation
  const getTrackTransform = () => {
    if (!isMounted) return "translateX(0px)";

    const cardWidth = getCardWidth();
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
    const gap = screenWidth <= 768 ? 16 : 24;
    const baseTranslate = currentIndex * (cardWidth + gap);
    return `translateX(${-baseTranslate + translateX}px)`;
  };

  // Don't render carousel until mounted (prevents SSR issues)
  if (!isMounted) {
    return (
      <section className="services">
        <header className="services__header">
          <span className="services__subtitle">Services We Offer</span>
          <h2 className="services__title">Our Featured Services</h2>
        </header>
        {/* Optional: loading placeholder */}
        <div className="services__container" style={{ height: "400px" }} />
      </section>
    );
  }

  return (
    <section className="services">
      <header className="services__header">
        <span className="services__subtitle">Services We Offer</span>
        <h2 className="services__title">Our Featured Services</h2>
      </header>

      <div className="services__container">
        <button
          className="services__nav-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous services"
        >
          <div className="services__nav-btn-circle">
            <ChevronLeft className="services__nav-btn-icon" />
          </div>
        </button>

        <div
          ref={carouselRef}
          className="services__carousel"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className={`services__track ${isDragging ? "is-dragging" : ""}`}
            style={{ transform: getTrackTransform() }}
          >
            {services.map((service) => (
              <article className="services__card" key={service.id}>
                <div className="services__card-image">
                  <img
                    src={service.image}
                    alt={service.name}
                    draggable={false}
                  />
                  <button className="services__card-btn">Learn More</button>
                </div>
                <h3 className="services__card-title">{service.name}</h3>
              </article>
            ))}
          </div>
        </div>

        <button
          className="services__nav-btn"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next services"
        >
          <div className="services__nav-btn-circle">
            <ChevronRight className="services__nav-btn-icon" />
          </div>
        </button>
      </div>

      <div className="services__drag-hint">
        <MoveHorizontal size={18} />
        <span>Swipe to explore</span>
      </div>

      <div className="services__dots" role="tablist" aria-label="Service navigation">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={index}
            className={`services__dot ${currentIndex === index ? "services__dot--active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={currentIndex === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
};

export default Services;