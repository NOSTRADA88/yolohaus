import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHeaderFooterData } from "../../api/footer&header";
import { API_URL } from "../../constants";
import { Modal } from "../modal";
import { useQueryClient } from "@tanstack/react-query";
import { FooterHeader, Slugs } from "../../interfaces";

const Footer = () => {const slugs = useQueryClient().getQueryData<Slugs>(["slugs"]);
  const navLinks= [
    { href: `/${slugs?.projects ?? ""}`, label: "Проекты и цены" },
    { href: `/${slugs?.built ?? ""}`, label: "Построенные дома" },
    { href: `/${slugs?.reviews ?? ""}`, label: "Отзывы" },
    { href: `/${slugs?.stocks ?? ""}`, label: "Акции" },
    { href: `/${slugs?.mortgage ?? ""}`, label: "Ипотека" },
    { href: `/${slugs?.about ?? ""}`, label: "О компании" },
    { href: `/${slugs?.contact ?? ""}`, label: "Контакты" },
  ];
  const [footer, setFooter] = useState<FooterHeader>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const fetchHeader = await fetchHeaderFooterData();
        setFooter({
          info: fetchHeader.HeaderInfo,
          socials: fetchHeader.Socials.data.map((social: any) => ({
            id: social.id,
            attributes: social.attributes
          })),
          photo: {
            name: fetchHeader.FooterPhoto.data.attributes.name,
            url: fetchHeader.FooterPhoto.data.attributes.url,
            width: fetchHeader.FooterPhoto.data.attributes.width,
            height: fetchHeader.FooterPhoto.data.attributes.height
          },
          phoneNumber: fetchHeader.Phone.Number
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeader();
  }, []);;

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) {
      return null
    }
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

  return (
    <div>
      <div className="bg-maingray p-8">
        <div className="w-full max-w-[1111px] mx-auto max-[1111px]:px-12 max-md:px-5">
          <div className="flex gap-4 items-center mb-10 justify-between max-xl:flex-col max-xl:mb-2 max-xl:gap-2">
            <a href="/">
              <img src={`${API_URL}${footer?.photo.url}`} alt="logo" width={footer?.photo.width} height={footer?.photo.height} className="h-auto max-w-full object-contain w-52 cursor-pointer" />
            </a>
            <ul className="flex gap-4 items-center justify-center h-20 max-lg:gap-2 max-xl:h-16 max-[850px]:hidden">
              {navLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <li className="relative">
                    <Link to={link.href} className="text-white hover:text-orange transition-all duration-300 font-museo font-medium text-xs uppercase tracking-wider">
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
                {footer?.info}
              </p>
              <Link to={`/${slugs?.privacy}`} className="font-museo text-xs font-light text-white hover:text-orange">
                Политика конфиденциальности
              </Link>
            </div>
            <div className="flex items-center gap-10 max-[1050px]:flex-col max-[1050px]:gap-5">
              <div className="flex">
                {footer?.socials?.map((social) => (
                    <a key={social.id} href={social.attributes.URL} target="_blank" rel="noreferrer" className="relative inline-block w-7 h-7 align-middle mx-1.5 bg-lightgray rounded-full transition-all duration-300 hover:bg-orange">
                      <img src={`${API_URL}${social.attributes.Photo.data.attributes.url}`} alt={social.attributes.Title} className="w-4 h-4 filter-footer-svg absolute block left-1.5 top-1.5" />
                    </a>
                ))}
              </div>
              {formatPhoneNumber(footer?.phoneNumber)}
              <div
                className="flex gap-[3.5px] items-center"
                onClick={() => setIsModalOpen(true)}
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
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Footer;
