'use client'
import React, { useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import './Contact.scss'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [serverError, setServerError] = useState('');


    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,15}$/;

        if (!formData.name.trim()) newErrors.name = 'Name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleClear = (field) => {
        setFormData({ ...formData, [field]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setServerError('');

        if (!consent) return;
        if (!validate()) return;
        try {
            setLoading(true);

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSuccess('Message sent successfully! We will contact you soon.');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setConsent(false);

        } catch (error) {
            console.error("Submission Error:", error);
            setServerError(error.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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
                        <input
                            type="text"
                            name="name"
                            placeholder='Name *'
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {formData.name && <FaXmark className="clear-btn" onClick={() => handleClear('name')} />}
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className='input'>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email *'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formData.email && <FaXmark className="clear-btn" onClick={() => handleClear('email')} />}
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className='phn'>
                        <span>🇦🇪  +971 </span>
                        <div className="input-wrapper" style={{ width: '100%', position: 'relative' }}>
                            <input
                                type="text"
                                name="phone"
                                placeholder='phone *'
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {formData.phone && <FaXmark className="clear-btn" onClick={() => handleClear('phone')} style={{ right: '0' }} />}
                        </div>
                    </div>
                    {errors.phone && <span className="error-message" style={{ marginTop: '-0.5rem' }}>{errors.phone}</span>}

                    <div className='input'>
                        <textarea
                            name="message"
                            placeholder='Messages if any'
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        {formData.message && <FaXmark className="clear-btn" onClick={() => handleClear('message')} />}
                    </div>
                    <div className="consent">
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                        />
                        <p>By sending an enquiry, I allow BAM interiors & Events to contact me for more details.</p>
                    </div>
                    {success && <p className="success-message">{success}</p>}
                    {serverError && <p className="error-message">{serverError}</p>}
                    <div className='buttons'>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={!consent || loading}
                            style={{
                                opacity: consent ? 1 : 0.5,
                                cursor: consent ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>

                        <button
                            type="button"
                            onClick={() => window.location.href = 'tel:+971581104847'}
                        >
                            Make a Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact