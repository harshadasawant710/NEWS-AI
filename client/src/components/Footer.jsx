import { Facebook , Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div>
          <h5 className="text-lg font-semibold mb-3">About Us</h5>
          <p>We provide high-quality services to help your business grow.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Icons */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-3">Follow Us</h5>
          <div className="flex justify-center md:justify-start space-x-4">
              <Link to='' aria-label="Facebook">
              <Facebook/>
              </Link>
            <Link to='' aria-label="Facebook">
              <Twitter/>
              </Link>
            <Link to='' aria-label="Instagram">
              <Instagram/>
              </Link>
              <Link to='' aria-label="Linkedin">
              <Linkedin/>
              </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-600 my-6" />

      {/* Footer Bottom */}
      <div className="text-center">
        <p>&copy; {currentYear} MyWebsite. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
