'use client'

import React, { useState } from "react";
import "./Services.scss";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { services } from "../../Data/ourServices";

const Services = () => {
  const [start, setStart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (start + itemsPerPage < services.length && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStart(start + 1);
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
    }
  };

  const handlePrev = () => {
    if (start > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStart(start - 1);
        setIsAnimating(false);
      }, 500); // Match this with CSS transition duration
    }
  };

  const handleDotClick = (index) => {
    if (!isAnimating && start !== index) {
      setIsAnimating(true);
      setTimeout(() => {
        setStart(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="service">
      <div className="head">
        <p>Service we do</p>
        <h2>Our featured service</h2>
      </div>

      <div className="container">
        <button 
          onClick={handlePrev} 
          disabled={start === 0 || isAnimating}
          className={start === 0 ? 'disabled' : ''}
        >
          <div className="circle" />
          <FaArrowLeftLong className="arrow leftarrow" />
        </button>

        <div className="serviceBox">
          <div 
            className="slideTrack"
            style={{
              transform: `translateX(-${start * (100 / itemsPerPage)}%)`,
            }}
          >
            {services.map(service => (
              <div className="box" key={service.id}>
                <div className="img">
                  <img
                    src={service.image || "/placeholder.jpg"}
                    alt={service.name}
                  />
                  <button className="imgBtn">Know More</button>
                </div>
                <h3>{service.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={start + itemsPerPage >= services.length || isAnimating}
          className={start + itemsPerPage >= services.length ? 'disabled' : ''}
        >
          <div className="circle" />
          <FaArrowRightLong className="arrow rightarrow" />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="progress-dots">
        {Array.from({ length: Math.ceil(services.length - itemsPerPage + 1) }).map((_, index) => (
          <button
            key={index}
            className={`dot ${start === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;