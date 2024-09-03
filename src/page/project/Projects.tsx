
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { ProjectList, Sort } from "../../components/projects";
import useHomePage from "../../hooks/useHomePage";
import useProjectsPage from "../../hooks/useProjectsPage";
import useSortedProjects from "../../hooks/useSortedProjects";
import usePaginatedItems from "../../hooks/usePaginatedItems";
import { API_URL } from "src/constants";


const Projects = () => {
  const { homeData, isLoading: isLoadingHome, error: errorHome } = useHomePage();
  const { projectsData, isLoading: isLoadingProjects, error: errorProjects } = useProjectsPage();

  const { sortedProjects, sortBy, sortDirection, toggleSortBy, resetSort } = useSortedProjects(projectsData ?? null, homeData ?? null);

  const { visibleItems: visibleProjects, lastItemRef, isEndOfList } = usePaginatedItems({
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
        {projectsData.projects.map((project,index) => (
          <link
            rel="prefetch"
            href={`${API_URL}${project.photos[0].url}`}
            as="image" type="image/webp"
            key={index}
          />
        ))}
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <Breadcrumbs finalTitle={projectsData.title} />
        <Sort sortBy={sortBy} sortDirection={sortDirection} toggleSortBy={toggleSortBy} resetSort={resetSort} />
        <ProjectList
          projects={visibleProjects.map((project, index) => ({
            ...project,
            isPopular: homeData?.popularProjects.popularProject.some(p => p.slug === project.slug),
            lastItemRef: index === visibleProjects.length - 1 ? lastItemRef : null
          }))}
          icons={projectsData.icons}
          itemType="projects"
        />
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
