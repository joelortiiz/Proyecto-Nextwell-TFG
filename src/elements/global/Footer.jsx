import React from 'react';
import './footer.css'; // Asegúrate de importar el archivo CSS
import logo from '../../assets/images/logos/Untitled design.png'; // Importa tu logo

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-links">
                    <ul>
                        <li><a href="/">About Us</a></li>
                        <li><a href="/">Services</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><a href="/">Privacy Policy</a></li>
                    </ul>
                </div>
              
                <div className="footer-contact">
                    <p>Email: joelortiizgarcia@gmail.com</p>
                    <p>Phone: +34 634 567 890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
