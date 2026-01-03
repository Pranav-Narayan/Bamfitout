'use client'

import React, { useState, useEffect } from 'react'
import { FaBars } from "react-icons/fa6";
import './Navbar.scss'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home'); 

    const links = [
        { text: 'Home', id: 'home' },
        { text: 'About', id: 'about' },
        { text: 'Services', id: 'services' },
        { text: 'Video Gallery', id: 'video-gallery' },
        { text: 'Reviews', id: 'reviews' },
        { text: 'Contact', id: 'contact' }
    ];

    useEffect(() => {
        // Handle navbar background on scroll
        const handleScrollBg = () => {
            setScrolled(window.scrollY > 0);
        };

        // Handle active section based on scroll position
        const handleActiveSection = () => {
            const sections = links.map(link => document.getElementById(link.id));
            
            let current = 'home';

            // Loop from bottom to top to prioritize lower sections
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) { // section is near viewport center/top
                        current = links[i].id;
                        break;
                    }
                }
            }

            setActiveSection(current);
        };

        // Initial check
        handleScrollBg();
        handleActiveSection();

        window.addEventListener('scroll', handleScrollBg);
        window.addEventListener('scroll', handleActiveSection);

        return () => {
            window.removeEventListener('scroll', handleScrollBg);
            window.removeEventListener('scroll', handleActiveSection);
        };
    }, []);

    return (
        <nav className={scrolled ? "scrolled" : "transparent"}>
            <div className="logo">
                <img src="./Logo.png" alt="Logo" />
            </div>

            <div className="navlinks">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        className={activeSection === link.id ? 'active' : ''}
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

            <div className="hamburger">
                <FaBars className="text-3xl" />
            </div>
        </nav>
    );
}

export default Navbar;