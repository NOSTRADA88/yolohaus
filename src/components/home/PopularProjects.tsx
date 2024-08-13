import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { PopularProjectsProps, Kit } from "../../interfaces";
import { slug } from "../../constants";
const PopularProjects = ({
  title,
  popularProject,
  icons,
}: PopularProjectsProps) => {
  const parsePrice = (price: string | null): number => {
    return price ? parseInt(price.replace(/\D/g, ""), 10) : Infinity;
  };

  const getMinPrice = (kits: Kit[]): number => {
    const prices = kits.map((kit) =>
      Math.min(
        parsePrice(kit.basePrice),
        parsePrice(kit.standardPrice),
        parsePrice(kit.comfortPrice)
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
              to={slug.projects}
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
        {popularProject?.slice(0, 6).map((project, index) => (
          <Link
            to={`${slug.projects}/${project.slug}`}
            key={index}
            className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[350px]  h-[320px] max-xl:w-full  max-md:h-full
            max-[350px]:w-[280px]
            transition-all duration-300 hover:shadow-2xl group"
          >
            <div className="relative max-w-full overflow-hidden">
              <img
                src={`${API_URL}${project.photo.url}`}
                alt={project.photo.name}
                className="w-[350px] h-[180px] max-xl:w-full max-xl:object-center max-xl:object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <div className="p-4">
              <h2 className="font-museo font-bold text-2xl text-maingray">
                {project.title}
              </h2>
              <div className="flex gap-[9px] mt-4">
                <div className="flex gap-[4px]">
                  {icons && (
                    <img
                      src={`${API_URL}${icons[0].url}`}
                      alt={icons[0].name}
                      className="w-4 h-4"
                      width={icons[0].width}
                      height={icons[0].height}
                    />
                  )}
                  <p className="font-museo font-light text-sm text-maingray">
                    {project.parameters.houseArea}
                  </p>
                </div>
                <div className="flex gap-[4px]">
                  {icons && (
                    <img
                      src={`${API_URL}${icons[1].url}`}
                      alt={icons[1].name}
                      className="w-4 h-4"
                      width={icons[0].width}
                      height={icons[0].height}
                    />
                  )}
                  <p className="font-museo font-light text-sm text-maingray">
                    {project.parameters.width} x {project.parameters.height}
                  </p>
                </div>
                <div className="flex gap-[4px]">
                  {icons && (
                    <img
                      src={`${API_URL}${icons[2].url}`}
                      alt={icons[2].name}
                      className="w-4 h-4"
                      width={icons[2].width}
                      height={icons[2].height}
                    />
                  )}
                  <p className="font-museo font-light text-sm text-maingray">
                    {project.parameters.constructionPeriod} дней
                  </p>
                </div>
                <div className="flex gap-[4px]">
                  {icons && (
                    <img
                      src={`${API_URL}${icons[3].url}`}
                      alt={icons[3].name}
                      className="w-4 h-4"
                      width={icons[3].width}
                      height={icons[3].height}
                    />
                  )}
                  <p className="font-museo font-light text-sm text-maingray">
                    {project.parameters.bedrooms}
                  </p>
                </div>
              </div>
              <p className="font-museo mt-6 text-orange text-xl font-bold">
                Цена от {formatPrice(getMinPrice(project.kits))} ₽
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularProjects;
