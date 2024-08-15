import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, formatPrice, getMinPrice, slug } from "../../constants";
import { Sort } from "../../components/projects";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { Project } from "../../interfaces";
import useHomePage from "../../hooks/useHomePage";
import useProjectsPage from "../../hooks/useProjectsPage";

const Projects = () => {
  const [sortBy, setSortBy] = useState<"popularity" | "area" | "price" | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const projectsPerPage = 9;

  const homeData = useHomePage();
  const projectsData = useProjectsPage();
  const lastProjectRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (projectsData) {
      const sortedProjects = sortProjects(projectsData.projects);
      const initialProjects = sortedProjects.slice(0, projectsPerPage);
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= sortedProjects.length);
      setCurrentPage(1);
    }
  }, [projectsData, sortBy, sortDirection]);

  const loadMoreProjects = useCallback(() => {
    if (!projectsData || isEndOfList) return;

    const nextPage = currentPage + 1;
    const sortedProjects = sortProjects(projectsData.projects);
    const newProjects = sortedProjects.slice(
      currentPage * projectsPerPage,
      nextPage * projectsPerPage
    );

    if (newProjects.length > 0) {
      setVisibleProjects((prevProjects) => [...prevProjects, ...newProjects]);
      setCurrentPage(nextPage);
    }

    if (
      newProjects.length < projectsPerPage ||
      visibleProjects.length + newProjects.length >= sortedProjects.length
    ) {
      setIsEndOfList(true);
    }
  }, [
    currentPage,
    projectsData,
    sortBy,
    sortDirection,
    isEndOfList,
    visibleProjects.length,
  ]);

  const handleScroll = useCallback(() => {
    if (!lastProjectRef.current || isEndOfList || !projectsData) return;

    const lastProjectRect = lastProjectRef.current.getBoundingClientRect();
    if (
      lastProjectRect.bottom <= window.innerHeight &&
      visibleProjects.length < projectsData.projects.length
    ) {
      loadMoreProjects();
    }
  }, [isEndOfList, loadMoreProjects, projectsData, visibleProjects.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const sortProjects = (projectsToSort: Project[]) => {
    if (!projectsData || !homeData) return projectsToSort;

    let sortedProjects = [...projectsToSort];

    const popularSet = new Set(
      homeData.popularProjects.popularProject.map((p) => p.slug)
    );

    if (sortBy === "popularity") {
      sortedProjects.sort((a, b) => {
        const aIsPopular = popularSet.has(a.slug);
        const bIsPopular = popularSet.has(b.slug);
        if (aIsPopular === bIsPopular) return 0;
        return (sortDirection === "asc" ? -1 : 1) * (aIsPopular ? 1 : -1);
      });
    } else if (sortBy === "area") {
      sortedProjects.sort(
        (a, b) =>
          (sortDirection === "asc" ? -1 : 1) *
          (parseFloat(a.parameters.houseArea) -
            parseFloat(b.parameters.houseArea))
      );
    } else if (sortBy === "price") {
      sortedProjects.sort(
        (a, b) =>
          (sortDirection === "asc" ? -1 : 1) *
          (getMinPrice(a.prices) - getMinPrice(b.prices))
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
    if (projectsData) {
      const sortedProjects = sortProjects(projectsData.projects);
      const initialProjects = sortedProjects.slice(0, projectsPerPage);
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= sortedProjects.length);
    }
  };

  const resetSort = () => {
    setSortBy(null);
    setSortDirection("asc");
    setCurrentPage(1);
    if (projectsData) {
      const initialProjects = projectsData.projects.slice(0, projectsPerPage);
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= projectsData.projects.length);
    }
  };

  if (!projectsData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{projectsData.metaTitle}</title>
        <meta name="description" content={projectsData.metaDescription} />
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
            <Link
              key={project.id}
              to={`${slug.projects}/${project.slug}`}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[350px] h-[320px]
              max-xl:w-full max-md:h-full max-[350px]:w-[280px] transition-all duration-300 hover:shadow-2xl group"
              ref={index === visibleProjects.length - 1 ? lastProjectRef : null}
            >
              <div className="relative max-w-full overflow-hidden">
                {homeData?.popularProjects.popularProject.some(
                  (p) => p.slug === project.slug
                ) && (
                  <span className="absolute top-2 left-2 bg-orange text-white text-xs px-2 py-1 rounded-md z-10">
                    Популярное
                  </span>
                )}
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
