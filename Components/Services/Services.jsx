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

  const [selectedService, setSelectedService] = useState(null);

  // Modal Slideshow State
  const [modalIndex, setModalIndex] = useState(0);
  const [modalDragging, setModalDragging] = useState(false);
  const [modalStartX, setModalStartX] = useState(0);
  const [modalTranslateX, setModalTranslateX] = useState(0);

  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const modalTrackRef = useRef(null);

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

  // Auto-rotate modal slideshow
  useEffect(() => {
    if (!selectedService || !selectedService.images || modalDragging) return;

    const interval = setInterval(() => {
      setModalIndex((prev) =>
        prev === selectedService.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedService, modalDragging]);

  // Reset modal index when service opens
  useEffect(() => {
    if (selectedService) {
      setModalIndex(0);
      setModalTranslateX(0);
    }
  }, [selectedService]);


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

  // Main Carousel Drag handlers
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

  // Modal Drag Handlers
  const handleModalDragStart = (clientX) => {
    setModalDragging(true);
    setModalStartX(clientX);
  };

  const handleModalDragMove = (clientX) => {
    if (!modalDragging) return;
    const diff = clientX - modalStartX;
    setModalTranslateX(diff);
  };

  const handleModalDragEnd = () => {
    if (!modalDragging) return;
    setModalDragging(false);

    if (!selectedService || !selectedService.images) {
      setModalTranslateX(0);
      return;
    }

    const threshold = 100; // Drag threshold
    const maxModalIndex = selectedService.images.length - 1;

    if (modalTranslateX > threshold && modalIndex > 0) {
      setModalIndex(modalIndex - 1);
    } else if (modalTranslateX < -threshold && modalIndex < maxModalIndex) {
      setModalIndex(modalIndex + 1);
    }

    setModalTranslateX(0);
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

  const getModalTrackTransform = () => {
    if (!modalTrackRef.current) return `translateX(0px)`;
    const width = modalTrackRef.current.offsetWidth;
    // Assuming width matches the wrapper width which shows 1 slide
    // It actually depends on how we style .services-modal__track
    // Simplify: We will use percentage based logic in CSS usually, but here JS drives it.
    // Let's assume wrapper width aka single slide width is 100%
    // translateX = -(index * 100%) + dragDiff
    return `translateX(calc(-${modalIndex * 100}% + ${modalTranslateX}px))`;
  };


  const handleKnowMore = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
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
        {/* Same Nav Buttons and Carousel code */}
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
                  <button
                    className="services__card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKnowMore(service);
                    }}
                  >
                    Know More
                  </button>
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

      {selectedService && (
        <div className="services-modal" onClick={closeModal}>
          <div className="services-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="services-modal__close" onClick={closeModal}>&times;</button>
            <div
              className="services-modal__image-wrapper"
              onMouseDown={(e) => { e.preventDefault(); handleModalDragStart(e.clientX); }}
              onMouseMove={(e) => handleModalDragMove(e.clientX)}
              onMouseUp={handleModalDragEnd}
              onMouseLeave={() => { if (modalDragging) handleModalDragEnd(); }}
              onTouchStart={(e) => handleModalDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleModalDragMove(e.touches[0].clientX)}
              onTouchEnd={handleModalDragEnd}
            >
              <div
                ref={modalTrackRef}
                className={`services-modal__track ${modalDragging ? "is-dragging" : ""}`}
                style={{ transform: getModalTrackTransform() }}
              >
                {(selectedService.images && selectedService.images.length > 0) ? (
                  selectedService.images.map((img, index) => (
                    <div key={index} className="services-modal__slide">
                      <img src={img} alt={`${selectedService.name} ${index + 1}`} draggable={false} />
                    </div>
                  ))
                ) : (
                  <div className="services-modal__slide">
                    <img src={selectedService.image} alt={selectedService.name} draggable={false} />
                  </div>
                )}
              </div>
            </div>
            <div className="services-modal__info">
              <h3>{selectedService.name}</h3>
              <p>{selectedService.description || selectedService.des || selectedService.desc}</p>
              <div className="btngrp">
                <button><a href="tel:+971581104847">Call Us</a></button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedService(null);
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >Connect Us</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Services;