import React from 'react';
import logoImage from '../assets/logo.png';
import '../css/styles.css';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
    );
};

export default Logo;
