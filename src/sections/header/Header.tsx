import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import { MobileMenu, Navbar } from "../../components/header";
import { fetchHeaderFooterData } from "../../api/footer&header";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../modal";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {addPreloadLink} from "../../components/preload/preload";

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

interface Social {
  id: number;
  attributes: {
    URL: string;
    Title: string;
    Photo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface Header {
  headerInfo: string;
  socials: Social[];
  headerPhoto: {
    name: string;
    url: string;
  };
  phoneNumber: string;
}

interface PhoneNumberLinkProps {
  phoneNumber: string | undefined;
}

const Header: React.FC = () => {
  const slugs = useQueryClient().getQueryData<Slugs>(["slugs"]);
  const [header, setHeader] = useState<Header>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { href: `/${slugs?.projects ?? ""}`, label: "Проекты и цены" },
    { href: `/${slugs?.built ?? ""}`, label: "Построенные дома" },
    { href: `/${slugs?.reviews ?? ""}`, label: "Отзывы" },
    { href: `/${slugs?.stocks ?? ""}`, label: "Акции" },
    { href: `/${slugs?.mortgage ?? ""}`, label: "Ипотека" },
    { href: `/${slugs?.about ?? ""}`, label: "О компании",
      submenu: [
        { href: `/${slugs?.blog ?? ""}`, label: "Блог" },
        { href: `/${slugs?.services ?? ""}`, label: "Услуги" },
        { href: `/${slugs?.guarantee ?? ""}`, label: "Гарантия" },
        { href: `/${slugs?.vacancy ?? ""}`, label: "Вакансии" },
      ],
    },
    { href: `/${slugs?.contact ?? ""}`, label: "Контакты" },
  ];

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const fetchHeader = await fetchHeaderFooterData();
        setHeader({
          headerInfo: fetchHeader.HeaderInfo,
          socials: fetchHeader.Socials.data.map((social: any) => ({
            id: social.id,
            attributes: social.attributes
          })),
          headerPhoto: {
            name: fetchHeader.HeaderPhoto.data.attributes.name,
            url: fetchHeader.HeaderPhoto.data.attributes.url,
          },
          phoneNumber: fetchHeader.Phone.Number
        });

        if (fetchHeader.HeaderPhoto?.data?.attributes?.url) {
          addPreloadLink(API_URL, fetchHeader.HeaderPhoto.data.attributes.url);
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchHeader();
  }, []);

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) {
      return null;
    }
    const countryCode = "+7";
    const areaCode = phoneNumber.slice(2, 5);
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 10);
    const thirdPart = phoneNumber.slice(10, 12);

    return (
        <a href={`tel:${phoneNumber}`} className="text-maingray cursor-pointer transition-all duration-300 font-museo text-lg font-light hover:text-orange flex items-center max-md:text-base">
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
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
                <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="2x" className="text-maingray font-light" />
              </button>
            </div>
            <Link to="/">
              <img src={`${API_URL}${header?.headerPhoto.url}`} alt="header logo" className="h-auto max-w-full object-contain cursor-pointer" width="200" height="100" fetchPriority={"high"}/>
            </Link>
            <p className="text-base font-museo font-light mb-4 max-md:mb-0 max-md:text-center max-md:text-sm">
              {header?.headerInfo}
            </p>
          </div>
          <div className="flex gap-6 justify-center items-center max-md:flex-col max-md:gap-2">
            <div className="flex gap-6 items-center mb-4  max-md:gap-2">
              <div className="flex items-center">
                {header?.socials?.map((social) => (
                    <a key={social.id} href={social.attributes.URL} target="_blank" rel="noreferrer" className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-gray-200 rounded-full transition-all duration-300 hover:bg-orange">
                      <img src={`${API_URL}${social.attributes.Photo.data.attributes.url}`} alt={social.attributes.Title} className="w-4 h-4 filter-svg absolute block left-1.5 top-1.5"/>
                    </a>
                ))}
              </div>
              <PhoneNumberLink phoneNumber={header?.phoneNumber} />
            </div>
            <div className="flex gap-[3.5px] items-center mb-4" onClick={openModal}>
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
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navLinks={navLinks} />
        )}
        <div className={`fixed z-20 inset-0 bg-lightwhite bg-opacity-50 transition-opacity duration-300 ${
                mobileMenuOpen
                    ? "opacity-100 backdrop-blur-sm"
                    : "opacity-0 pointer-events-none"
        }`} onClick={() => setMobileMenuOpen(false)}
        ></div>
        {isModalOpen && <Modal closeModal={closeModal} />}
      </div>
  );
};

export default Header;
