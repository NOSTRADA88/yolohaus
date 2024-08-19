import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { technologyNames, technologySlugs } from "../utilts/technologyUtils";

export const useInitializeTechnology = (
  onTechnologySelect: (technology: string, technologySlug: string) => void,
  updateMetaData: (technology: string | null) => void
) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedTech = technologySlugs.find((slug) =>
      currentPath.endsWith(`-${slug}`)
    );
    if (selectedTech) {
      const techIndex = technologySlugs.indexOf(selectedTech);
      const selectedTechnology = technologyNames[techIndex];
      onTechnologySelect(selectedTechnology, selectedTech);
      updateMetaData(selectedTechnology);
    }
  }, [location.pathname]);
};
