import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { fetchHomeData, fetchProjectsData } from "../../api";
import { API_URL, getMinPrice, slug } from "../../constants";
import { Sort } from "../../components/projects";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { HousesData } from "../../interfaces";

const Projects = () => {
  const [sortBy, setSortBy] = useState<"popularity" | "area" | "price" | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleProjects, setVisibleProjects] = useState<HousesData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const projectsPerPage = 9;

  const {
    data: projectData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const [projectsData, mainData] = await Promise.all([
        fetchProjectsData(),
        fetchHomeData(),
      ]);
      return {
        metaTitle: projectsData.Metadata.MetaTitle,
        metaDescription: projectsData.Metadata.MetaDescription,
        title: projectsData.Title,
        projects: projectsData.ProjectsList.data,
        popular: mainData.PopularCottages.Projects.data,
        HouseArea: projectsData.Icons.data[0].attributes.url,
        ConstructionPeriod: projectsData.Icons.data[1].attributes.url,
        WidthHeight: projectsData.Icons.data[2].attributes.url,
        Bedrooms: projectsData.Icons.data[3].attributes.url,
      };
    },
  });

  useEffect(() => {
    if (projectData) {
      const initialProjects = sortProjects(projectData.projects).slice(
        0,
        projectsPerPage
      );
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= projectData.projects.length);
    }
  }, [projectData, sortBy, sortDirection]);

  const loadMoreProjects = useCallback(() => {
    if (!projectData) return;

    const nextPage = currentPage + 1;
    const sortedProjects = sortProjects(projectData.projects);
    const newProjects = sortedProjects.slice(
      currentPage * projectsPerPage,
      nextPage * projectsPerPage
    );

    setVisibleProjects((prevProjects) => [...prevProjects, ...newProjects]);
    setCurrentPage(nextPage);
    setIsEndOfList(newProjects.length < projectsPerPage);
  }, [currentPage, projectData, sortBy, sortDirection]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !isLoading &&
      !isEndOfList
    ) {
      loadMoreProjects();
    }
  }, [isLoading, isEndOfList, loadMoreProjects]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const sortProjects = (projectsToSort: HousesData[]) => {
    if (!projectData) return projectsToSort;

    let sortedProjects = [...projectsToSort];
    const popularSet = new Set(
      projectData.popular.map((p: HousesData) => p.id)
    );

    if (sortBy === "popularity") {
      sortedProjects.sort(
        (a, b) =>
          (sortDirection === "asc" ? 1 : -1) *
          ((popularSet.has(b.id) ? 1 : 0) - (popularSet.has(a.id) ? 1 : 0))
      );
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
    if (projectData) {
      const sortedProjects = sortProjects(projectData.projects);
      const initialProjects = sortedProjects.slice(0, projectsPerPage);
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= sortedProjects.length);
    }
  };

  const formatPrice = (price: number) => price.toLocaleString("ru-RU");

  const resetSort = () => {
    setSortBy(null);
    setSortDirection("asc");
    setCurrentPage(1);
    if (projectData) {
      const initialProjects = projectData.projects.slice(0, projectsPerPage);
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= projectData.projects.length);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!projectData) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <title>{projectData.metaTitle}</title>
        <meta name="description" content={projectData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <Breadcrumbs finalTitle={projectData.title} />
        <Sort
          sortBy={sortBy}
          sortDirection={sortDirection}
          toggleSortBy={toggleSortBy}
          resetSort={resetSort}
        />
        <div className="grid grid-cols-3 gap-8 mt-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          {visibleProjects.map((project) => (
            <Link
              to={`${slug.projects}/${project.attributes.slug}`}
              key={project.id}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[350px] h-[320px] 
              max-xl:w-full max-md:h-full max-[350px]:w-[280px] transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="relative max-w-full overflow-hidden">
                {project.attributes.Photos.data.slice(0, 1).map((photo) => (
                  <LazyLoad
                    height={200}
                    offset={300}
                    once
                    placeholder={<div className="w-full h-full bg-gray-300" />}
                  >
                    <img
                      src={`${API_URL}${photo.url}`}
                      alt={photo.name}
                      className="w-[350px] h-[180px] max-xl:w-full max-xl:object-center max-xl:object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                    />
                  </LazyLoad>
                ))}
                {projectData.popular.some(
                  (p: HousesData) => p.id === project.id
                ) && (
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
                      src={`${API_URL}${projectData.HouseArea}`}
                      alt="House Area"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.HouseArea}
                    </p>
                  </div>
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${projectData.WidthHeight}`}
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
                      src={`${API_URL}${projectData.ConstructionPeriod}`}
                      alt="Construction Period"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.ConstructionPeriod} дней
                    </p>
                  </div>
                  <div className="flex gap-[4px]">
                    <img
                      src={`${API_URL}${projectData.Bedrooms}`}
                      alt="Bedrooms"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray">
                      {project.attributes.Parameters.Bedrooms}
                    </p>
                  </div>
                </div>
                <p className="font-museo mt-6 text-orange text-xl font-bold">
                  Цена от{" "}
                  {formatPrice(getMinPrice(project.attributes.Complectation))} ₽
                </p>
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

export { Projects };
