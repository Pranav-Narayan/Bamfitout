import React from 'react'
import Home from '@/Components/Home/Home'
import Aboutus from '@/Components/Aboutus/Aboutus'
import Services from '@/Components/Services/Services'
import Contact from '@/Components/Contact/Contact'
import VideoCarousel from '@/Components/VideoCarousel/videoCarousel'
import Reviews from '@/Components/Reviews/Reviews'

const page = () => {
  const whatsappNumber = "971528256599";
  const message = "Hi I am interested in your services";

  return (
    <div className='z-10 overflow-hidden'>
      <div className='fixed z-1000 right-8 bottom-32 flex flex-col gap-5'>
        <a href="tel:+971581104847">
          <img
            src="/Icons/telephone.png"
            alt="Call"
            className='h-8 md:h-10 lg:h-12 cursor-pointer'
          />
        </a>
        <a href={`https://wa.me/${whatsappNumber}?text=${message}`} target="_blank">
          <img src="/Icons/whatsapp.png" className="h-8 md:h-10 lg:h-12 cursor-pointer" />
        </a>
      </div>
      <section id="home"><Home /></section>
      <section id="about"><Aboutus /></section>
      <section id="services"><Services /></section>
      <section id="video-gallery"><VideoCarousel /></section>
      <section id="reviews"><Reviews /></section>
      <section id="contact"><Contact /></section>
    </div>
  )
}

export default page