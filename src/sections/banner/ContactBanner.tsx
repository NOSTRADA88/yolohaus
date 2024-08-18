import React from "react";
import { BgVacancy } from "../../assets";
import { Modal } from "../modal";
import { useLocation } from "react-router-dom";
import { formatPhoneNumber } from "../../constants";
import { ContactBannerProps } from "../../interfaces";
import useHeaderFooter from "../../hooks/useHeaderFooter";
import { useModal } from "../../hooks/useModal";

const ContactBanner = ({ descriptionInfo }: ContactBannerProps) => {
  // TODO это чё ваще за фатафак с мобилкой <_>
  const { informationData, isLoading, error } = useHeaderFooter();
  const { isModalOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const isVacansiiPage = location.pathname.includes("vacancies");

  if (!informationData || isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div>
      {descriptionInfo && descriptionInfo.length > 0 ? (
        <div className="mt-14 max-sm:mt-8">
          {descriptionInfo.map((item, index) => (
            <div key={index}>
              {item.children.map((child, childIndex) => (
                <p
                  key={childIndex}
                  className="font-museo text-maingray font-light text-sm max-sm:text-xs text-justify"
                >
                  {child.text}
                </p>
              ))}
            </div>
          ))}

          <div className="relative">
            <img
              src={BgVacancy}
              alt="banner"
              width={100}
              height={100}
              className="mt-4 h-52 object-cover bg-cover bg-center max-[450px]:h-64"
            />
            <div className="absolute inset-0 bg-maingray bg-opacity-50 flex items-center justify-center">
              <div className="flex flex-col justify-center items-center gap-5">
                <h2 className="text-white text-center text-base max-xl:px-10 max-sm:text-sm">
                  Свяжитесь с нами по номеру
                  <span className="underline cursor-pointer transition-all duration-300 text-lg hover:text-orange max-sm:text-base">
                    {formatPhoneNumber(informationData.phoneNumber)}
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
                  <div className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange text-white hover:text-maingray transform parallelogram w-[172px] h-10 border-[1px] border-orange">
                    <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">
                      Напишите нам
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RenderVacansiiMessage
          isVacansiiPage={isVacansiiPage}
          phone={informationData.phoneNumber}
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

export default React.memo(ContactBanner);
