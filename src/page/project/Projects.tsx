import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, formatPrice, getMinPrice, slug } from "../../constants";
import { Sort } from "../../components/projects";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useHomePage from "../../hooks/useHomePage";
import useProjectsPage from "../../hooks/useProjectsPage";
import useSortedProjects from "../../hooks/useSortedProjects";
import usePaginatedItems from "../../hooks/usePaginatedItems";

const Projects = () => {
  const {
    homeData,
    isLoading: isLoadingHome,
    error: errorHome,
  } = useHomePage();
  const {
    projectsData,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useProjectsPage();

  const { sortedProjects, sortBy, sortDirection, toggleSortBy, resetSort } =
    useSortedProjects(projectsData ?? null, homeData ?? null);

  const {
    visibleItems: visibleProjects,
    lastItemRef,
    isEndOfList,
  } = usePaginatedItems({
    items: sortedProjects,
  });

  if (isLoadingHome || isLoadingProjects) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (errorHome || errorProjects) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!projectsData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-gray-500 text-lg font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{projectsData.metadata.title}</title>
        <meta name="description" content={projectsData.metadata.description} />
        {projectsData.projects.map((project) => (
          <link
            rel="preload"
            href={`${API_URL}${project.photos[0].url}`}
            as="image"
          />
        ))}
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <Breadcrumbs finalTitle={projectsData.title} />
        <Sort
          sortBy={sortBy}
          sortDirection={sortDirection}
          toggleSortBy={toggleSortBy}
          resetSort={resetSort}
        />
        <div className="grid grid-cols-3 gap-8 mt-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          {visibleProjects.map((project, index) => (
            <div
              key={project.slug}
              ref={index === visibleProjects.length - 1 ? lastItemRef : null}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] transition-all duration-300 hover:shadow-2xl group"
            >
              <Link to={`${slug.projects}/${project.slug}`}>
                <div className="relative  overflow-hidden">
                  {homeData?.popularProjects.popularProject.some(
                    (p) => p.slug === project.slug
                  ) && (
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
                  <div className="flex gap-[9px] mt-4">
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${projectsData.icons[0].url}`}
                        alt="House Area"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {project.parameters.houseArea}
                      </p>
                    </div>
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${projectsData.icons[1].url}`}
                        alt="Width and Height"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {project.parameters.width} x {project.parameters.height}
                      </p>
                    </div>
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${projectsData.icons[2].url}`}
                        alt="Construction Period"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {project.parameters.constructionPeriod} дней
                      </p>
                    </div>
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${projectsData.icons[3].url}`}
                        alt="Bedrooms"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {project.parameters.bedrooms}
                      </p>
                    </div>
                  </div>
                  <p className="font-museo mt-6 text-orange text-xl font-bold">
                    Цена от {formatPrice(getMinPrice(project.prices))} ₽
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {!isEndOfList && (
          <div className="flex justify-center items-center mt-8 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>
        )}
      </div>
    </>
  );
};

export { Projects };
