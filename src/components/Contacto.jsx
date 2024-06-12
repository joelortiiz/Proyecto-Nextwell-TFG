import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';
import { Header } from '../elements/global/Header';
import Footer from '../elements/global/Footer';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.send(
            'service_l92xpjc',
            'template_47ddu5k',
            formData,
            '6iYt09Ufsfiwcb_4w'
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setStatus('SUCCESS');
        }, (err) => {
            console.log('FAILED...', err);
            setStatus('FAILED');
        });
    };

    return (
        <div>
            <Header/>
            <div className='contact-form-container'>
            <h2 className='white text-center'>Contacta con el Administrador</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='white' htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='white' htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='white' htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Enviar</button>
                {status === 'SUCCESS' && <p className="success-message">Mensaje enviado correctamente!</p>}
                {status === 'FAILED' && <p className="error-message">Error al mandar el email de contacto.</p>}
            </form>
            </div>
            <Footer/>
        </div>
    );
};

export default ContactForm;
