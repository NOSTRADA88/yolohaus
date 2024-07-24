import { useEffect } from "react";
import { BgMain } from "../../assets";
import { Modal } from "../../sections/modal";

type MainScreenProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  mainBanner: string;
  titlePart1: string;
  titlePart2: string;
};

const MainScreen = ({
  isModalOpen,
  closeModal,
  openModal,
  titlePart1,
  titlePart2,
}: MainScreenProps) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = BgMain;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [BgMain]);

  return (
    <div className="relative flex items-center justify-center">
      <img
        src={BgMain}
        alt="banner"
        className="h-[472px] w-full object-cover  bg-cover bg-center relative max-xl:h-[350px] max-md:h-[300px]"
      />
      <div className="absolute inset-0 bg-[#2B2A29] opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="text-white font-bold text-center ">
          <span className="text-4xl font-museo max-xl:text-3xl max-xl:leading-normal ">
            {titlePart1}
          </span>
          <br />
          <span className="text-3xl font-museo max-xl:text-2xl max-md:text-xl">
            {titlePart2}
          </span>
        </h1>

        <div
          className="flex gap-[3.5px]  justify-center items-center mt-24 max-xl:mt-10 max-md:mt-8"
          onClick={openModal}
        >
          <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
          <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange text-white transform parallelogram w-[187px] h-10 border-[1px] border-orange">
            <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">
              заказать проект
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default MainScreen;
