import { useCallback, useEffect, useState } from "react";
import { fetchBuiltHousesData } from "../../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import LazyLoad from "react-lazyload";

interface PhotoAttributes {
  name: string;
  url: string;
}

interface Photo {
  id: number;
  attributes: PhotoAttributes;
}

interface HousesAttributes {
  Title: string;
  isRecommended: boolean;
  slug: string;
  Photos: {
    data: Photo[];
  };
  Parameters: {
    id: number;
    Area: string;
    Location: string;
    Days: number;
  };
  Complectation: {
    id: number;
    Description: {
      type: string;
      children: {
        text: string;
        type: string;
      }[];
    }[];
    BasePrice: string;
    StandartPrice: string;
    ComfortPrice: string;
  }[];
}

interface Houses {
  id: number;
  attributes: HousesAttributes;
}

const BuiltHouses = () => {
  const [houseData, setHouseData] = useState({
    metaTitle: "",
    metaDescription: "",
    title: "",
    houses: [] as Houses[],
    HouseArea: "",
    Location: "",
    ConstructionPeriod: "",
    slugBuilt: "",
  });
  const [visibleHouses, setVisibleHouses] = useState<Houses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const housesPerPage = 9;

  const fetchData = async () => {
    try {
      const builtData = await fetchBuiltHousesData();

      setHouseData({
        metaTitle: builtData.Metadata.MetaTitle,
        metaDescription: builtData.Metadata.MetaDescription,
        title: builtData.title,
        houses: builtData.BuiltHouses.data,
        Location: builtData.Icons.data[0].attributes.url,
        HouseArea: builtData.Icons.data[1].attributes.url,
        ConstructionPeriod: builtData.Icons.data[2].attributes.url,
        slugBuilt: builtData.slug,
      });
      setVisibleHouses(builtData.BuiltHouses.data.slice(0, housesPerPage));
      if (builtData.BuiltHouses.data.length <= housesPerPage) {
        setIsEndOfList(true);
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreHouses = useCallback(() => {
    if (isEndOfList) return;

    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * housesPerPage;
    const endIndex = startIndex + housesPerPage;
    const newHouses = houseData.houses.slice(startIndex, endIndex);

    if (newHouses.length > 0) {
      setVisibleHouses((prevHouses) => [...prevHouses, ...newHouses]);
      setCurrentPage(nextPage);
      if (endIndex >= houseData.houses.length) {
        setIsEndOfList(true);
      }
    } else {
      setIsEndOfList(true);
    }
  }, [currentPage, houseData.houses, housesPerPage, isEndOfList]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !isLoading &&
      !isEndOfList
    ) {
      setIsLoading(true);
      setTimeout(() => {
        loadMoreHouses();
        setIsLoading(false);
      }, 500);
    }
  }, [isLoading, isEndOfList, loadMoreHouses]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <Helmet>
        <title>{houseData.metaTitle}</title>
        <meta name="description" content={houseData.metaDescription} />
      </Helmet>{" "}
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4 mb-10 max-sm:mb-5">
          <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl ">
            {houseData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              Главная /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {houseData.title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {visibleHouses.map((house) => (
            <Link
              to={`/${houseData.slugBuilt}/${house.attributes.slug}`}
              key={house.id}
              className="flex flex-col mt-8 group cursor-pointer"
            >
              <div className="employee-photo-container">
                <LazyLoad
                  key={house.id}
                  height={200}
                  offset={300}
                  once
                  placeholder={<div className="w-full h-full bg-gray-300" />}
                >
                  <img
                    src={`${API_URL}${house.attributes.Photos.data[0].attributes.url}`}
                    alt={house.attributes.Photos.data[0].attributes.name}
                    className="w-[280px] h-[207px] object-center max-md:w-[85%] max-sm:w-[90%] max-[400px]:w-[85%]"
                  />
                </LazyLoad>
              </div>
              <div className="flex flex-col">
                <div
                  className="houses-details bg-gray-100 ml-10 px-6 h-[180px] pt-[50px] max-[800px]:ml-4 max-[800px]:pt-12  max-md:pt-14 max-xl:h-[200px] 
                max-sm:h-[180px]   max-[480px]:h-[195px]  max-[350px]:h-[200px]"
                >
                  <div className="text-orange transition-all duration-300 absolute right-5 top-5 max-[800px]:right-3">
                    <div className=" cursor-pointer arrow-container">
                      <Link
                        to={`/${houseData.slugBuilt}/${house.attributes.slug}`}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRightLong}
                          className="arrow-icon text-xl"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1  items-end ">
                    <h3 className="font-museo font-bold text-base mb-4 mt-2 text-maingray  group-hover:text-orange cursor-pointer">
                      {house.attributes.Title}
                    </h3>
                    <div className="flex gap-10">
                      <div className="flex gap-2">
                        <img
                          src={`${API_URL}${houseData.HouseArea}`}
                          alt="Construction Period"
                          className="w-4 h-4"
                        />
                        <p className="font-museo font-light text-sm text-maingray">
                          {house.attributes.Parameters.Area}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <img
                          src={`${API_URL}${houseData.ConstructionPeriod}`}
                          alt="Construction Period"
                          className="w-4 h-4"
                        />
                        <p className="font-museo font-light text-sm text-maingray">
                          {house.attributes.Parameters.Days} дней
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <img
                        src={`${API_URL}${houseData.Location}`}
                        alt="Construction Period"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {house.attributes.Parameters.Location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {isLoading && (
          <div className="flex justify-center items-center mt-8 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuiltHouses;
