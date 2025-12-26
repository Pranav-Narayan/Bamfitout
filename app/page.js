import React from 'react'
import Home from '@/Components/Home/Home'
import Aboutus from '@/Components/Aboutus/Aboutus'
import Services from '@/Components/Services/Services'

const page = () => {
  return (
    <div className='z-10 overflow-hidden'>
      <Home />
      <Aboutus />
      <Services/>
    </div>
  )
}

export default page