import React, { useState, useEffect, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type NavbarProps = {
  navLinks: {
    href: string;
    label: string;
    submenu?: { href: string; label: string }[];
  }[];
};

const Navbar: React.FC<NavbarProps> = ({ navLinks }) => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [LazySubmenu, setLazySubmenu] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (dropdownIndex !== null && navLinks[dropdownIndex].submenu) {
      const loadSubmenu = async () => {
        const SubmenuComponent = lazy(() => import("./Submenu"));
        setLazySubmenu(() => SubmenuComponent);
      };
      loadSubmenu();
    }
  }, [dropdownIndex, navLinks]);

  return (
    <div className="w-full bg-lightwhite mt-8 max-xl:mt-4 max-lg:mt-2">
      <ul className="flex gap-7 items-center justify-center h-20 max-xl:gap-6 max-lg:gap-[14px]">
        {navLinks.map((link, index) => (
          <React.Fragment key={index}>
            <li
              onMouseEnter={() => setDropdownIndex(index)}
              onMouseLeave={() => setDropdownIndex(null)}
              className="relative"
            >
              <Link
                to={link.href}
                className="text-maingray hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider"
              >
                {link.label}
                {link.submenu && (
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1 " />
                )}
              </Link>
              {link.submenu && dropdownIndex === index && LazySubmenu && (
                <Suspense fallback={<div>Loading...</div>}>
                  <LazySubmenu submenu={link.submenu} />
                </Suspense>
              )}
            </li>
            <div className="parallelogram h-4 border-l-[1px] border-[#E5E5E5]"></div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
