import React from 'react'
import Home from '@/Components/Home/Home'
import Aboutus from '@/Components/Aboutus/Aboutus'
import Services from '@/Components/Services/Services'
import Contact from '@/Components/Contact/Contact'
import VideoCarousel from '@/Components/VideoCarousel/videoCarousel'

const page = () => {
  return (
    <div className='z-10 overflow-hidden'>
      <Home />
      <Aboutus />
      <Services />
      <VideoCarousel />
      <Contact />

    </div>
  )
}

export default page