import React, { useState, useEffect } from "react";
import SwitchTechnology from "./SwitchTechnology";
import { DescriptionChild, TechnologyProps } from "../../interfaces";

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
    if (!selectedTechnology) return null;

    const filteredComplectations = complectations.filter((project) => {
      const projectComplectations = project.bundles || [];
      return projectComplectations.some((bundle) =>
        bundle.name.includes(selectedTechnology)
      );
    });

    function convertDescriptionToElements(
      description: DescriptionChild[]
    ): React.ReactNode[] {
      if (!description) return [];
      return description.map((desc, index) => (
        <p key={index}>
          {desc.children?.map((child, childIndex) => (
            <span key={childIndex} className={child.bold ? "font-bold " : ""}>
              {child.text}
            </span>
          ))}
        </p>
      ));
    }

    return (
      <div className="overflow-y-auto max-sm:max-h-[600px]">
        <table
          className="w-full border-separate"
          style={{ borderSpacing: "4px" }}
        >
          <thead>
            <tr className="h-10">
              <th className="bg-[#E9E9E9] font-museo text-maingray text-base w-[274px] text-left p-5 ">
                Комплектация
              </th>
              <th className="bg-orange font-museo text-white text-base w-[274px] ">
                Базовая
              </th>
              <th className="bg-[#E0861D] font-museo text-white text-base w-[274px] ">
                Стандарт
              </th>
              <th className="bg-[#BF6F12] font-museo text-white text-base w-[274px] ">
                Комфорт
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComplectations.map((project) => {
              const projectComplectations = project.bundles || [];
              const baseComplectation = projectComplectations.find(
                (complectation) => complectation.name.includes("Базовая")
              );
              const standardComplectation = projectComplectations.find(
                (complectation) => complectation.name.includes("Стандарт")
              );
              const comfortComplectation = projectComplectations.find(
                (complectation) => complectation.name.includes("Комфорт")
              );

              const basePrice = project.basePrice || "—";
              const standardPrice = project.standardPrice || "—";
              const comfortPrice = project.comfortPrice || "—";

              const allEquipmentTypes = Array.from(
                new Set(
                  projectComplectations.flatMap(
                    (complectation) =>
                      complectation.description?.map(
                        (equipment) => equipment.type
                      ) || []
                  )
                )
              );

              return (
                <React.Fragment key={project.slug}>
                  <tr className="h-16">
                    <td className="font-museo text-maingray text-base font-bold p-5 max-md:text-sm">
                      Цена
                    </td>
                    <td className="text-center font-museo text-orange text-xl font-bold">
                      {basePrice}
                    </td>
                    <td className="text-center font-museo text-orange text-xl font-bold">
                      {standardPrice}
                    </td>
                    <td className="text-center font-museo text-orange text-xl font-bold">
                      {comfortPrice}
                    </td>
                  </tr>

                  {allEquipmentTypes.map((type) => (
                    <tr
                      key={type}
                      className="odd:bg-[#EEEEEE] even:bg-gray-100 align-top"
                    >
                      <td className="font-museo text-maingray text-base font-bold p-5 max-md:text-sm">
                        {type}
                      </td>
                      {["Базовая", "Стандарт", "Комфорт"].map((category) => {
                        let complectation;
                        switch (category) {
                          case "Базовая":
                            complectation = baseComplectation;
                            break;
                          case "Стандарт":
                            complectation = standardComplectation;
                            break;
                          case "Комфорт":
                            complectation = comfortComplectation;
                            break;
                          default:
                            complectation = null;
                            break;
                        }

                        const equipment = complectation
                          ? complectation.description.find(
                              (equipment) => equipment.type === type
                            )
                          : null;

                        return (
                          <td
                            className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3"
                            key={category}
                          >
                            {equipment ? (
                              convertDescriptionToElements(equipment.children)
                            ) : (
                              <p className="text-center p-5 align-top font-museo text-sm text-maingray font-light">
                                —
                              </p>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
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
