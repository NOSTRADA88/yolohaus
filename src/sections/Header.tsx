
import { useEffect, useState } from "react";
import { Navbar } from "../components/header"
import { fetchHeaderFooterData } from "../api";
import { API_URL } from "../constants";

const Header = () => {

  const [logoCompany, setLogoCompany] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [vkContent, setVkContent] = useState<string>('');
  const [youtubeContent, setYoutubeContent] = useState<string>('');
  const [vkIcon, setVkIcon] = useState<string>('');
  const [youtubeIcon, setYoutubeIcon] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const fetchData = async () => {
    try {
      const mainData = await fetchHeaderFooterData();
      setLogoCompany(mainData.Header.CompanyLogo.data.attributes.url);
      setDescription(mainData.Header.Text);
      setVkContent(mainData.Header.socials.data[0].attributes.URL);
      setYoutubeContent(mainData.Header.socials.data[1].attributes.URL);
      setVkIcon(mainData.Header.socials.data[0].attributes.Photo.data.attributes.url);
      setYoutubeIcon(mainData.Header.socials.data[1].attributes.Photo.data.attributes.url);
      setPhoneNumber(mainData.Header.PhoneNumber.PhoneNumber);

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
      <a href={`tel:${phoneNumber}`} className="text-maingray cursor-pointer transition-all duration-300 font-museo text-lg font-light hover:text-orange flex items-center">
        {countryCode} ({areaCode})
        <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px] text-white"></span>
        {firstPart}-{secondPart}-{thirdPart}
      </a>
    );
  }

  interface PhoneNumberLinkProps {
    phoneNumber: string;
  }

  const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = ({ phoneNumber }) => {
    return formatPhoneNumber(phoneNumber);
  };


  return (
    <div className="w-full max-w-[1111px] mx-auto">
      <div className="flex justify-between items-center mt-10 w-full max-w-[1111px] mx-auto">
        <div className="flex  gap-4 items-center ">
          <a href="/">
            <img src={`${API_URL}${logoCompany}`} alt="logo" className="w-52 cursor-pointer" />
          </a>
          <p className="text-base font-museo font-light mb-4">{description}</p>
        </div>
        <div className="flex gap-6 items-center mb-4">
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
        <div className="flex gap-[3.5px] items-center mb-4">
          <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
          <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange hover:text-white transform parallelogram w-[172px] h-10 border-[1px] border-orange">
            <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">Напишите нам</p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Header