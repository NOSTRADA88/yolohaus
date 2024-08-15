import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubmenuComponent from "./Submenu";

interface NavLink {
  href: string;
  label: string;
  submenu?: { href: string; label: string }[];
}

interface NavbarProps {
  navLinks: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ navLinks }) => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [SubMenu, setSubMenu] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (dropdownIndex !== null && navLinks[dropdownIndex].submenu) {
      const loadSubmenu = () => {
        setSubMenu(() => SubmenuComponent);
      };
      loadSubmenu();
    }
  }, [dropdownIndex, navLinks]);

  return (
    <div className="w-full bg-lightwhite mt-8 max-xl:mt-4 max-lg:mt-2 ">
      <ul className="flex gap-7 items-center justify-center h-20 max-xl:gap-6 max-lg:gap-[14px]">
        {navLinks.map((link, index) => (
          <li
            key={index}
            onMouseEnter={() => setDropdownIndex(index)}
            onMouseLeave={() => setDropdownIndex(null)}
            className="relative"
          >
            <Link
              to={link.href}
              className="text-maingray hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider flex items-center mr-7"
            >
              {link.label}
              {link.submenu && <span className="ml-1 mb-1 font-bold">⌵</span>}
            </Link>
            {link.submenu && dropdownIndex === index && SubMenu && (
              <SubMenu submenu={link.submenu} />
            )}
            <div className="parallelogram h-4 border-l-[1px] border-[#E5E5E5] absolute top-0 right-0"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
