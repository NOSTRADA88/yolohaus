import { useState } from "react";
import { navLinks } from "../../constants"
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);    
    return (
        <div className="w-full bg-lightwhite mt-8">
            <ul className="flex gap-6 items-center justify-center h-20">
                {navLinks.map((link, index) => (
                    <React.Fragment key={index}>
                        <li
                            onMouseEnter={() => setDropdownIndex(index)}
                            onMouseLeave={() => setDropdownIndex(null)}
                            className="relative"
                        >
                            <a
                                href={link.href}
                                className="text-maingray hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider"
                            >
                                {link.label}
                                {link.submenu && (
                                    <FontAwesomeIcon icon={faChevronDown} className="ml-1 "   />
                                )}
                            </a>
                            {link.submenu && (
                                <ul
                                    className={`submenu absolute left-0 transition-all duration-300 bg-lightwhite  ${dropdownIndex === index ? 'submenu-open' : 'hidden'}`}
                                    style={{ width: '150%', marginLeft: '-25%' }}
                                >
                                    {link.submenu.map((sublink, subIndex) => (
                                        <li key={subIndex} className="whitespace-nowrap">
                                            <a href={sublink.href} className="block px-4 py-1 text-center text-maingray hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider">
                                                {sublink.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <div className="parallelogram h-4 border-l-[1px] border-[#E5E5E5]"></div>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}

export default Navbar