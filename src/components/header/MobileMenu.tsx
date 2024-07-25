import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../constants";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  logoCompany: string;
  navLinks: {
    href: string;
    label: string;
    submenu?: { href: string; label: string }[];
  }[];
};

const MobileMenu = ({
  isOpen,
  onClose,
  logoCompany,
  navLinks,
}: MobileMenuProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-[70%] h-full bg-white z-50 border-r-4 border-r-orange overflow-y-auto pb-10
   transition-transform duration-300 ${
     isOpen ? "transform translate-x-0" : "transform -translate-x-full"
   }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-maingray text-2xl max-[440px]:right-1 max-[350px]:right-0 max-[440px]:text-base  max-[440px]:top-5"
        aria-label="Close"
      >
        <FontAwesomeIcon
          icon={faTimes}
          size="2x"
          className="text-maingray font-light"
        />
      </button>
      <div className="flex justify-center items-center flex-col mt-5 gap-5">
        <a href="/">
          <img
            src={`${API_URL}${logoCompany}`}
            alt="logo"
            className="w-52 cursor-pointer max-[440px]:w-44  "
          />
        </a>
        <ul className="flex flex-col items-center justify-center h-full gap-4 mt-8">
          {navLinks.map((link, index) => (
            <li key={index} className="w-[192px] ">
              <div className="relative parallelogram h-10 flex items-center justify-center bg-lightwhite before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-lightwhite before:transform before:-skew-x-12">
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="relative z-10 text-maingray noparallelogram
                 hover:text-orange transition-all duration-300 font-museo font-medium text-sm uppercase tracking-wider transform "
                >
                  {link.label}
                </Link>
              </div>
              {link.submenu && (
                <ul className="mt-2 w-full">
                  {link.submenu.map((sublink, subIndex) => (
                    <li key={subIndex} className="w-full">
                      <Link
                        onClick={onClose}
                        to={sublink.href}
                        className="block text-center text-maingray hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider bg-lightwhite px-4 py-1"
                      >
                        {sublink.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
