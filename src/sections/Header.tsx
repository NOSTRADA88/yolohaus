import { useCallback, useEffect, useState } from "react";
import { MobileMenu, Navbar } from "../components/header"
import { fetchAboutData, fetchBuiltHousesData, fetchContactData, fetchGuaranteeData, fetchHeaderFooterData, fetchPrivacyPolicyData, fetchProjectsData, fetchReviewsData, fetchServicesData, fetchVacancyData } from "../api";
import { API_URL } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "./modal";

interface PhoneNumberLinkProps {
  phoneNumber: string;
}

const Header = () => {

  const [logoCompany, setLogoCompany] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [vkContent, setVkContent] = useState<string>('');
  const [youtubeContent, setYoutubeContent] = useState<string>('');
  const [vkIcon, setVkIcon] = useState<string>('');
  const [youtubeIcon, setYoutubeIcon] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<{ href: string; label: string; submenu?: { href: string; label: string }[] }[]>([]);

  const fetchData = async () => {
    try {
      const [headerFooterData, aboutData, reviewsData, guaranteeData, vacancyData, projectsData, contactData, servicesData, builtData] = await Promise.all([
        fetchHeaderFooterData(),
        fetchAboutData(),
        fetchReviewsData(),
        fetchGuaranteeData(),
        fetchVacancyData(),
        fetchProjectsData(),
        fetchContactData(),
        fetchServicesData(),
        fetchBuiltHousesData(),

      ]);

      setLogoCompany(headerFooterData.Header.CompanyLogo.data.attributes.url);
      setDescription(headerFooterData.Header.Text);
      setVkContent(headerFooterData.Header.socials.data[0].attributes.URL);
      setYoutubeContent(headerFooterData.Header.socials.data[1].attributes.URL);
      setVkIcon(headerFooterData.Header.socials.data[0].attributes.Photo.data.attributes.url);
      setYoutubeIcon(headerFooterData.Header.socials.data[1].attributes.Photo.data.attributes.url);
      setPhoneNumber(headerFooterData.Header.PhoneNumber.PhoneNumber);

      const updatedNavLinks = [
        { href: "/", label: "Главная" },
        { href: `/${projectsData.slug}`, label: "Проекты и цены" },
        {
          href: `/${aboutData.slug}`,
          label: "О компании",
          submenu: [
            { href: "/", label: "Блог" },
            { href: `/${guaranteeData.slug}`, label: "Гарантия" },
            { href: `/${vacancyData.slug}`, label: "Вакансии" },
          ]
        },
        { href: `/${builtData.slug}`, label: "Построенные дома" },
        { href: `/${servicesData.slug}`, label: "Услуги" },
        { href: "/", label: "Акции" },
        { href: "/", label: "Ипотека" },
        { href: `/${reviewsData.slug}`, label: "Отзывы" },
        { href: `/${contactData.slug}`, label: "Контакты" },
      ];

      setNavLinks(updatedNavLinks);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  function formatPhoneNumber(phoneNumber: string) {
    const countryCode = "+7";
    const areaCode = phoneNumber.slice(2, 5);
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 10);
    const thirdPart = phoneNumber.slice(10, 12);

    return (
      <a href={`tel:${phoneNumber}`} className="text-maingray cursor-pointer transition-all duration-300 font-museo
       text-lg font-light hover:text-orange flex items-center max-md:text-base">
        {countryCode} ({areaCode})
        <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px] text-white"></span>
        {firstPart}-{secondPart}-{thirdPart}
      </a>
    );
  }

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);


  const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = ({ phoneNumber }) => {
    return formatPhoneNumber(phoneNumber);
  };


  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <div className="w-full max-w-[1111px] mx-auto">
      <div className="flex justify-between items-center mt-10 max-xl:flex-col">
        <div className="flex gap-4 items-center max-xl:mb-4 max-md:flex-col ">
          <div className="hidden max-[800px]:block absolute left-4 top-12 ">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="2x" className="text-maingray font-light" />
            </button>
          </div>
          <a href="/">
            <img src={`${API_URL}${logoCompany}`} alt="logo" className="w-52 cursor-pointer" />
          </a>
          <p className="text-base font-museo font-light mb-4 max-md:mb-0 max-md:text-center max-md:text-sm">{description}</p>
        </div>
        <div className="flex gap-6 justify-center items-center max-md:flex-col max-md:gap-2">
          <div className="flex gap-6 items-center mb-4  max-md:gap-2">
            <div className="flex items-center">
              <a href={youtubeContent} className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-gray-200 rounded-full transition-all duration-300 hover:bg-orange">
                <img src={`${API_URL}${youtubeIcon}`} alt="youtube" className="w-4 h-4 filter-svg absolute block left-1.5 top-1.5" />
              </a>
              <a href={vkContent} className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-gray-200 rounded-full transition-all duration-300 hover:bg-orange">
                <img src={`${API_URL}${vkIcon}`} alt="vk" className="w-4 h-4 filter-svg absolute block left-1.5 top-1.5" />
              </a>
            </div>
            <PhoneNumberLink phoneNumber={phoneNumber} />
          </div>
          <div className="flex gap-[3.5px] items-center mb-4" onClick={openModal}>
            <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
            <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange hover:text-white transform parallelogram w-[172px] h-10 border-[1px] border-orange">
              <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram ">Напишите нам</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-[800px]:hidden">
        <Navbar navLinks={navLinks} />
      </div>
      <MobileMenu isOpen={mobileMenuOpen} logoCompany={logoCompany} onClose={() => setMobileMenuOpen(false)} navLinks={navLinks} />
      <div className={`fixed z-20 inset-0 bg-lightwhite bg-opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}></div>
      {isModalOpen && (
        <Modal closeModal={closeModal} />
      )}
    </div>
  )
}

export default Header