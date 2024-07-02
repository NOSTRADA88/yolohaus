import { useCallback, useState } from "react";
import { Modal } from "../../sections/modal";

interface HousesData {
  id: number;
  attributes: {
    YouTube: string | null;
    slug: string;
    Title: string;
    Discription: { type: string; children: { text: string; type: string }[] }[];
    Parameters: {
      id: number;
      Area: string;
      Location: string;
      Days: number;
    };
    BuildingTechnology: {
      id: number;
      BuildingTechnology: string;
    };
    Photos: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      }[];
    };
  };
}

type OptionsHousesProps = {
  houses: HousesData[];
};
const OptionsHouses = ({ houses }: OptionsHousesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div>
      <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mb-5">
        Параметры
      </h2>
      {houses.map((house) => (
        <div key={house.id} className="">
          <div className="flex justify-between items-center py-3">
            <p className=" font-museo font-bold text-base text-maingray">
              Площадь
            </p>
            <p className="font-museo font-light text-base text-maingray">
              {house.attributes.Parameters.Area}
            </p>
          </div>
          <hr className="border-[#C4C4C4]" />
          <div className="flex justify-between items-center py-3">
            <p className=" font-museo font-bold text-base text-maingray">
              Технология
            </p>
            <p className="font-museo font-light text-base text-maingray">
              {house.attributes.BuildingTechnology.BuildingTechnology}
            </p>
          </div>
          <hr className="border-[#C4C4C4]" />
          <div className="flex justify-between items-center py-3">
            <p className=" font-museo font-bold text-base text-maingray">
              Срок строительства
            </p>
            <p className="font-museo font-light text-base text-maingray">
              {house.attributes.Parameters.Days}
            </p>
          </div>
          <hr className="border-[#C4C4C4]" />
          <div className="flex justify-between items-start py-3">
            <p className=" font-museo font-bold text-base text-maingray">
              Расположение
            </p>
            <p className="font-museo font-light text-base text-maingray w-1/2 text-end">
              {house.attributes.Parameters.Location}
            </p>
          </div>
        </div>
      ))}
      <div
        className="flex gap-[3.5px] items-center mb-4 mt-5"
        onClick={openModal}
      >
        <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
        <div
          className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange text-white 
              hover:text-maingray transform parallelogram w-[172px] h-10 border-[1px] border-orange"
        >
          <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram ">
            Заказать
          </p>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default OptionsHouses;
