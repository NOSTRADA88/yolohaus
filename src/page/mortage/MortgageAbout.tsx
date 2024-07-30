import React, { useEffect, useState } from "react";
import { fetchMortgageData } from "../../api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface MortgageData {
  metaTitle: string;
  metaDescription: string;
  title: string;
}

const MortgageAbout = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
  });

  const fetchData = async () => {
    try {
      const mortgageDataResponse = await fetchMortgageData();
      setMortgageData({
        metaTitle: mortgageDataResponse.Metadata.MetaTitle,
        metaDescription: mortgageDataResponse.Metadata.MetaDescription,
        title: mortgageDataResponse.Title,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{mortgageData.metaTitle}</title>
        <meta name="description" content={mortgageData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {mortgageData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {mortgageData.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MortgageAbout };
