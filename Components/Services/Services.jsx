import React from 'react'
import './Services.scss'
import {FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Services = () => {
    return (
        <div className='service'>
            <div className='head'>
                <p>Service we do</p>
                <h2>Our featured service</h2>
            </div>
            <div className='container'>
                <button> <div className='circle'/><FaArrowLeftLong className='arrow leftarrow'/> </button>
                <div className='serviceBox'>
                    <div className='box'>1</div>
                    <div className='box'>2</div>
                    <div className='box'>3</div>
                    <div className='box'>4</div>
                </div>
                <button> <div className='circle'/> <FaArrowRightLong className='arrow rightarrow'/></button>
            </div>
        </div>
    )
}

export default Services