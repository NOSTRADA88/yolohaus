import { useState, useEffect } from "react";
import { TechnologyProps } from "../interfaces";

export const useTechnology = ({
  initialTechnology,
  complectations,
  updateMetaData,
  onTechnologySelect,
}: TechnologyProps) => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>(
    initialTechnology || ""
  );
  const [isTableVisible, setIsTableVisible] = useState<boolean>(Boolean(initialTechnology));

  useEffect(() => {
    if (initialTechnology) {
      setSelectedTechnology(initialTechnology);
      const technologyMap = {
        sip: "СИП",
        karkas: "Каркас",
        gazobeton: "Газобетон",
      };
      updateMetaData(
        technologyMap[initialTechnology as keyof typeof technologyMap]
      );
    } else {
      updateMetaData(null);
    }
  }, [initialTechnology, updateMetaData]);

  const handleTechnologySelect = (
    technology: string,
    technologySlug: string
  ) => {
    if (selectedTechnology === technology) {
      setIsTableVisible((prev) => !prev);
    } else {
      setSelectedTechnology(technology);
      setIsTableVisible(true);
      onTechnologySelect(technology, technologySlug);
    }
  };

  const filteredComplectations = complectations.filter((project) => {
    const projectTechnology = project.slug.toLowerCase();
    return projectTechnology === selectedTechnology.toLowerCase();
  });

  return {
    selectedTechnology,
    handleTechnologySelect,
    filteredComplectations,
    isTableVisible, 
  };
};
