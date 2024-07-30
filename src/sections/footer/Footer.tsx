import { useEffect, useState } from "react";
import {
  fetchAboutData,
  fetchHeaderFooterData,
  fetchProjectsData,
  fetchPrivacyPolicyData,
  fetchBuiltHousesData,
  fetchContactData,
  fetchReviewsData,
  fetchStocksData,
} from "../../api";
import {LogoMainWhite} from "../../assets";
import { Consultation } from "../../components/footer";
import { API_URL } from "../../constants";
import React from "react";
import { Modal } from "../modal";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

interface FooterData {
  // logoCompany: string;
  description: string;
  vkContent: string;
  youtubeContent: string;
  vkIcon: string;
  youtubeIcon: string;
  phoneNumber: string;
  slugPrivacy: string;
  navLinks: {
    href: string;
    label: string;
    submenu?: { href: string; label: string }[];
  }[];
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [
        mainData,
        aboutData,
        projectsData,
        reviewsData,
        privacyData,
        builtData,
        contactData,
        stocksData,
      ] = await Promise.all([
        fetchHeaderFooterData(),
        fetchAboutData(),
        fetchProjectsData(),
        fetchReviewsData(),
        fetchPrivacyPolicyData(),
        fetchBuiltHousesData(),
        fetchContactData(),
        fetchStocksData(),
      ]);

      const updatedNavLinks = [
        { href: `/${projectsData.slug}`, label: "Проекты и цены" },
        { href: `/${builtData.slug}`, label: "Построенные дома" },
        { href: `/${reviewsData.slug}`, label: "Отзывы" },
        { href: `/${stocksData.slug}`, label: "Акции" },
        { href: "/", label: "Ипотека" },
        { href: `/${aboutData.slug}`, label: "О компании" },
        { href: `/${contactData.slug}`, label: "Контакты" },
      ];

      setFooterData({
        // logoCompany: mainData.Footer.CompanyLogo.data.attributes.url,
        description: mainData.Footer.Text,
        vkContent: mainData.Footer.Socials.data[0].attributes.URL,
        youtubeContent: mainData.Footer.Socials.data[1].attributes.URL,
        vkIcon: mainData.Footer.Socials.data[0].attributes.Photo.data.attributes.url,
        youtubeIcon: mainData.Footer.Socials.data[1].attributes.Photo.data.attributes.url,
        phoneNumber: mainData.Footer.PhoneNumber.PhoneNumber,
        slugPrivacy: privacyData.slug,
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
            className="text-white cursor-pointer transition-all duration-300 font-museo text-lg font-light hover:text-orange flex items-center max-md:text-base"
        >
          {countryCode} ({areaCode})
          <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px] text-white"></span>
          {firstPart}-{secondPart}-{thirdPart}
        </a>
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const PhoneNumberLink: React.FC<{ phoneNumber: string }> = ({ phoneNumber}) => {
    return formatPhoneNumber(phoneNumber);
  };

  if (!footerData) {
    return <div>Loading...</div>; // Загрузка данных
  }

  return (
      <div>
        <div className="bg-orange">
          <LazyLoad height={300} offset={100} once>
            <Consultation slugPrivacy={footerData.slugPrivacy} />
          </LazyLoad>
        </div>
        <div className="bg-maingray p-8">
          <div className="w-full max-w-[1111px] mx-auto max-[1111px]:px-12 max-md:px-5">
            <div className="flex gap-4 items-center mb-10 justify-between max-xl:flex-col max-xl:mb-2 max-xl:gap-2">
              <a href="/">
                <img
                    /* TODO src={`${API_URL}${footerData.logoCompany}`}
                    *   Если будет прирост по speed сделать убрать из страпи логосы */
                    src={LogoMainWhite}
                    alt="logo"
                    width="208"
                    height="80"
                    className="h-auto max-w-full object-contain w-52 cursor-pointer"
                />
              </a>
              <ul className="flex gap-4 items-center justify-center h-20 max-lg:gap-2 max-xl:h-16 max-[850px]:hidden">
                {footerData.navLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      <li className="relative">
                        <Link
                            to={link.href}
                            className="text-white hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider"
                        >
                          {link.label}
                        </Link>
                      </li>
                      <div className="parallelogram h-4 border-l-[1px] border-[#E5E5E5]"></div>
                    </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="flex gap-6 items-center justify-between max-[1050px]:flex-col">
              <div className="flex gap-20 max-xl:flex-col max-xl:gap-2 max-[1050px]:flex-row max-md:flex-col max-[1050px]:text-center">
                <p className="font-museo text-xs font-light text-white">
                  {footerData.description}
                </p>
                <Link
                    to={`/${footerData.slugPrivacy}`}
                    className="font-museo text-xs font-light text-white hover:text-orange"
                >
                  Политика конфиденциальности
                </Link>
              </div>
              <div className="flex items-center gap-10 max-[1050px]:flex-col max-[1050px]:gap-5">
                <div className="flex">
                  <a
                      href={footerData.youtubeContent}
                      className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-lightgray rounded-full transition-all duration-300 hover:bg-orange"
                  >
                    <img
                        src={`${API_URL}${footerData.youtubeIcon}`}
                        alt="youtube"
                        width="16"
                        height="16"
                        className="w-4 h-4 filter-footer-svg absolute block left-1.5 top-1.5"
                    />
                  </a>
                  <a
                      href={footerData.vkContent}
                      className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-lightgray rounded-full transition-all duration-300 hover:bg-orange"
                  >
                    <img
                        src={`${API_URL}${footerData.vkIcon}`}
                        alt="vk"
                        width="16"
                        height="16"
                        className="w-4 h-4 filter-footer-svg absolute block left-1.5 top-1.5"
                    />
                  </a>
                </div>
                <PhoneNumberLink phoneNumber={footerData.phoneNumber} />
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

export default Footer;
