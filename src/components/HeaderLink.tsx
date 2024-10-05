// src/components/HeaderLink.tsx
import React from 'react';

interface HeaderLinkProps {
  href: string;
  text: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, text }) => (
  <a href={href} className="transition duration-300 group px-4 text-white text-sm md:text-base">
    <span>{text}</span>
    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
  </a>
);

export default HeaderLink;