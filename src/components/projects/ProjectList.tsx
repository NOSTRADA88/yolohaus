
import { Link } from 'react-router-dom';
import { API_URL, formatPrice, getMinPrice, slug } from "../../constants";
import { FC, memo } from 'react';
import { ProjectListProps } from 'src/interfaces';


const ProjectList: FC<ProjectListProps> = memo(({ projects, icons, itemType }) => {
  return (
    <div className="grid grid-cols-3 gap-8 mt-10 max-xl:grid-cols-2 max-md:grid-cols-1">
      {projects.map((project, index) => (
        <div
          key={index}
          ref={project.lastItemRef}
          className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] transition-all duration-300 hover:shadow-2xl group"
        >
          <Link to={`${slug[itemType]}/${project.slug}`}>
          <div className="relative overflow-hidden h-[200px] flex items-center justify-center max-md:h-[400px] max-sm:h-auto">
              {project.isPopular && (
                <span className="absolute top-2 left-2 bg-orange text-white text-xs px-2 py-1 rounded-md z-10">
                  Популярное
                </span>
              )}
              <img
                src={`${API_URL}${project.photos[0].url}`}
                alt={project.photos[0].name}
                width={350}
                height={200}
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <div className="p-4">
              <h2 className="font-museo font-bold text-2xl text-maingray">
                {project.title}
              </h2>
              <div className="flex gap-[9px] mt-4 flex-wrap">
                {project.parameters.houseArea && (
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${icons[0]?.url}`}
                      alt="House Area"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.parameters.houseArea}
                    </p>
                  </div>
                )}
                {project.parameters.width && project.parameters.height && (
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${icons[1]?.url}`}
                      alt="Width and Height"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.parameters.width} x {project.parameters.height}
                    </p>
                  </div>
                )}
                {project.parameters.constructionPeriod && (
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${icons[2]?.url}`}
                      alt="Construction Period"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.parameters.constructionPeriod} дней
                    </p>
                  </div>
                )}
                {project.parameters.bedrooms && (
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${icons[3]?.url}`}
                      alt="Bedrooms"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.parameters.bedrooms}
                    </p>
                  </div>
                )}
                {project.parameters.location && (
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${icons[2]?.url}`} // Иконка для Location
                      alt="Location"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.parameters.location}
                    </p>
                  </div>
                )}
              </div>
              {project.prices && (
                <p className="font-museo mt-6 text-orange text-xl font-bold">
                  Цена от {formatPrice(getMinPrice(project.prices))} ₽
                </p>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
});

export default ProjectList;
