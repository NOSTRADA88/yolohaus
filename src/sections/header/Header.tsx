import React, { useCallback, useEffect, useState } from "react";
import { MobileMenu, Navbar } from "../../components/header";
import { API_URL } from "../../constants";
import { Modal } from "../modal";
import { Link } from "react-router-dom";
import { HeaderProps } from "../../interfaces";
import { navLinks } from "../../constants";
import { FormatPhoneNumber } from "../phone";
import { LogoMainBlack } from "../../assets";

const Header = ({ header }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <div className="w-full max-w-[1111px] mx-auto">
      <div className="flex justify-between items-center mt-10 max-xl:flex-col">
        <div className="flex gap-4 items-center max-xl:mb-4 max-md:flex-col ">
          <div className="hidden max-[800px]:block absolute left-4 top-12 ">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <p className="text-maingray font-bold text-3xl"> ☰ </p>
            </button>
          </div>
          <Link to="/">
            <img
              src={LogoMainBlack}
              alt="header logo"
              className="h-auto max-w-full object-contain cursor-pointer w-52"
            />
          </Link>
          <p className="text-base font-museo font-light mb-4 max-md:mb-0 max-md:text-center max-md:text-sm">
            {header?.info}
          </p>
        </div>
        <div className="flex gap-6 justify-center items-center max-md:flex-col max-md:gap-2">
          <div className="flex gap-6 items-center mb-4  max-md:gap-2">
            <div className="flex items-center">
              {header?.socials?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-gray-200 rounded-full transition-all duration-300 hover:bg-orange"
                >
                  <img
                    src={`${API_URL}${social.photo.url}`}
                    alt={social.photo.name}
                    className="w-4 h-4 filter-svg absolute block left-1.5 top-1.5"
                  />
                </a>
              ))}
            </div>
            <FormatPhoneNumber
              phoneNumber={header?.phoneNumber}
              color="maingray"
            />
          </div>
          <div
            className="flex gap-[3.5px] items-center mb-4"
            onClick={openModal}
          >
            <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
            <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange hover:text-white transform parallelogram w-[172px] h-10 border-[1px] border-orange">
              <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram ">
                Напишите нам
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-[800px]:hidden">
        <Navbar navLinks={navLinks} />
      </div>
      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed z-20 inset-0 bg-lightwhite bg-opacity-50 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default React.memo(Header);
