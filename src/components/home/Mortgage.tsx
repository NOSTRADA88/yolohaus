import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { MortgageMainProps } from "../../interfaces";
import { slug } from "../../constants";

const Mortgage = ({ title, description, photos }: MortgageMainProps) => {
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16">
      <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
        {title}
      </h1>
      <div className="w-full bg-lightwhite mt-8 p-5">
        <div className="flex items-center max-md:flex-col">
          <div className=" max-md:w-full max-md:mb-5">
            <p className="font-light text-lg font-museo leading-normal text-justify">
              {description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-2 items-center max-lg:grid-cols-4 max-[550px]:grid-cols-2  mt-8 max-md:mt-2  ">
          {photos?.map((photo, index) => (
            <div key={index} className="flex justify-center ">
              <img
                src={`${API_URL}${photo.url}`}
                alt={`Банк ${photo.name}`}
                className="w-[300px] h-auto max-lg:w-[150px]"
                width={photo.width}
                height={photo.height}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-start items-center mt-8 gap-2 cursor-pointer arrow-container ">
          <Link
            to={slug.mortgage}
            className="text-orange uppercase text-sm font-medium tracking-wider"
          >
            Подробнее{" "}
          </Link>
          <p className="text-orange arrow-icon"> ➜ </p>
        </div>
      </div>
    </div>
  );
};

export default Mortgage;
