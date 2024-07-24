import { Link } from "react-router-dom";

const Stocks = () => {
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
      <div className="flex justify-between max-[680px]:flex-col max-sm:gap-4 ">
        <h1 className="text-maingray font-museo font-bold text-3xl max-[900px]:text-2xl">
          Акции
        </h1>
        <div className="flex items-center">
          <Link
            to="/"
            className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
          >
            Главная /{" "}
          </Link>
          <p className="ml-1 font-museo font-light text-sm text-lightgray max-[900px]:text-xs">
            Акции
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
