import React from "react";
import { useTechnology } from "../../hooks/useTechnology";
import SwitchTechnology from "./SwitchTechnology";
import { TechnologyProps } from "../../interfaces";
import { renderTable } from "../../utilts/technologyUtils";
import { formatPrice, getMinPrice } from "../../constants";

const Technology: React.FC<TechnologyProps> = ({
  complectations,
  currentProjectSlug,
  slugProjects,
  updateMetaData,
  initialTechnology,
  onTechnologySelect,
  isTechnologySelected,
}) => {
  const { selectedTechnology, handleTechnologySelect, filteredComplectations } =
    useTechnology({
      initialTechnology,
      complectations,
      updateMetaData,
      onTechnologySelect,
      isTechnologySelected,
      currentProjectSlug,
      slugProjects,
    });

  return (
    <div>
      <SwitchTechnology
        onTechnologySelect={handleTechnologySelect}
        updateMetaData={updateMetaData}
        currentProjectSlug={currentProjectSlug}
        slugProjects={slugProjects}
        selectedTechnology={selectedTechnology}
      />
      {isTechnologySelected &&
        renderTable(
          isTechnologySelected,
          selectedTechnology,
          filteredComplectations
        )}
    </div>
  );
};

export default Technology;
