import React from "react";

const Footer = () => (
  <footer
    className="py-4 w-full"
    style={{
      backgroundColor: "#fff",
    }}
  >
    <div className="flex justify-center space-x-8">
      <a href="/faq" className="hover:underline hover:text-[#2E7D32] text-[#212121]">FAQ</a>
      <a href="/help" className="hover:underline hover:text-[#2E7D32] text-[#212121]">Help</a>
      <a href="/about" className="hover:underline hover:text-[#2E7D32] text-[#212121]">About</a>
    </div>
    <div className="text-center text-xs mt-2 text-[#212121]">&copy; {new Date().getFullYear()} EcoApp</div>
  </footer>
);

export default Footer;
