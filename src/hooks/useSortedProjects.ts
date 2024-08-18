// useSortedProjects.ts
import { useState, useEffect } from "react";
import { HomeData, Project } from "../interfaces";
import { getMinPrice } from "../constants";

const useSortedProjects = (
  projectsData: { projects: Project[] } | null,
  homeData: HomeData | null
) => {
  const [sortBy, setSortBy] = useState<"popularity" | "area" | "price" | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (projectsData) {
      setSortedProjects(sortProjects(projectsData.projects));
    }
  }, [projectsData, sortBy, sortDirection]);

  const sortProjects = (projectsToSort: Project[]) => {
    if (!projectsData || !homeData) return projectsToSort;

    let sortedProjects = [...projectsToSort];

    const popularSet = new Set(
      homeData.popularProjects.popularProject.map((p: Project) => p.slug)
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
  };

  const resetSort = () => {
    setSortBy(null);
    setSortDirection("asc");
    if (projectsData) {
      setSortedProjects(projectsData.projects);
    }
  };

  return {
    sortedProjects,
    sortBy,
    sortDirection,
    toggleSortBy,
    resetSort,
  };
};

export default useSortedProjects;
