import React from 'react'
import './Contact.scss'

const Contact = () => {
    return (
        <div className='contact'>
            <div className="head">
                <p>Contact Us</p>
                <h2>Contact us to create your dream space.</h2>
            </div>
            <div className='connect'>
                <div className="left">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191544.33090907056!2d55.223272742684905!3d25.138555050339633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f65e7ba02facf%3A0x86a313b974a8851!2sBAM%20Interiors!5e0!3m2!1sen!2sin!4v1766737709194!5m2!1sen!2sin" width="600" height="450" loading="lazy"></iframe>
                </div>
                <div className="right">
                    <h1>Connect US</h1>
                    <div className='input'>
                        <input type="text" placeholder='Name*' />
                    </div>
                    <div className='input'>
                        <input type="email" placeholder='Email' />
                    </div>
                    <div className='phn'>
                        <span>+971 </span>
                        <input type="text" placeholder='phone*' />
                    </div>
                    <div className='input'>
                        <textarea placeholder='Messages if any'></textarea>
                    </div>
                    <div className="consent">
                        <input type="checkbox" />
                        <p>By sending an enquiry, I allow BAM interiors & Events to contact me for more details.</p>
                    </div>
                    <div className='buttons'>
                        <button>Send Message</button>
                        <button>Call Us</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact