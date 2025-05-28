import React from "react";

const Logo = ({ className = "", size = "medium" }) => {
  const sizes = {
    small: "h-8 w-auto",
    medium: "h-12 w-auto",
    large: "h-16 w-auto"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/LOGO-ECO.png" 
        alt="Logo ECO" 
        className={sizes[size]}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default Logo; 