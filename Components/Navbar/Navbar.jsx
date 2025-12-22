import React from 'react'
import { FaBars } from "react-icons/fa6";
import './Navbar.scss'


const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <img src="./Logo.png" alt=""/>
            </div>
            <div className="navlinks">
                <a href="" className='active'>Home</a>
                <a href="">About</a>
                <a href="">Services</a>
                <a href="">Video Gallery</a>
                <a href="">Portfolio</a>
                <a href="">Contact</a>
            </div>
            <div className='connect'>
                <img src="/Icons/telephone.png" alt=""/>
                <img src="/Icons/whatsapp.png" alt=""/>
            </div>
            <div className='hamburger'>
                <FaBars className='text-3xl'/>
            </div>
        </nav>
    )
}

export default Navbar