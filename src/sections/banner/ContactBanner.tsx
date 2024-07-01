import { useEffect, useState } from "react";
import { BgVacancy } from "../../assets";
import { fetchHeaderFooterData } from "../../api";
import { Modal } from "../modal";
import { useLocation } from "react-router-dom";

interface ContactBannerProps {
  descriptionInfo?: {
    type: string;
    children: { text: string; type: string }[];
  }[];
}
const formatPhoneNumber = (number: string) => {
  return number.replace(
    /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
    "$1 ($2) $3-$4-$5"
  );
};
const ContactBanner = ({ descriptionInfo }: ContactBannerProps) => {
  const [phone, setPhone] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isVacansiiPage = location.pathname.includes("vakansii");

  const fetchData = async () => {
    try {
      const phoneData = await fetchHeaderFooterData();
      setPhone(phoneData.Header.PhoneNumber.PhoneNumber);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {descriptionInfo && descriptionInfo.length > 0 ? (
        <div className="mt-14">
          {descriptionInfo.map((item, index) => (
            <div key={index}>
              {item.children.map((child, childIndex) => (
                <p
                  className="font-museo text-maingray font-light text-sm max-sm:text-xs"
                  key={childIndex}
                >
                  {child.text}
                </p>
              ))}
            </div>
          ))}
          <div className="relative">
            <div
              className=" mt-4 bg-cover bg-center p-28 max-sm:p-32"
              style={{ backgroundImage: `url(${BgVacancy})` }}
            >
              <div className="absolute inset-0 bg-maingray bg-opacity-50 flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-5">
                  <h2 className="text-white text-center text-base max-xl:px-10 max-sm:text-sm">
                    Свяжитесь с нами по номеру{" "}
                    <span className="underline cursor-pointer transition-all duration-300 text-lg hover:text-orange max-sm:text-base">
                      {formatPhoneNumber(phone)}{" "}
                    </span>
                    , и специалисты «Yolo Haus» помогут вам выбрать дом вашей
                    мечты. <br />
                    Или оставьте заявку, и мы свяжемся с вами в кратчайшие
                    сроки.
                  </h2>
                  <div
                    className="flex gap-[3.5px] items-center mb-4"
                    onClick={openModal}
                  >
                    <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                    <div
                      className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange text-white 
                      hover:text-maingray transform parallelogram w-[172px] h-10 border-[1px] border-orange"
                    >
                      <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram ">
                        Напишите нам
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RenderVacansiiMessage
          isVacansiiPage={isVacansiiPage}
          phone={phone}
          openModal={openModal}
        />
      )}

      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

const RenderVacansiiMessage = ({
  isVacansiiPage,
  phone,
  openModal,
}: {
  isVacansiiPage: boolean;
  phone: string;
  openModal: () => void;
}) => {
  if (isVacansiiPage) {
    return (
      <div>
        <p className="font-museo text-maingray font-light text-sm max-sm:text-xs">
          Наша компания открыта для талантливых специалистов и профессионалов,
          влюблённых в своё дело! Мы всегда рады новым бригадам и прорабам.
        </p>
        <div className="relative">
          <div
            className=" mt-4 bg-cover bg-center p-28 max-sm:p-32"
            style={{ backgroundImage: `url(${BgVacancy})` }}
          >
            <div className="absolute inset-0 bg-maingray bg-opacity-50 flex items-center justify-center">
              <div className="flex flex-col justify-center items-center gap-5">
                <h2 className="text-white text-center text-base max-xl:px-10 max-sm:text-sm">
                  Свяжитесь с нами по номеру{" "}
                  <span className="underline cursor-pointer transition-all duration-300 text-lg hover:text-orange max-sm:text-base">
                    {formatPhoneNumber(phone)}{" "}
                  </span>
                  , и специалисты «Yolo Haus» помогут вам выбрать дом вашей
                  мечты. <br />
                  Или оставьте заявку, и мы свяжемся с вами в кратчайшие сроки.
                </h2>
                <div
                  className="flex gap-[3.5px] items-center mb-4"
                  onClick={openModal}
                >
                  <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                  <div
                    className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange text-white 
                      hover:text-maingray transform parallelogram w-[172px] h-10 border-[1px] border-orange"
                  >
                    <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram ">
                      Напишите нам
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ContactBanner;
