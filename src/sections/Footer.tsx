import { useEffect, useState } from "react";
import { fetchAboutData, fetchHeaderFooterData } from "../api";
import { Consultation } from "../components/footer"
import { API_URL } from "../constants";
import React from "react";
import { Modal } from "./modal";

const Footer = () => {
  const [logoCompany, setLogoCompany] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [vkContent, setVkContent] = useState<string>('');
  const [youtubeContent, setYoutubeContent] = useState<string>('');
  const [vkIcon, setVkIcon] = useState<string>('');
  const [youtubeIcon, setYoutubeIcon] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<{ href: string; label: string; submenu?: { href: string; label: string }[] }[]>([]);

  const fetchData = async () => {
    try {
      const mainData = await fetchHeaderFooterData();
      setLogoCompany(mainData.Footer.CompanyLogo.data.attributes.url);
      setDescription(mainData.Footer.Text);
      setVkContent(mainData.Footer.socials.data[0].attributes.URL);
      setYoutubeContent(mainData.Footer.socials.data[1].attributes.URL);
      setVkIcon(mainData.Footer.socials.data[0].attributes.Photo.data.attributes.url);
      setYoutubeIcon(mainData.Footer.socials.data[1].attributes.Photo.data.attributes.url);
      setPhoneNumber(mainData.Footer.PhoneNumber.PhoneNumber);


      const aboutData = await fetchAboutData();
      // const housesData = await fetchHousesData();

      const updatedNavLinks = [
          { href: "/", label: "Главная" },
          { href: "/", label: "Проекты и цены" },
          {
              href: `/${aboutData.slug}`,
              label: "О компании",
          },
          { href: "/", label: "Построенные дома" },
          { href: "/", label: "Услуги" },
          { href: "/", label: "Контакты" },
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
      <a href={`tel:${phoneNumber}`} className="text-white cursor-pointer transition-all duration-300 font-museo text-lg font-light
       hover:text-orange flex items-center max-md:text-base">
        {countryCode} ({areaCode})
        <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px] text-white"></span>
        {firstPart}-{secondPart}-{thirdPart}
      </a>
    );
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  interface PhoneNumberLinkProps {
    phoneNumber: string;
  }

  const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = ({ phoneNumber }) => {
    return formatPhoneNumber(phoneNumber);
  };

  const filteredNavLinks = navLinks.filter(
    link => link.label !== "Акции" && link.label !== "Ипотека"
  );

  return (
    <div>
      <div className="bg-orange">
        <Consultation />
      </div>
      <div className="bg-maingray p-8 ">
        <div className="w-full max-w-[1111px] mx-auto max-[1111px]:px-12 max-md:px-5 ">
          <div className="flex gap-4 items-center mb-10 justify-between max-xl:flex-col 
          max-xl:mb-2 max-xl:gap-2">
            <a href="/">
              <img src={`${API_URL}${logoCompany}`} alt="logo" className="w-52 cursor-pointer" />
            </a>
            <ul className="flex gap-6 items-center justify-center h-20 max-xl:gap-2 max-xl:h-16 max-[790px]:hidden">
              {filteredNavLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <li className="relative">
                    <a
                      href={link.href}
                      className="text-white hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider"
                    >
                      {link.label}
                    </a>
                  </li>
                  <div className="parallelogram h-4 border-l-[1px] border-[#E5E5E5]"></div>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="flex gap-6 items-center justify-between max-[1050px]:flex-col">
            <div className="flex gap-20 max-xl:flex-col max-xl:gap-2 max-[1050px]:flex-row max-md:flex-col max-[1050px]:text-center">
              <p className="font-museo text-xs font-light text-white">{description}</p>
              <a href="/" className="font-museo text-xs font-light text-white hover:text-orange">Политика конфиденциальности</a>
            </div>
            <div className="flex items-center gap-10 max-[1050px]:flex-col max-[1050px]:gap-5">
              <div className="flex ">
                <a href={youtubeContent} className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-lightgray rounded-full transition-all duration-300 hover:bg-orange">
                  <img src={`${API_URL}${youtubeIcon}`} alt="youtube" className="w-4 h-4 filter-footer-svg absolute block left-1.5 top-1.5" />
                </a>
                <a href={vkContent} className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-lightgray rounded-full transition-all duration-300 hover:bg-orange">
                  <img src={`${API_URL}${vkIcon}`} alt="vk" className="w-4 h-4 filter-footer-svg absolute block left-1.5 top-1.5" />
                </a>
              </div>
              <PhoneNumberLink phoneNumber={phoneNumber} />
              <div className="flex gap-[3.5px] items-center" onClick={openModal}>
                <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange hover:text-white transform parallelogram w-[172px] h-10 border-[1px] border-orange">
                  <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram text-white">Напишите нам</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal} />
      )}
    </div>
  )
}

export default Footer