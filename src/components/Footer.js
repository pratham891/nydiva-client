// src/components/Footer.js
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="flex justify-center space-x-6">
        <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-400" />
        <Twitter className="w-6 h-6 cursor-pointer hover:text-blue-400" />
        <Instagram className="w-6 h-6 cursor-pointer hover:text-blue-400" />
      </div>
      <p className="text-center mt-4">© 2025 ShopName. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
