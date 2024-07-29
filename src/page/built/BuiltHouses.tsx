import { useCallback, useEffect, useState } from "react";
import { fetchBuiltHousesData } from "../../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
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

        <div className="grid grid-cols-3 gap-10 mt-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          {visibleHouses.map((house) => (
            <Link
              to={`/${houseData.slugBuilt}/${house.attributes.slug}`}
              key={house.id}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[340px] h-[365px] 
              max-xl:w-full max-md:h-full max-[350px]:w-[280px] transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="relative max-w-full overflow-hidden">
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
                    className="w-full h-[220px]   max-xl:w-full 
                    max-xl:object-center max-xl:object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                  />
                </LazyLoad>
              </div>
              <div className="p-4">
                <h2 className="font-museo font-bold text-2xl text-maingray">
                  {house.attributes.Title}
                </h2>
                <div className="flex gap-[9px] mt-4 flex-col">
                  <div className="flex gap-10">
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${houseData.HouseArea}`}
                        alt="Width and Height"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {house.attributes.Parameters.Area}
                      </p>
                    </div>
                    <div className="flex gap-[4px]">
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
                  <div className="flex gap-[4px] mt-2">
                    <img
                      src={`${API_URL}${houseData.Location}`}
                      alt="Bedrooms"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray mr-2">
                      {house.attributes.Parameters.Location}
                    </p>
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
