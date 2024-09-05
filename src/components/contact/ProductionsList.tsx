import { arrowRight } from "src/assets";
import { ProductionsListProps } from "../../interfaces";
import {memo} from "react";

const ProductionsList = memo(({ productions = [] }: ProductionsListProps) => {
  return (
    <div className="mt-12 grid grid-cols-2 gap-28  max-xl:gap-10  max-sm:grid-cols-1 max-sm:gap-3">
      {productions.map((production, index) => (
        <div key={index} className="flex flex-col justify-between">
          <h2 className="font-museo font-bold text-2xl mb-4 max-[1000px]:w-1/2 max-md:text-xl">
            {production.name}
          </h2>
          <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-2">
            адрес
          </span>
          <h1>
            <a
              rel="noopener noreferrer"
              href={`${production.yandexMapURL}`}
              target="_blank"
              className="font-museo font-light text-sm leading-5 text-maingray mb-3 hover:text-orange cursor-pointer transition-all duration-300"
            >
              {production.address}
            </a>
          </h1>
          <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer arrow-container max-md:mt-5">
            <a
              rel="noopener noreferrer"
              href={`${production.yandexMapURL}`}
              target="_blank"
              className="text-orange uppercase text-sm font-medium tracking-wider"
            >
              Посмотреть на карте{" "}
            </a>
            <img src={arrowRight} className=" arrow-icon w-5" width={5} height={5} alt="arrow" />  
          </div>
        </div>
      ))}
    </div>
  );
});

export default ProductionsList;
