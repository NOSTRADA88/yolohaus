import { useCallback, useState } from "react";
import { Modal } from "../../sections/modal";

interface DetailsData {
  id: number;
  attributes: {
    YouTube: string | null;
    slug: string;
    Title: string;
    Description: { type: string; children: { text: string; type: string }[] }[];
    Parameters: {
      id: number;
      Area: string;
      Location: string;
      Days: number;
      HouseArea: string;
      BuiltUpArea: string;
      Floors: number;
      KitchenLivingRoomArea: string;
      Bedrooms: number;
      Toilets: number;
      TerraceAndPorchArea: string;
      Width: string;
      Height: string;
      ConstructionPeriod: string;
    };
    Complectation: {
      id: number;
      Description: {
        type: string;
        children: { text: string; type: string }[];
      }[];
      BasePrice: string;
      StandartPrice: string;
      ComfortPrice: string;
      Slug: {
        id: number;
        BuildingTechnology: string;
      };
      Metadata: {
        id: number;
        MetaTitle: string;
        MetaDescription: string;
      };
    }[];
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

interface Complectation {
  id: number;
  BasePrice: string;
  StandartPrice: string;
  ComfortPrice: string;
}
type OptionsHousesProps = {
  details: DetailsData[];
};

const OptionsHouses = ({ details }: OptionsHousesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const getMinPrice = (complectation: Complectation[]): number => {
    const prices = complectation.map((item) =>
      Math.min(
        parseInt(item.BasePrice, 10),
        parseInt(item.StandartPrice, 10),
        parseInt(item.ComfortPrice, 10)
      )
    );
    return Math.min(...prices);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };
  return (
    <div className="w-full">
      <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mb-5">
        Параметры
      </h2>
      {details.map((detail) => (
        <div key={detail.id} className="">
          {detail.attributes.Parameters.Area && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.Parameters.Area}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.BuildingTechnology && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Технология
                </p>

                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.BuildingTechnology.BuildingTechnology}
                </p>
              </div>

              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.Days && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Срок строительства
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.Parameters.Days}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.Location && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Расположение
                </p>
                <p className="font-museo font-light text-base text-maingray  w-1/2 text-end">
                  {detail.attributes.Parameters.Location}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.HouseArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь дома
                </p>
                <p className="font-museo font-light text-base text-maingray ">
                  {detail.attributes.Parameters.HouseArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.BuiltUpArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь застройки
                </p>
                <p className="font-museo font-light text-base text-maingray ">
                  {detail.attributes.Parameters.BuiltUpArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.Width &&
            detail.attributes.Parameters.Height && (
              <>
                <div className="flex justify-between items-center py-3">
                  <p className=" font-museo font-bold text-base text-maingray">
                    Габариты дома
                  </p>
                  <p className="font-museo font-light text-base text-maingray  ">
                    {detail.attributes.Parameters.Width} x{" "}
                    {detail.attributes.Parameters.Height}
                  </p>
                </div>
                <hr className="border-[#C4C4C4]" />
              </>
            )}
          {detail.attributes.Parameters.Floors && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Количество этажей
                </p>
                <p className="font-museo font-light text-base text-maingray  w-1/2 text-end">
                  {detail.attributes.Parameters.Floors}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.KitchenLivingRoomArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь кухни-гостиной
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.Parameters.KitchenLivingRoomArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.Bedrooms && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Количество спален
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.Parameters.Bedrooms}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.Toilets && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Количество санузлов
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.Parameters.Toilets}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.attributes.Parameters.TerraceAndPorchArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь террасы и крыльца
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.attributes.Parameters.TerraceAndPorchArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
        </div>
      ))}
      <div className="flex items-center  justify-between">
        {details.map((detail) => (
          <div key={detail.id} className="">
            {detail.attributes.Complectation && (
              <>
                <p className="font-museo  text-orange text-xl font-bold">
                  от {formatPrice(getMinPrice(detail.attributes.Complectation))}{" "}
                  ₽
                </p>
              </>
            )}
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
    </div>
  );
};

export default OptionsHouses;
