import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SwitchTechnologyProps {
  onTechnologySelect: (technology: string) => void;
  slugs: string[];
  updateTitle: (technology: string) => void;
  currentProjectSlug: string;
  slugProjects: string;
}

const SwitchTechnology = ({
  onTechnologySelect,
  updateTitle,
  slugs,
  currentProjectSlug,
  slugProjects,
}: SwitchTechnologyProps) => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>("");

  const handleTechnologySelect = (technology: string) => {
    setSelectedTechnology(technology);
    onTechnologySelect(technology);
    updateTitle(technology);
  };

  const technologyNames = ["СИП", "Каркас", "Газобетон"];

  const constructURL = (baseSlug: string, technologySlug: string) => {
    const technologySlugs = ["sip", "karkas", "gazobeton"];
    let newSlug = baseSlug;

    technologySlugs.forEach((slug) => {
      if (newSlug.includes(`-${slug}`)) {
        newSlug = newSlug.replace(`-${slug}`, `-${technologySlug}`);
      }
    });

    if (!newSlug.includes(`-${technologySlug}`)) {
      newSlug = `${newSlug}-${technologySlug}`;
    }
    return `/${slugProjects}/${newSlug}`;
  };

  return (
    <div className="flex gap-2 mt-5 mb-5">
      {technologyNames.map((technology, index) => (
        <Link
          key={technology}
          to={constructURL(currentProjectSlug, slugs[index])}
          className={`border flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange ${
            selectedTechnology === technology ? "bg-orange" : ""
          }`}
          onClick={() => handleTechnologySelect(technology)}
        >
          <p
            className={`font-museo text-lg text-maingray font-bold transition-all duration-300 ${
              selectedTechnology === technology ? "text-white" : ""
            }`}
          >
            {technology}
          </p>
        </Link>
      ))}
    </div>
  );
};
export default SwitchTechnology;
