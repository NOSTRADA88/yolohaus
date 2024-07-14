import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { fetchHomeData, fetchProjectsData } from "../../api";
import { API_URL } from "../../constants";

interface PhotoFormats {
  url: string;
  name: string;
}

interface PhotoAttributes {
  name: string;
  formats: {
    large: PhotoFormats;
  };
}

interface Photo {
  id: number;
  attributes: PhotoAttributes;
}

interface ProjectAttributes {
  Title: string;
  isRecommended: boolean;
  slug: string;
  Photos: {
    data: Photo[];
  };
  Parameters: {
    id: number;
    HouseArea: string;
    BuiltUpArea: string;
    Floors: number;
    KitchenLivingRoomArea: string;
    Bedrooms: number;
    Toilets: number;
    TerraceAndPorchArea: string;
    Width: string;
    Height: string;
    ConstructionPeriod: string;
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

interface Project {
  id: number;
  attributes: ProjectAttributes;
}

interface Complectation {
  id: number;
  BasePrice: string;
  StandartPrice: string;
  ComfortPrice: string;
}

const Projects = () => {
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slugProjects, setSlugProjects] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [popular, setPopular] = useState<Project[]>([]);
  const [HouseArea, setHouseArea] = useState<string>("");
  const [WidthHeight, setWidthHeight] = useState<string>("");
  const [ConstructionPeriod, setConstructionPeriod] = useState<string>("");
  const [Bedrooms, setBedrooms] = useState<string>("");
  const [sortBy, setSortBy] = useState<"popularity" | "area" | "price" | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    const pageNumbers = [];
    const range = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pageNumbers.push(
          <span
            key={i}
            className={`cursor-pointer font-museo text-sm text-maingray ${
              currentPage === i
                ? "bg-orange text-white px-2 py-1 font-bold"
                : "hover:text-orange"
            }`}
            onClick={() => paginate(i)}
          >
            {i}
          </span>
        );
      } else if (
        i === currentPage - range - 1 ||
        i === currentPage + range + 1
      ) {
        pageNumbers.push(<span key={i}>...</span>);
      }
    }

    return (
      <div className="flex justify-center items-center mt-20 gap-4">
        <span
          className={`cursor-pointer font-museo text-sm font-light text-maingray max-md:hidden ${
            currentPage === 1
              ? "text-opacity-60 cursor-auto"
              : "hover:text-orange"
          }`}
          onClick={
            currentPage === 1 ? undefined : () => paginate(currentPage - 1)
          }
        >
          <FontAwesomeIcon icon={faArrowLeftLong} className="arrow-icon " />{" "}
          предыдущая страница
        </span>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className={`cursor-pointer font-museo text-sm font-light text-maingray arrow-icon hidden max-md:block ${
            currentPage === 1 ? "text-opacity-60 cursor-auto" : ""
          }`}
          onClick={
            currentPage === 1 ? undefined : () => paginate(currentPage - 1)
          }
        />{" "}
        {pageNumbers}
        <FontAwesomeIcon
          icon={faArrowRightLong}
          className={`cursor-pointer font-museo text-sm font-light text-maingray arrow-icon hidden max-md:block ${
            currentPage === totalPages ? "text-opacity-60 cursor-auto" : ""
          }`}
          onClick={
            currentPage === totalPages
              ? undefined
              : () => paginate(currentPage + 1)
          }
        />{" "}
        <span
          className={`cursor-pointer font-museo text-sm font-light text-maingray max-md:hidden ${
            currentPage === totalPages
              ? "text-opacity-60 cursor-auto"
              : "hover:text-orange"
          }`}
          onClick={
            currentPage === totalPages
              ? undefined
              : () => paginate(currentPage + 1)
          }
        >
          следующая страница{" "}
          <FontAwesomeIcon icon={faArrowRightLong} className="arrow-icon" />
        </span>
      </div>
    );
  };

  const fetchData = async () => {
    try {
      const projectsData = await fetchProjectsData();
      setMetaTitle(projectsData.Metadata.MetaTitle);
      setMetaDescription(projectsData.Metadata.MetaDescription);
      setTitle(projectsData.Title);
      setProjects(projectsData.ProjectsList.data);
      setHouseArea(projectsData.Icons.data[0].attributes.url);
      setConstructionPeriod(projectsData.Icons.data[1].attributes.url);
      setWidthHeight(projectsData.Icons.data[2].attributes.url);
      setBedrooms(projectsData.Icons.data[3].attributes.url);
      setSlugProjects(projectsData.slug);

      const mainData = await fetchHomeData();
      setPopular(mainData.PopularCottages.projects.data);

    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getMinPrice = (complectation: Complectation[]): number => {
    const prices = complectation.map((item) => {
      const basePrice = item.BasePrice
        ? parseInt(item.BasePrice.replace(/\D/g, ""), 10)
        : Infinity;
      const standardPrice = item.StandartPrice
        ? parseInt(item.StandartPrice.replace(/\D/g, ""), 10)
        : Infinity;
      const comfortPrice = item.ComfortPrice
        ? parseInt(item.ComfortPrice.replace(/\D/g, ""), 10)
        : Infinity;

      return Math.min(basePrice, standardPrice, comfortPrice);
    });

    return Math.min(...prices);
  };

  const sortProjects = (projects: Project[]) => {
    let sortedProjects = [...projects];
    const popularSet = new Set(popular.map((p) => p.id));

    if (sortBy === "popularity") {
      sortedProjects.sort((a, b) => {
        const isAPopular = popularSet.has(a.id);
        const isBPopular = popularSet.has(b.id);
        return (
          (sortDirection === "asc" ? 1 : -1) *
          ((isBPopular ? 1 : 0) - (isAPopular ? 1 : 0))
        );
      });
    } else if (sortBy === "area") {
      sortedProjects.sort(
        (a, b) =>
          (sortDirection === "asc" ? 1 : -1) *
          (parseFloat(a.attributes.Parameters.HouseArea) -
            parseFloat(b.attributes.Parameters.HouseArea))
      );
    } else if (sortBy === "price") {
      sortedProjects.sort(
        (a, b) =>
          (sortDirection === "asc" ? 1 : -1) *
          (getMinPrice(a.attributes.Complectation) -
            getMinPrice(b.attributes.Complectation))
      );
    }

    return sortedProjects;
  };

  const toggleSortBy = (criteria: "popularity" | "area" | "price") => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };
  const currentProjects = sortProjects(projects).slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };

  const resetSort = () => {
    setSortBy(null);
    setSortDirection("asc");
    setCurrentPage(1);
  };

  return (
    <div>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
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
        <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <h2 className="font-museo text-base text-maingray text-opacity-50">
            Сортировать по:
          </h2>
          <div className="flex gap-8 max-sm:gap-4 max-sm:items-start">
            <p
              className={`font-museo text-sm cursor-pointer underline decoration-dashed transition-all duration-300 ${
                sortBy === "popularity"
                  ? "text-orange"
                  : "text-maingray text-opacity-90"
              }`}
              onClick={() => toggleSortBy("popularity")}
            >
              Популярность{" "}
              {sortBy === "popularity" &&
                (sortDirection === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                ))}
            </p>
            <p
              className={`font-museo text-sm cursor-pointer underline decoration-dashed transition-all duration-300 ${
                sortBy === "area"
                  ? "text-orange"
                  : "text-maingray text-opacity-90"
              }`}
              onClick={() => toggleSortBy("area")}
            >
              Площадь{" "}
              {sortBy === "area" &&
                (sortDirection === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                ))}
            </p>
            <p
              className={`font-museo text-sm cursor-pointer underline decoration-dashed transition-all duration-300 ${
                sortBy === "price"
                  ? "text-orange"
                  : "text-maingray text-opacity-90"
              }`}
              onClick={() => toggleSortBy("price")}
            >
              Цена{" "}
              {sortBy === "price" &&
                (sortDirection === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                ))}
            </p>
          </div>
          {sortBy && (
            <FontAwesomeIcon
              onClick={resetSort}
              icon={faTimes}
              size="2x"
              className="font-museo text-sm cursor-pointer text-maingray transition-all duration-300 hover:text-orange"
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-8 mt-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          {currentProjects.map((project) => (
            <Link
              to={`/${slugProjects}/${project.attributes.slug}`}
              key={project.id}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[350px] h-[360px] max-xl:w-full  max-md:h-full
              max-[350px]:w-[280px] max-[350px]:h-[380px]
              transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative max-w-full ">
                {project.attributes.Photos.data.slice(0, 1).map((photo) => (
                  <LazyLoad
                    key={photo.id}
                    height={200}
                    offset={100}
                    once
                    placeholder={<div className="w-full h-full bg-gray-300" />}
                  >
                    <img
                      src={`${API_URL}${photo.attributes.formats.large.url}`}
                      alt={photo.attributes.name}
                      className="object-cover w-[350px] h-[180px] max-xl:w-full max-xl:object-center"
                    />
                  </LazyLoad>
                ))}
                {popular.some((p) => p.id === project.id) && (
                  <span className="absolute top-2 left-2 bg-orange text-white text-xs px-2 py-1 rounded-md">
                    Популярное
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-museo font-bold text-2xl text-maingray">
                  {project.attributes.Title}
                </h2>
                <div className="flex gap-[9px] mt-4">
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${HouseArea}`}
                      alt="House Area"
                      className="w-4 h-4"
                    />

                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.HouseArea}
                    </p>
                  </div>
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${WidthHeight}`}
                      alt="Width and Height"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.Width} x{" "}
                      {project.attributes.Parameters.Height}
                    </p>
                  </div>
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${ConstructionPeriod}`}
                      alt="Construction Period"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.ConstructionPeriod} дней
                    </p>
                  </div>
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${Bedrooms}`}
                      alt="Bedrooms"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.Bedrooms}
                    </p>
                  </div>
                </div>
                <p className="font-museo mt-2 text-orange text-xl font-bold">
                  Цена от{" "}
                  {formatPrice(getMinPrice(project.attributes.Complectation))} ₽
                </p>
              </div>
              <div className="bg-lightwhite p-5 hover:bg-orange text-orange hover:text-white transition-all duration-300">
                <div className="flex justify-start items-center gap-2 cursor-pointer arrow-container">
                  <Link
                    to={`/${slugProjects}/${project.attributes.slug}`}
                    className="uppercase text-sm font-medium tracking-wider"
                  >
                    Посмотреть проект
                  </Link>
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className="arrow-icon"
                  />
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

export default Projects;
