import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-500 text-gray-300 text-center py-4 text-sm">
      © {new Date().getFullYear()} All rights reserved
    </footer>
  );
};

export default Footer;
