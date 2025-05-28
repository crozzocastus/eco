import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#2E7D32] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#388E3C] transition"
      aria-label="Scroll to top"
      style={{ minWidth: 40, minHeight: 40 }}
    >
      ↑ Top
    </button>
  );
};

export default ScrollToTopButton;
