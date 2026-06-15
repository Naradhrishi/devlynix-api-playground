import React from "react";
import logo from "../assets/logo.png";
import { FiZap } from "react-icons/fi";

const HeroNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#1a1a1a] border-b border-[#2d2d2d]">
      
      {/* Logo + Name  section*/}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="h-8 w-auto" />
        <span className="text-[#e5e5e5] font-bold text-xl">
          API <span className="text-[#22c55e]">Playground</span>
        </span>
      </div>

      {/* tagline */}
      <div className="hidden md:flex items-center gap-2 text-[#888888] text-sm">
        <FiZap className="text-[#22c55e]" />
        <span>Browser-based API testing — no login, no setup</span>
      </div>

      {/* status indicator as ready */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse"></div>
        <span className="text-[#888888] text-sm">Ready</span>
      </div>

    </nav>
  );
};

export default HeroNavbar;