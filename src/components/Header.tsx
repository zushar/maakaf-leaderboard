// src/components/Header.tsx
import React from 'react';
import HeaderLink from './HeaderLink'; // Adjust path if needed
import {Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 bg-sky-700 z-10 shadow-md text-gray-100">
      <div className="relative flex items-center justify-center px-4 py-2">
        <a href="https://maakaf.com/he" aria-label='link to https://maakaf.com/he' className="absolute left-4 text-white hover:text-gray-200 transition duration-300">
          <Home size={40} />
        </a>
        <h3 className="text-xl md:text-2xl font-bold text-center text-white">Our Contributions In Maakaf</h3>
      </div>
      <nav className="font-bold flex flex-col md:flex-row justify-center p-2 space-y-2 md:space-y-0">
        <HeaderLink href="#allTimes" text="All Times" />
        <HeaderLink href="#lastMonth" text="Last Month" />
        <HeaderLink href="#lastWeek" text="Last Week" />
      </nav>
    </div>
  );
};

export default Header;