import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer
            style={{
                background: `url(${footer})`,
                backgroundSize: 'cover'
            }}
            className="p-10 shadow-t-sm">
            <div className='footer grid justify-items-center'>
                <div>
                    <span className="footer-title">Services</span>
                    <Link to="/" className="link link-hover">Web Development</Link>
                    <Link to="/" className="link link-hover">UI/UX Design</Link>
                    <Link to="/" className="link link-hover">Project Management</Link>
                    <Link to="/" className="link link-hover">Consulting</Link>
                </div>
                <div>
                    <span className="footer-title">About</span>
                    <Link to="/" className="link link-hover">Harun</Link>
                    <Link to="/" className="link link-hover">Daffodil International University</Link>
                    <Link to="/" className="link link-hover">Final Year Project</Link>
                    <Link to="/" className="link link-hover">+8801738945147</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link to="/" className="link link-hover">Terms of Use</Link>
                    <Link to="/" className="link link-hover">Privacy Policy</Link>
                    <Link to="/" className="link link-hover">Cookie Policy</Link>
                </div>
            </div>
            <div className='text-center mt-10'>
                <p>Copyright © 2024 - All rights reserved by Harun, Daffodil International University</p>
            </div>
        </footer>
    );
};

export default Footer;
