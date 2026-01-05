'use client'
import React from 'react'
import './Footer.scss'
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {

  const links = [
    { text: 'Home', id: 'home' },
    { text: 'About', id: 'about' },
    { text: 'Services', id: 'services' },
    { text: 'Video Gallery', id: 'video-gallery' },
    { text: 'Reviews', id: 'reviews' },
    { text: 'Contact', id: 'contact' }
  ];

  return (
    <div className='text-black relative z-50 footer'>
      <div className="imagefooter">
        <div><img src="falseCeiling.avif" alt="" /></div>
        <div><img src="electricalworks.jpeg" alt="" /></div>
        <div><img src="flooring.avif" alt="" /></div>
        <div><img src="about.avif" alt="" /></div>
        <div><img src="kitchenRenovation.avif" alt="" /></div>
      </div>
      <div className="first">
        <div className='company'>
          <img src="/Logo.png" alt="" className='logo' />
          <p>BAM Interiors is a professional design and event solutions company dedicated to creating refined interior spaces and well-executed events. We focus on quality, precision, and client satisfaction, delivering thoughtful results with a commitment to excellence.</p>
          <div className='socials'>
            <img src="/Icons/instagram.png" alt="" />
            <img src="/Icons/facebook.png" alt="" />
            <img src="/Icons/whatsapp.png" alt="" />
          </div>
        </div>
        <div className='options'>
          <div className='links'>
            <h2>Links</h2>
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className='connect'>
            <h2>Connect Us</h2>
            <div>
              <p><IoCallSharp />Phone</p>
              <p>🇦🇪 +971 524383613</p>
              <p>🇦🇪 +971 581104847</p>
            </div>
            <div>
              <p><MdEmail />Email</p>
              <p>Connect@bamfitout.com</p>
            </div>
            <div>
              <p><FaLocationDot />Location</p>
              <p>BAM INTERIORS , DUBAI</p>
            </div>
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