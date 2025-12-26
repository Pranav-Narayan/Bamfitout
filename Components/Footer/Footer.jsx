import React from 'react'
import './Footer.scss'
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='text-black relative z-50 footer'>
      <div className="first">
        <div className='company'>
          <img src="/Logo.png" alt="" className='logo' />
          <p>BAM Interiors & Events is a professional design and event solutions company dedicated to creating refined interior spaces and well-executed events. We focus on quality, precision, and client satisfaction, delivering thoughtful results with a commitment to excellence.</p>
          <div className='socials'>
            <img src="/Icons/instagram.png" alt="" />
            <img src="/Icons/facebook.png" alt="" />
            <img src="/Icons/whatsapp.png" alt="" />
          </div>
        </div>
        <div className='links'>
          <h2>Links</h2>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Video Gallery</li>
          <li>Contact</li>
        </div>
        <div className='services'>
          <h2>Services</h2>
          <li>Kitchen Renovation</li>
          <li>Flooring Works</li>
          <li>False ceiling</li>
          <li>Electrial Works</li>
          <li>Bathroom Renovation</li>
          <li>Carpentory Works</li>
          <li>Glass Partitions</li>
          <li>Painting</li>
          <li>Water Proofing</li>
        </div>
        <div className='connect'>
          <h2>Connect Us</h2>
          <div>
            <p><IoCallSharp />Phone</p>
            <p>+971 524383613</p>
            <p>+971 524383613</p>
          </div>
          <div>
            <p><MdEmail />Email</p>
            <p>Connect@bamfitout.com</p>
          </div>
          <div>
            <p><FaLocationDot />Location</p>
            <p>BAM INTERIORS & EVENTS, DUBAI</p>
          </div>
        </div>
      </div>
      <div className="second">
        copyright © 2024-2026 ,bamfitout.com. All rights reserved
      </div>
    </div>
  )
}

export default Footer