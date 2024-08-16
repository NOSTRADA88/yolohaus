import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SwitchTechnologyProps } from "../../interfaces";

const SwitchTechnology: React.FC<SwitchTechnologyProps> = ({
  onTechnologySelect,
  updateMetaData,
  slugs,
  currentProjectSlug,
  slugProjects,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const technologyNames = ["СИП", "Каркас", "Газобетон"];
  const technologySlugs = ["sip", "karkas", "gazobeton"];

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

  const handleTechnologySelect = (
    technology: string,
    technologySlug: string
  ) => {
    onTechnologySelect(technology, technologySlug);
    updateMetaData(technology);

    const newURL = constructURL(currentProjectSlug, technologySlug);
    navigate(newURL, { replace: true });
  };

  const constructURL = (baseSlug: string, technologySlug: string) => {
    let newSlug = baseSlug;
    technologySlugs.forEach((slug) => {
      newSlug = newSlug.replace(new RegExp(`-${slug}$`), "");
    });
    return `${slugProjects}/${newSlug}-${technologySlug}`; // This constructs the correct URL
  };

  const getCurrentTechnology = () => {
    const currentPath = location.pathname;
    const selectedTech = technologySlugs.find((slug) =>
      currentPath.endsWith(`-${slug}`)
    );
    return selectedTech
      ? technologyNames[technologySlugs.indexOf(selectedTech)]
      : "";
  };

  return (
    <div className="flex gap-2 mt-5 mb-5">
      {technologyNames.map((technology, index) => (
        <button
          key={technology}
          className={`border flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange ${
            getCurrentTechnology() === technology ? "bg-orange" : ""
          }`}
          onClick={() =>
            handleTechnologySelect(technology, technologySlugs[index])
          }
        >
          <p
            className={`font-museo text-lg text-maingray font-bold transition-all duration-300 ${
              getCurrentTechnology() === technology ? "text-white" : ""
            }`}
          >
            {technology}
          </p>
        </button>
      ))}
    </div>
  );
};

export default SwitchTechnology;
