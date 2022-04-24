import React from 'react';
import '../css/footer.css';

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <p>© {new Date().getFullYear()} - Site Built By Team Alpha</p>
            </div>
        </div>
    )
}

export default Footer;