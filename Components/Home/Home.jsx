'use client'

import React, { useState, useEffect } from 'react'
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
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1 }}
                    style={{ backgroundImage: `url(${current.image})` }}
                />
            </AnimatePresence>
            <button onClick={prevSlide} className='changeSlide'> <FaArrowLeft className='icon' /></button>
            <div className='content'>
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={current.title}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {current.title}
                    </motion.h1>
                    <button
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                    >Connect Us</button>
                </AnimatePresence>

            </div>
            <button onClick={nextSlide} className='changeSlide'> <FaArrowRight className='icon' /> </button>
        </div>
    )
}

export default Home