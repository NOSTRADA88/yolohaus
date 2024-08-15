import { Modal } from "../../sections/modal";
import { OptionsHousesProps } from "../../interfaces";
import { formatPrice, getMinPrice } from "../../constants";
import { useModal } from "../../hooks/useModal";

const OptionsHouses = ({ details }: OptionsHousesProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const scrollToMore = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const element = document.getElementById("more");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mb-5">
        Параметры
      </h2>
      {details.map((detail) => (
        <div>
          {/* {detail.BuildingTechnology && (
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
          )} */}

          {/* {detail.attributes.Parameters.Location && (
            <>
              <div className="flex justify-between items-center py-3 ">
                <p className=" font-museo font-bold text-base text-maingray">
                  Расположение
                </p>
                <p className="font-museo font-light text-base text-maingray  w-[60%] text-end max-sm:w-1/2">
                  {detail.attributes.Parameters.Location}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )} */}
          {detail.parameters.houseArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь дома
                </p>
                <p className="font-museo font-light text-base text-maingray ">
                  {detail.parameters.houseArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.builtUpArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь застройки
                </p>
                <p className="font-museo font-light text-base text-maingray ">
                  {detail.parameters.builtUpArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.width && detail.parameters.height && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Габариты дома
                </p>
                <p className="font-museo font-light text-base text-maingray  ">
                  {detail.parameters.width} x {detail.parameters.height}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.floors && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Количество этажей
                </p>
                <p className="font-museo font-light text-base text-maingray  w-1/2 text-end">
                  {detail.parameters.floors}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.kitchenLivingRoomArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь кухни-гостиной
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.parameters.kitchenLivingRoomArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.bedrooms && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Количество спален
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.parameters.bedrooms}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.toilets && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Количество санузлов
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.parameters.toilets}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
          {detail.parameters.terraceAndPorchArea && (
            <>
              <div className="flex justify-between items-center py-3">
                <p className=" font-museo font-bold text-base text-maingray">
                  Площадь террасы и крыльца
                </p>
                <p className="font-museo font-light text-base text-maingray">
                  {detail.parameters.terraceAndPorchArea}
                </p>
              </div>
              <hr className="border-[#C4C4C4]" />
            </>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between max-[400px]:flex-col  max-[400px]:items-start max-[400px]:mt-8 ">
        {details.map((detail) => (
          <div>
            {detail.kits && (
              <>
                <p className="font-museo  text-orange text-xl font-bold">
                  от {formatPrice(getMinPrice(detail.kits))} ₽
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
      </div>
      <div>
        {details[0]?.shortDescription && (
          <>
            <div className="py-3">
              {details[0].shortDescription?.map((desc, index) => (
                <p
                  key={index}
                  className="font-museo font-light text-base text-maingray"
                >
                  {desc.children.map((child) => child.text).join("")}
                </p>
              ))}
              <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer  arrow-container">
                <a
                  href="#more"
                  onClick={scrollToMore}
                  className="text-orange uppercase text-sm font-medium tracking-wider"
                >
                  Подробнее
                </a>
                <p className="text-orange arrow-icon"> ➜ </p>
              </div>
            </div>
          </>
        )}
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default OptionsHouses;
