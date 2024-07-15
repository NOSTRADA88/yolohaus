import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface PhotoFormats {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface PhotoAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: PhotoFormats;
    small: PhotoFormats;
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

interface PopularProjectsProps {
  title: string;
  projects: Project[];
  houseAreaIcon: string;
  widthHeightIcon: string;
  constructionPeriodIcon: string;
  bedroomsIcon: string;
  slugProjects: string;
}

const PopularProjects = ({
  title,
  projects,
  houseAreaIcon,
  widthHeightIcon,
  constructionPeriodIcon,
  bedroomsIcon,
  slugProjects,
}: PopularProjectsProps) => {
  const parsePrice = (price: string | null): number => {
    return price ? parseInt(price.replace(/\D/g, ""), 10) : Infinity;
  };

  const getMinPrice = (complectation: Complectation[]): number => {
    const prices = complectation.map((item) =>
      Math.min(
        parsePrice(item.BasePrice),
        parsePrice(item.StandartPrice),
        parsePrice(item.ComfortPrice)
      )
    );
    return Math.min(...prices);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };

  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16">
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-6">
        <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">
          {title}
        </h1>
        <div className=" bg-lightwhite p-5 max-md:w-full">
          <div className="flex justify-start items-center gap-2 cursor-pointer  arrow-container ">
            <Link
              to={`/${slugProjects}`}
              className="text-orange uppercase text-sm font-medium tracking-wider  max-md:text-xs"
            >
              Все проекты{" "}
            </Link>
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className="text-orange arrow-icon"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-10 max-xl:grid-cols-2 max-md:grid-cols-1">
        {projects.slice(0, 6).map((project) => (
          <Link
            to={`/${slugProjects}/${project.attributes.slug}`}
            key={project.id}
            className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[350px] h-[360px] max-xl:w-full  max-md:h-full
            max-[350px]:w-[280px] max-[350px]:h-[380px]
            transition-all duration-300 hover:shadow-2xl"
          >
            <img
              src={`${API_URL}${project.attributes.Photos.data[0].attributes.formats.large.url}`}
              alt={project.attributes.Photos.data[0].attributes.name}
              className="object-cover w-[350px] h-[180px] max-xl:w-full max-xl:object-center"
            />
            <div className="p-4">
              <h2 className="font-museo font-bold text-2xl text-maingray">
                {project.attributes.Title}
              </h2>
              <div className="flex gap-[9px] mt-4">
                <div className="flex gap-[4px]">
                  <img
                    src={`${API_URL}${houseAreaIcon}`}
                    alt="House Area"
                    className="w-4 h-4"
                  />
                  <p className="font-museo font-light text-sm text-maingray">
                    {project.attributes.Parameters.HouseArea}
                  </p>
                </div>
                <div className="flex gap-[4px]">
                  <img
                    src={`${API_URL}${widthHeightIcon}`}
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
                    src={`${API_URL}${constructionPeriodIcon}`}
                    alt="Construction Period"
                    className="w-4 h-4"
                  />
                  <p className="font-museo font-light text-sm text-maingray">
                    {project.attributes.Parameters.ConstructionPeriod} дней
                  </p>
                </div>
                <div className="flex gap-[4px]">
                  <img
                    src={`${API_URL}${bedroomsIcon}`}
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
    </div>
  );
};

export default PopularProjects;
