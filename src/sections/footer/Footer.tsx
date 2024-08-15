import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { Modal } from "../modal";
import { navLinks, slug } from "../../constants";
import { FormatPhoneNumber } from "../phone";
import { LogoMainWhite } from "../../assets";
import { HeaderProps } from "../../interfaces";
import { useModal } from "../../hooks/useModal";

const Footer = ({ footer }: HeaderProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <div className="bg-maingray p-8">
        <div className="w-full max-w-[1111px] mx-auto max-[1111px]:px-12 max-md:px-5">
          <div className="flex gap-4 items-center mb-10 justify-between max-xl:flex-col max-xl:mb-2 max-xl:gap-2">
            <a href="/">
              <img
                src={LogoMainWhite}
                alt="logo"
                className="h-auto max-w-full object-contain w-52 cursor-pointer"
                loading="lazy"
              />
            </a>
            <ul className="flex gap-4 items-center justify-center h-20 max-lg:gap-2 max-xl:h-16 max-[850px]:hidden">
              {navLinks.map((link, index) => (
                <li key={index} className="relative flex items-center">
                  <Link
                    to={link.href}
                    className="text-white hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                  <div className="parallelogram h-4 border-l-[1px] border-[#E5E5E5] ml-4"></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-6 items-center justify-between max-[1050px]:flex-col">
            <div className="flex gap-20 max-xl:flex-col max-xl:gap-2 max-[1050px]:flex-row max-md:flex-col max-[1050px]:text-center">
              <p className="font-museo text-xs font-light text-white">
                {footer?.info}
              </p>
              <Link
                to={slug.privacy}
                className="font-museo text-xs font-light text-white hover:text-orange"
              >
                Политика конфиденциальности
              </Link>
            </div>
            <div className="flex items-center gap-10 max-[1050px]:flex-col max-[1050px]:gap-5">
              <div className="flex">
                {footer?.socials?.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-lightgray rounded-full transition-all duration-300 hover:bg-orange"
                  >
                    <img
                      src={`${API_URL}${social.photo.url}`}
                      alt={social.photo.name}
                      className="w-4 h-4 filter-footer-svg absolute block left-1.5 top-1.5"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
              <FormatPhoneNumber
                phoneNumber={footer?.phoneNumber}
                color="white"
              />
              <div
                className="flex gap-[3.5px] items-center"
                onClick={openModal}
              >
                <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange hover:text-white transform parallelogram w-[172px] h-10 border-[1px] border-orange">
                  <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram text-white">
                    Напишите нам
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default React.memo(Footer);
