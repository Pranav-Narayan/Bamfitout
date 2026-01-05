'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image.js';
import { heroSlides } from "../../Data/HomeData.js";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import './Home.scss'

const Home = () => {

    const [index, setIndex] = useState(0);

    // Auto slide every 8s
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroSlides.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [index]); // Always have index here

    // Change slide Forward
    const nextSlide = () =>
        setIndex((prev) => (prev + 1) % heroSlides.length);

    // change slide Backward
    const prevSlide = () =>
        setIndex((prev) =>
            prev === 0 ? heroSlides.length - 1 : prev - 1
        );

    const current = heroSlides[index];

    return (
        <div className='home'>
            <AnimatePresence>
                <motion.div
                    key={current.image}
                    className='bg'
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src={current.image}
                        alt=""
                        fill
                        loading="eager"
                        className='img'></Image>
                </motion.div>
            </AnimatePresence>
            <div className='container'>
                <button onClick={prevSlide} className='changeSlide'> <FaArrowLeft className='icon' /></button>
                <div className='content'>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.title1}
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h1>
                                {current.title1}
                            </h1>
                            <h1>
                                {current.title2}
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                    <button>Connect Us</button>
                </div>
                <button onClick={nextSlide} className='changeSlide'> <FaArrowRight className='icon' /> </button>
            </div>
            <div className="indicators">
                {heroSlides.map((item, i) => (
                    <button
                        key={i}
                        className={`${index == i
                            ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default Home