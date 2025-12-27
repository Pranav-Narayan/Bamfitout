'use client'

import React, { useState } from "react";
import "./Services.scss";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { services } from "../../Data/ourServices";

const Services = () => {
  const [start, setStart] = useState(0);
  const itemsPerPage = 4;

  const visibleServices = services.slice(start, start + itemsPerPage);

  const handleNext = () => {
    if (start + itemsPerPage < services.length) {
      setStart(start + 1);  // move by 1 card
    }
  };

  const handlePrev = () => {
    if (start > 0) {
      setStart(start - 1); // move by 1 card
    }
  };

  return (
    <div className="service">
      <div className="head">
        <p>Service we do</p>
        <h2>Our featured service</h2>
      </div>

      <div className="container">
        <button onClick={handlePrev} disabled={start === 0}>
          <div className="circle" />
          <FaArrowLeftLong className="arrow leftarrow" />
        </button>

        <div className="serviceBox">
          {visibleServices.map(service => (
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

        <button
          onClick={handleNext}
          disabled={start + itemsPerPage >= services.length}
        >
          <div className="circle" />
          <FaArrowRightLong className="arrow rightarrow" />
        </button>
      </div>
    </div>
  );
};

export default Services;
