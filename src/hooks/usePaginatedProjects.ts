import { useState, useCallback, useEffect, useRef } from "react";
import { Project } from "../interfaces";

const usePaginatedProjects = (sortedProjects: Project[]) => {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const projectsPerPage = 9;
  const lastProjectRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (sortedProjects.length > 0) {
      const initialProjects = sortedProjects.slice(0, projectsPerPage);
      setVisibleProjects(initialProjects);
      setIsEndOfList(initialProjects.length >= sortedProjects.length);
      setCurrentPage(1);
    }
  }, [sortedProjects]);

  const loadMoreProjects = useCallback(() => {
    if (isEndOfList) return;

    const nextPage = currentPage + 1;
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
  }, [currentPage, sortedProjects, isEndOfList, visibleProjects.length]);

  const handleScroll = useCallback(() => {
    if (!lastProjectRef.current || isEndOfList) return;

    const lastProjectRect = lastProjectRef.current.getBoundingClientRect();
    if (
      lastProjectRect.bottom <= window.innerHeight &&
      visibleProjects.length < sortedProjects.length
    ) {
      loadMoreProjects();
    }
  }, [
    isEndOfList,
    loadMoreProjects,
    visibleProjects.length,
    sortedProjects.length,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    visibleProjects,
    isEndOfList,
    lastProjectRef,
    loadMoreProjects,
  };
};

export default usePaginatedProjects;
