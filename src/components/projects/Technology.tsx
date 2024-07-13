import React, { useState } from "react";
import SwitchTechnology from "./SwitchTechnology";

interface Equipment {
  id: number;
  Type: string;
  Description: { type: string; children: { text: string }[] }[];
}

interface Complectation {
  id: number;
  attributes: {
    NameForStrapi: string;
    Equipment: Equipment[];
  };
}

interface Project {
  id: number;
  BasePrice?: string;
  StandartPrice?: string;
  ComfortPrice?: string;
  complectations: {
    data: Complectation[];
  };
}

interface DescriptionChild {
  text: string;
  bold?: boolean;
}

interface Description {
  type: string;
  children: DescriptionChild[];
}

interface TechnologyProps {
  complectations: Project[];
}

const Technology: React.FC<TechnologyProps> = ({ complectations }) => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>("");

  const handleTechnologySelect = (technology: string) => {
    setSelectedTechnology(technology);
  };

  const renderTable = () => {
    if (!selectedTechnology) return null;

    const filteredComplectations = complectations.filter((project) => {
      const projectComplectations = project.complectations?.data || [];
      return projectComplectations.some((complectation) =>
        complectation.attributes.NameForStrapi.includes(selectedTechnology)
      );
    });

    function convertDescriptionToElements(
      description: Description[]
    ): React.ReactNode[] {
      return description.map((desc, index) => (
        <p key={index}>
          {desc.children.map((child, childIndex) => (
            <span key={childIndex} className={child.bold ? "font-bold " : ""}>
              {child.text}
            </span>
          ))}
        </p>
      ));
    }
    return (
      <table
        className="w-full border-separate"
        style={{ borderSpacing: "4px" }}
      >
        <thead>
          <tr className="h-10">
            <th className="bg-[#E9E9E9] font-museo text-maingray text-base w-[274px] text-left p-5">
              Комплектация
            </th>
            <th className="bg-orange font-museo text-white text-base w-[274px]">
              Базовая
            </th>
            <th className="bg-[#E0861D] font-museo text-white text-base w-[274px]">
              Стандарт
            </th>
            <th className="bg-[#BF6F12] font-museo text-white text-base w-[274px]">
              Комфорт
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredComplectations.map((project) => {
            const projectComplectations = project.complectations?.data || [];
            const baseComplectation = projectComplectations.find(
              (complectation) =>
                complectation.attributes.NameForStrapi.includes("Базовая")
            );
            const standardComplectation = projectComplectations.find(
              (complectation) =>
                complectation.attributes.NameForStrapi.includes("Стандарт")
            );
            const comfortComplectation = projectComplectations.find(
              (complectation) =>
                complectation.attributes.NameForStrapi.includes("Комфорт")
            );

            const basePrice = project.BasePrice || "—";
            const standardPrice = project.StandartPrice || "—";
            const comfortPrice = project.ComfortPrice || "—";

            const allEquipmentTypes = Array.from(
              new Set(
                projectComplectations.flatMap((complectation) =>
                  complectation.attributes.Equipment.map(
                    (equipment) => equipment.Type
                  )
                )
              )
            );

            return (
              <React.Fragment key={project.id}>
                <tr className="h-16">
                  <td className="font-museo text-maingray text-base font-bold p-5">
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
                    <td className="font-museo text-maingray text-base font-bold p-5">
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
                        ? complectation.attributes.Equipment.find(
                            (equipment) => equipment.Type === type
                          )
                        : null;

                      return (
                        <td
                          className="text-left p-5 align-top font-museo text-sm text-maingray font-light"
                          key={category}
                        >
                          {equipment ? (
                            convertDescriptionToElements(equipment.Description)
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
    );
  };

  return (
    <div>
      <SwitchTechnology onTechnologySelect={handleTechnologySelect} />
      {renderTable()}
    </div>
  );
};

export default Technology;
