import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../components/header";
import { fetchHeaderFooterData } from "../../api";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../modal";
import { LogoMainBlack } from "../../assets";
import { useQueryClient } from "@tanstack/react-query";
import LazyMobileMenu  from "../../components/header/MobileMenu"

interface PhoneNumberLinkProps {
  phoneNumber: string;
}

interface HeaderData {
  description: string;
  vkContent: string;
  youtubeContent: string;
  vkIcon: string;
  youtubeIcon: string;
  phoneNumber: string;
  navLinks: {
    href: string;
    label: string;
    submenu?: { href: string; label: string }[];
  }[];
}

interface Slugs {
  about: string;
  reviews: string;
  guarantee: string;
  vacancy: string;
  projects: string;
  contact: string;
  services: string;
  privacy: string;
  built: string;
  stocks: string;
  blog: string;
  mortgage: string;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    description: "",
    vkContent: "",
    youtubeContent: "",
    vkIcon: "",
    youtubeIcon: "",
    phoneNumber: "",
    navLinks: [],
  });

  const slugs = useQueryClient().getQueryData<Slugs>(['slugs'])

  const updatedNavLinks: HeaderData['navLinks'] = [
    { href: `/${slugs?.projects ?? ''}`, label: "Проекты и цены" },
    { href: `/${slugs?.built ?? ''}`, label: "Построенные дома" },
    { href: `/${slugs?.reviews ?? ''}`, label: "Отзывы" },
    { href: `/${slugs?.stocks ?? ''}`, label: "Акции" },
    { href: `/${slugs?.mortgage ?? ''}`, label: "Ипотека" },
    {
      href: `/${slugs?.about ?? ''}`,
      label: "О компании",
      submenu: [
        { href: `/${slugs?.blog ?? ''}`, label: "Блог" },
        { href: `/${slugs?.services ?? ''}`, label: "Услуги" },
        { href: `/${slugs?.guarantee ?? ''}`, label: "Гарантия" },
        { href: `/${slugs?.vacancy ?? ''}`, label: "Вакансии" },
      ],
    },
    { href: `/${slugs?.contact ?? ''}`, label: "Контакты" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [
        headerFooterData
      ] = await Promise.all([
        fetchHeaderFooterData()
      ]);

      setHeaderData({
        description: headerFooterData.Header.Text,
        vkContent: headerFooterData.Header.Socials.data[0].attributes.URL,
        youtubeContent: headerFooterData.Header.Socials.data[1].attributes.URL,
        vkIcon:
        headerFooterData.Header.Socials.data[0].attributes.Photo.data
            .attributes.url,
        youtubeIcon:
        headerFooterData.Header.Socials.data[1].attributes.Photo.data
            .attributes.url,
        phoneNumber: headerFooterData.Header.PhoneNumber.PhoneNumber,
        navLinks: updatedNavLinks,
      });

    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatPhoneNumber = (phoneNumber: string) => {
    const countryCode = "+7";
    const areaCode = phoneNumber.slice(2, 5);
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 10);
    const thirdPart = phoneNumber.slice(10, 12);

    return (
      <a
        href={`tel:${phoneNumber}`}
        className="text-maingray cursor-pointer transition-all duration-300 font-museo text-lg font-light hover:text-orange flex items-center max-md:text-base">
        {countryCode} ({areaCode})
        <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px] text-white"></span>
        {firstPart}-{secondPart}-{thirdPart}
      </a>
    );
  };

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = React.memo(
    ({ phoneNumber }) => {
      return formatPhoneNumber(phoneNumber);
    }
  );

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
              <FontAwesomeIcon
                icon={mobileMenuOpen ? faTimes : faBars}
                size="2x"
                className="text-maingray font-light"
              />
            </button>
          </div>
          <a href="/">
            <img
              src={LogoMainBlack}
              alt="logo"
              className="h-auto max-w-full object-contain cursor-pointer"
              width="200"
              height="100"
            />
          </a>

          <p className="text-base font-museo font-light mb-4 max-md:mb-0 max-md:text-center max-md:text-sm">
            {headerData.description}
          </p>
        </div>
        <div className="flex gap-6 justify-center items-center max-md:flex-col max-md:gap-2">
          <div className="flex gap-6 items-center mb-4  max-md:gap-2">
            <div className="flex items-center">
              <a
                href={headerData.youtubeContent}
                target="_blank"
                rel="noreferrer"
                className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-gray-200 rounded-full transition-all duration-300 hover:bg-orange"
              >
                <img
                  src={`${API_URL}${headerData.youtubeIcon}`}
                  alt="youtube"
                  className="w-4 h-4 filter-svg absolute block left-1.5 top-1.5"
                />
              </a>
              <a
                href={headerData.vkContent}
                target="_blank"
                rel="noreferrer"
                className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-gray-200 rounded-full transition-all duration-300 hover:bg-orange"
              >
                <img
                  src={`${API_URL}${headerData.vkIcon}`}
                  alt="vk"
                  className="w-4 h-4 filter-svg absolute block left-1.5 top-1.5"
                />
              </a>
            </div>
            <PhoneNumberLink phoneNumber={headerData.phoneNumber} />
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
        <Navbar navLinks={headerData.navLinks} />
      </div>
        {mobileMenuOpen && (
          <LazyMobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            navLinks={headerData.navLinks}
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

export default Header;
