import React, { useState, useEffect } from "react";
import SwitchTechnology from "./SwitchTechnology";
import {
  Description,
  DescriptionChild,
  TechnologyProps,
} from "../../interfaces";

const Technology: React.FC<TechnologyProps> = ({
  complectations,
  currentProjectSlug,
  slugProjects,
  updateTitle,
  initialTechnology,
}) => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>(
    initialTechnology || ""
  );

  useEffect(() => {
    if (initialTechnology) {
      setSelectedTechnology(initialTechnology);
    }
  }, [initialTechnology]);

  const handleTechnologySelect = (technology: string) => {
    setSelectedTechnology(technology);
  };

  const renderTable = () => {
    if (!selectedTechnology) {
      return null;
    }

    const filteredComplectations = complectations.filter((project) => {
      const projectTechnology = project.slug.toLowerCase();
      return projectTechnology === selectedTechnology.toLowerCase();
    });

    if (filteredComplectations.length === 0) {
      return null;
    }

    const [currentProject] = filteredComplectations;

    const { basePrice, standardPrice, comfortPrice, bundles } = currentProject;

    function convertDescriptionToElements(
      description: Description[]
    ): React.ReactNode[] {
      if (!description) return [];
      return description.map((desc, index) => (
        <p key={index} className="mb-2">
          {desc.children.map((child: DescriptionChild, childIndex: number) => (
            <span key={childIndex} className={child.bold ? "font-bold" : ""}>
              {child.text}
            </span>
          ))}
        </p>
      ));
    }

    const uniqueTypes = Array.from(
      new Set(bundles.map((bundle) => bundle.type))
    );

    return (
      <div className="overflow-y-auto max-sm:max-h-[600px]">
        <table
          className="w-full border-separate"
          style={{ borderSpacing: "4px" }}
        >
          <thead>
            <tr className="h-10">
              <th className="bg-[#E9E9E9] font-museo text-maingray text-base w-[274px] text-left p-5">
                Комплектация
              </th>
              <th className="bg-orange font-museo text-white text-base w-[274px] text-center">
                Базовая
              </th>
              <th className="bg-[#E0861D] font-museo text-white text-base w-[274px] text-center">
                Стандарт
              </th>
              <th className="bg-[#BF6F12] font-museo text-white text-base w-[274px] text-center">
                Комфорт
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-16">
              <td className="font-museo text-maingray text-base font-bold p-5 max-md:text-sm">
                Цена
              </td>
              <td className="text-center font-museo text-orange text-xl font-bold">
                {basePrice || "—"}
              </td>
              <td className="text-center font-museo text-orange text-xl font-bold">
                {standardPrice || "—"}
              </td>
              <td className="text-center font-museo text-orange text-xl font-bold">
                {comfortPrice || "—"}
              </td>
            </tr>
            {uniqueTypes.map((type, index) => (
              <React.Fragment key={index}>
                <tr className={`h-10 ${index % 2 !== 0 ? "" : "bg-[#EEEEEE]"}`}>
                  <td className="font-museo text-maingray text-base font-bold p-5 max-md:text-sm align-top">
                    {type}
                  </td>
                  <td className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3">
                    {bundles.find(
                      (bundle) =>
                        bundle.type === type && bundle.name.includes("Базовая")
                    )
                      ? convertDescriptionToElements(
                          bundles.find(
                            (bundle) =>
                              bundle.type === type &&
                              bundle.name.includes("Базовая")
                          )!.description
                        )
                      : "—"}
                  </td>
                  <td className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3">
                    {bundles.find(
                      (bundle) =>
                        bundle.type === type && bundle.name.includes("Стандарт")
                    )
                      ? convertDescriptionToElements(
                          bundles.find(
                            (bundle) =>
                              bundle.type === type &&
                              bundle.name.includes("Стандарт")
                          )!.description
                        )
                      : "—"}
                  </td>
                  <td className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3">
                    {bundles.find(
                      (bundle) =>
                        bundle.type === type && bundle.name.includes("Комфорт")
                    )
                      ? convertDescriptionToElements(
                          bundles.find(
                            (bundle) =>
                              bundle.type === type &&
                              bundle.name.includes("Комфорт")
                          )!.description
                        )
                      : "—"}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <SwitchTechnology
        onTechnologySelect={handleTechnologySelect}
        slugs={complectations.map((completion) => completion.slug)}
        currentProjectSlug={currentProjectSlug}
        slugProjects={slugProjects}
        updateTitle={updateTitle}
      />
      {renderTable()}
    </div>
  );
};

export default Technology;
