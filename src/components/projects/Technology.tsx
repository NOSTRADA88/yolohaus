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

    // Filter complectations based on the selected technology
    const filteredComplectations = complectations.filter((project) => {
      const projectComplectations = project.complectations?.data || [];
      return projectComplectations.some((complectation) =>
        complectation.attributes.NameForStrapi.includes(selectedTechnology)
      );
    });

    return (
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-[#E9E9E9] font-museo text-maingray text-base">
              Комплектация
            </th>
            <th className="bg-orange font-museo text-white text-base">
              Базовая
            </th>
            <th className="bg-[#E0861D] font-museo text-white text-base">
              Стандарт
            </th>
            <th className="bg-[#BF6F12] font-museo text-white text-base">
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
                <tr>
                  <td className="font-museo text-maingray text-base font-bold">
                    Цена
                  </td>
                  <td className="text-center">{basePrice}</td>
                  <td className="text-center">{standardPrice}</td>
                  <td className="text-center">{comfortPrice}</td>
                </tr>

                {allEquipmentTypes.map((type) => (
                  <tr key={type}>
                    <td className="font-museo text-maingray text-base font-bold">
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
                        <td className="text-left" key={category}>
                          {equipment
                            ? equipment.Description.map((desc) =>
                                desc.children.map((text) => text.text).join(" ")
                              ).join(" ")
                            : "—"}
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
