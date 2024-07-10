import { useEffect, useState } from "react";
import { fetchBuiltHousesData } from "../../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

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
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [houses, setHouses] = useState<Houses[]>([]);
  const [HouseArea, setHouseArea] = useState<string>("");
  const [Location, setLocation] = useState<string>("");
  const [ConstructionPeriod, setConstructionPeriod] = useState<string>("");
  const [slugBuilt, setSlugBuilt] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(houses.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = houses.slice(indexOfFirstProject, indexOfLastProject);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer font-museo text-sm text-maingray  ${
            currentPage === i
              ? "bg-orange text-white  px-2 py-1 font-bold"
              : "hover:text-orange"
          }`}
          onClick={() => paginate(i)}
        >
          {i}
        </span>
      );
    }
    return (
      <div className="flex  justify-center items-center mt-20 gap-4">
        <span
          className="cursor-pointer font-museo text-sm font-light text-maingray hover:text-orange"
          onClick={() => paginate(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} className="arrow-icon" />{" "}
          предыдущая страница
        </span>
        {pageNumbers}
        <span
          className="cursor-pointer font-museo text-sm font-light  text-maingray hover:text-orange"
          onClick={() => paginate(currentPage + 1)}
        >
          следующая страница{" "}
          <FontAwesomeIcon icon={faArrowRightLong} className="arrow-icon" />
        </span>
      </div>
    );
  };
  const fetchData = async () => {
    try {
      const builtData = await fetchBuiltHousesData();
      setMetaTitle(builtData.Metadata.MetaTitle);
      setMetaDescription(builtData.Metadata.MetaDescription);
      setTitle(builtData.title);
      setHouses(builtData.built_houses.data);
      setLocation(builtData.Icons.data[0].attributes.url);
      setHouseArea(builtData.Icons.data[1].attributes.url);
      setConstructionPeriod(builtData.Icons.data[2].attributes.url);
      setSlugBuilt(builtData.slug);
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
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>{" "}
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4 mb-10 max-sm:mb-5">
          <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl ">
            {title}
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
              {title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {currentProjects.map((house) => (
            <Link
              to={`/${slugBuilt}/${house.attributes.slug}`}
              key={house.id}
              className="flex flex-col mt-8 group cursor-pointer"
            >
              <div className="employee-photo-container">
                <img
                  src={`${API_URL}${house.attributes.Photos.data[0].attributes.url}`}
                  alt={house.attributes.Photos.data[0].attributes.name}
                  className="w-[280px] h-[207px] object-cover object-center"
                />
              </div>
              <div className="flex flex-col">
                <div className="houses-details bg-gray-100 ml-10 px-6 py-6 pt-[50px] max-[800px]:ml-4 max-[800px]:pt-2   ">
                  <div className="text-orange transition-all duration-300 absolute right-5 top-5">
                    <div className=" cursor-pointer arrow-container">
                      <Link to={`/${slugBuilt}/${house.attributes.slug}`}>
                        <FontAwesomeIcon
                          icon={faArrowRightLong}
                          className="arrow-icon text-xl"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 max-sm:grid-cols-2 items-end max-[450px]:grid-cols-1">
                    <h3 className="font-museo font-bold text-base mb-4 mt-2  text-maingray  group-hover:text-orange cursor-pointer">
                      {house.attributes.Title}
                    </h3>
                    <div className="flex gap-10">
                      <div className="flex gap-2">
                        <img
                          src={`${API_URL}${HouseArea}`}
                          alt="Construction Period"
                          className="w-4 h-4"
                        />
                        <p className="font-museo font-light text-sm text-maingray">
                          {house.attributes.Parameters.Area}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <img
                          src={`${API_URL}${ConstructionPeriod}`}
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
                        src={`${API_URL}${Location}`}
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
        {renderPagination()}
      </div>
    </div>
  );
};

export default BuiltHouses;
