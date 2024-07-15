import { faHouseCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
      <div className="flex justify-between max-sm:flex-col max-sm:gap-4 ">
        <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">
          Страница не построена
        </h1>
        <div className="flex items-center">
          <Link
            to="/"
            className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
          >
            Главная /{" "}
          </Link>
          <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
            {" "}
            404
          </p>
        </div>
      </div>
      <div className="mt-10 flex justify-center flex-col items-center gap-10">
        <p className="font-light text-xl font-museo leading-normal text-justify">
          Извините, страница не найдена.
        </p>
        <FontAwesomeIcon
          icon={faHouseCircleExclamation}
          className="text-orange arrow-icon text-4xl"
        />
      </div>
    </div>
  );
};

export default Error;
