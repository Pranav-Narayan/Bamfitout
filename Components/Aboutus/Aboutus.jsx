'use client'

import React, { useState } from 'react'
import './Aboutus.scss'

const Notes = [
    {
        id: 1,
        buttonValue: "Interior Works",
        description:
            "We bring spaces to life with elegant and functional interior designs tailored to each client’s lifestyle. From modern homes to stylish commercial spaces, our work blends creativity, comfort, and precision. Every project is crafted with attention to detail, quality materials, and timeless aesthetics.",
        properties: [
            "Quality and designs checks deeply",
            "Periodic site review and timeliness",
            "Design development and strategy"
        ],
        image: "/about1.avif"
    },
    {
        id: 2,
        buttonValue: "Office Fit-Out",
        description: "We create functional, stylish, and efficient office environments designed to enhance productivity and reflect your brand identity. From space planning to complete interior execution, our team ensures a smooth transformation process with high-quality finishes and professional project management.",
        properties: [
            "Smart space planning for better workflow",
            "Modern and functional interior designs",
            "On-time project delivery with quality execution"
        ],
        image: "/about2.avif"
    },
]

const Aboutus = () => {

    const [activeId, setActiveId] = useState(1);


    const activeItem = Notes.find(item => item.id === activeId);

    return (
        <div className='about'>

            <div className='left'>
                <img src="/about.avif" alt="" />
            </div>

            <div className='right'>
                <h5>About Us</h5>
                <h1>We provide you the best <br />experience</h1>

                <p>
                    We are a creative interior design and event management company dedicated to transforming spaces and experiences. From modern homes to memorable events, we blend style, functionality, and detail in everything we do. Our team believes great design comes from understanding people, purpose, and emotion. With passion and precision, we turn ideas into beautiful realities that inspire and delight.
                </p>

                <div className='box'>

                    {/* Buttons */}
                    <div className="btns">
                        {Notes.map(item => (
                            <button
                                key={item.id}
                                className={activeId === item.id ? "active" : ""}
                                onClick={() => setActiveId(item.id)}
                            >
                                {item.buttonValue}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Content */}
                    <div className='container'>
                        <div className='content'>
                            <p>{activeItem.description}</p>

                            <div>
                                {activeItem.properties.map((prop, idx) => (
                                    <span key={idx}>✅ {prop}</span>
                                ))}
                            </div>
                        </div>

                        <img src={activeItem.image} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus
