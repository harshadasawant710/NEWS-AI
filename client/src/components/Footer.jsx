import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-cyan-100 to-gray-200 py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    {/* About Us */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h5 className="text-lg font-semibold mb-3 text-gray-800">About Us</h5>
                        <p className="text-gray-600">
                            Your AI-powered news source delivering real-time insights, trending topics, and expert analysis.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h5 className="text-lg font-semibold mb-3 text-gray-800">Quick Links</h5>
                        <ul className="space-y-2">
                            {['About', 'News', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={`/${item.toLowerCase()}`} 
                                        className="text-gray-600 hover:text-cyan-600 transition-all duration-300"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Media Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h5 className="text-lg font-semibold mb-3 text-gray-800">Follow Us</h5>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 100 }}
                                >
                                    <Link to="#" aria-label="Social Media">
                                        <Icon size={24} className="text-gray-600 hover:text-cyan-600 transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.hr 
                    className="border-gray-400 my-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                />

                {/* Footer Bottom */}
                <motion.div 
                    className="text-center text-gray-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    &copy; {currentYear} AI News Companion. All rights reserved.
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
