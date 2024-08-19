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
  }, [initialTechnology]);

  const handleTechnologySelect = (
    technology: string,
    technologySlug: string
  ) => {
    setSelectedTechnology(technology);
    onTechnologySelect(technology, technologySlug);
  };

  const filteredComplectations = complectations.filter((project) => {
    const projectTechnology = project.slug.toLowerCase();
    return projectTechnology === selectedTechnology.toLowerCase();
  });

  return {
    selectedTechnology,
    handleTechnologySelect,
    filteredComplectations,
  };
};
