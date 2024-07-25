// Submenu.tsx
import React from "react";
import { Link } from "react-router-dom";

type SubmenuProps = {
  submenu: { href: string; label: string }[];
};

const Submenu: React.FC<SubmenuProps> = ({ submenu }) => {
  return (
    <ul
      className="submenu absolute left-0 transition-all duration-300 bg-lightwhite submenu-open animate-fadeIn"
      style={{ width: "150%", marginLeft: "-25%" }}
    >
      {submenu.map((sublink, subIndex) => (
        <li key={subIndex} className="whitespace-nowrap">
          <Link
            rel="noopener noreferrer"
            to={sublink.href}
            className="block px-4 py-1 text-center text-maingray hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider"
          >
            {sublink.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Submenu;
