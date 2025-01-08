import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiPhone, HiMail } from "react-icons/hi";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Column 1: About Us */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">About Us</h3>
                    <p>
                        DeliverAddis is your go-to platform for food delivery from your
                        favorite restaurants across Addis Ababa. We bring meals directly to
                        your doorsteps.
                    </p>
                </div>

                {/* Column 2: Contact Information */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <div className="flex items-center gap-3 mb-4">
                        <HiPhone className="text-lg" />
                        <p>+251-966-935-941</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <HiMail className="text-lg" />
                        <p>help@deliveraddis.com</p>
                    </div>
                </div>

                {/* Column 3: Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="/services" className="hover:text-gray-400">Services</a></li>
                        <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
                        <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                    </ul>
                </div>

                {/* Column 4: Social Media Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
                    <div className="flex flex-col items-start gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <HiPhone className="text-lg text-gray-400" />
                            <span className="text-lg">+251-966-935-941</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <HiMail className="text-lg text-gray-400" />
                            <span className="text-lg">help@deliveraddis.com</span>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-6">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-400"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-400"
                            >
                                <FaTwitter size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-400"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-400"
                            >
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-gray-400 mt-8">
                <p>&copy; 2025 DeliverAddis. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
