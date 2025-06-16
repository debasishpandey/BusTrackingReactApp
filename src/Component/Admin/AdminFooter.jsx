import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const AdminFooter = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          
          {/* App Name */}
          <div className="col-md-4 mb-3">
            <h5>BusTrack</h5>
            <p>Track your buses in real-time with ease and accuracy.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/about" className="text-decoration-none text-light">About</a></li>
              <li><a href="/contact" className="text-decoration-none text-light">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6>Follow Us</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-light"><FaFacebookF /></a>
              <a href="#" className="text-light"><FaTwitter /></a>
              <a href="#" className="text-light"><FaInstagram /></a>
              <a href="#" className="text-light"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <small>&copy; {new Date().getFullYear()} BusTrack. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
