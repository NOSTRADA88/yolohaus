import { useEffect, useState } from "react";
import { fetchBuiltHousesData, fetchProjectsData } from "../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faPhone } from "@fortawesome/free-solid-svg-icons";

const BuiltHouses = () => {
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [houses, setHouses] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const builtData = await fetchBuiltHousesData();
      setMetaTitle(builtData.Metadata.MetaTitle);
      setMetaDescription(builtData.Metadata.MetaDescription);
      setTitle(builtData.title);
      setHouses(builtData.built_houses.data);
      console.log(builtData.built_houses.data);
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
          {houses.map((house) => (
            <div key={house.id} className="flex flex-col mt-8">
              <div className="employee-photo-container">
                <img
                  src={`${API_URL}${house.attributes.Photos.data[0].attributes.url}`}
                  alt={house.attributes.Photos.data[0].attributes.name}
                  className="w-[280px] h-[207px] object-cover object-center"
                />
              </div>
              <div className="flex flex-col">
                <div className="houses-details bg-gray-100 ml-14 px-10 py-6 pt-[50px] max-[800px]:ml-4 max-[800px]:pt-2  ">
                  <div className="text-orange transition-all duration-300 absolute right-5 top-5">
                    <div className=" cursor-pointer arrow-container">
                      <Link to="/">
                        <FontAwesomeIcon
                          icon={faArrowRightLong}
                          className="arrow-icon text-xl"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 max-sm:grid-cols-2 items-end max-[450px]:grid-cols-1">
                    <h3 className="font-museo font-light text-base mb-4 mt-2">
                      {house.attributes.Title}
                    </h3>
                    <p className=" mb-4 font-museo font-light text-sm leading-5 text-maingray">
                      {/* {house.attributes.Specialisation} */}
                    </p>

                    <p
                      className=" font-museo font-light text-sm leading-5 text-maingray 
                        hover:text-orange cursor-pointer transition-all duration-300"
                    >
                      <span className="mr-2">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-orange arrow-icon"
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuiltHouses;
