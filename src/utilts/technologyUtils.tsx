import { Description, DescriptionChild, Kit } from "../interfaces";
import {Fragment, ReactNode} from "react";

export const convertDescriptionToElements = (
  description: Description[]
): ReactNode[] =>
  description.map((desc: Description, index: number) => (
    <p key={index} className="mb-2">
      {desc.children.map((child: DescriptionChild, childIndex: number) => (
        <span key={childIndex} className={child.bold ? "font-bold" : ""}>
          {child.text}
        </span>
      ))}
    </p>
  ));

export const renderTable = (
  isTechnologySelected: boolean,
  selectedTechnology: string | null,
  filteredComplectations: Kit[]
): React.ReactNode => {
  if (!isTechnologySelected || !selectedTechnology) {
    return null;
  }

  if (filteredComplectations.length === 0) {
    return null;
  }

  const [currentProject] = filteredComplectations;
  const { basePrice, standardPrice, comfortPrice, bundles } = currentProject;

  const uniqueTypes = Array.from(new Set(bundles.map((bundle) => bundle.type)));

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
            <Fragment key={index}>
              <tr className={`h-10 ${index % 2 !== 0 ? "" : "bg-[#EEEEEE]"}`}>
                <td className="font-museo text-maingray text-base font-bold p-5 max-md:text-sm align-top">
                  {type}
                </td>
                <td className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3">
                  {convertDescriptionToElements(
                    bundles.find(
                      (bundle) =>
                        bundle.type === type && bundle.name.includes("Базовая")
                    )?.description || []
                  )}
                </td>
                <td className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3">
                  {convertDescriptionToElements(
                    bundles.find(
                      (bundle) =>
                        bundle.type === type && bundle.name.includes("Стандарт")
                    )?.description || []
                  )}
                </td>
                <td className="text-left p-5 align-top font-museo text-sm text-maingray font-light max-md:p-3">
                  {convertDescriptionToElements(
                    bundles.find(
                      (bundle) =>
                        bundle.type === type && bundle.name.includes("Комфорт")
                    )?.description || []
                  )}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const technologyNames = ["СИП", "Каркас", "Газобетон"];
export const technologySlugs = ["sip", "karkas", "gazobeton"];

export const constructURL = (
  baseSlug: string,
  technologySlug: string,
  slugProjects: string
): string => {
  let newSlug = baseSlug;
  technologySlugs.forEach((slug) => {
    newSlug = newSlug.replace(new RegExp(`-${slug}$`), "");
  });
  return `${slugProjects}/${newSlug}-${technologySlug}`;
};

export const getCurrentTechnology = (locationPathname: string): string => {
  const selectedTech = technologySlugs.find((slug) =>
    locationPathname.endsWith(`-${slug}`)
  );
  return selectedTech
    ? technologyNames[technologySlugs.indexOf(selectedTech)]
    : "";
};
