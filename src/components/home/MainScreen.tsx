import { BgMain } from "../../assets";
import { Modal } from "../../sections/modal";
import { MainScreenProps } from "../../interfaces";
import { useModal } from "../../hooks/useModal";

const MainScreen = ({ rawOne, rawTwo }: MainScreenProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div className="relative flex items-center justify-center">
      <img
        src={BgMain}
        alt="banner"
        width="1200"
        height="472"
        className="h-[472px] object-cover relative max-xl:h-[350px] max-md:h-[300px]"
      />
      <div className="absolute inset-0 bg-[#2B2A29] opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="text-white font-bold text-center ">
          <span className="text-4xl font-museo max-xl:text-3xl max-xl:leading-normal ">
            {rawOne}
          </span>
          <br />
          <span className="text-3xl font-museo max-xl:text-2xl max-md:text-xl">
            {rawTwo}
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
