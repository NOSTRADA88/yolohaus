import { useState } from "react";
import { ActiveVacanciesProps } from "../../interfaces";

const ActiveVacancies = ({ vacancies }: ActiveVacanciesProps) => {
  const [openVacancy, setOpenVacancy] = useState<number | null>(null);
  return (
    <div>
      {vacancies.map((vacancy) => (
        <div key={vacancy.id} className="mt-4">
          <div
            className="cursor-pointer bg-white border-lightwhite border-2 p-4 rounded"
            onClick={() =>
              setOpenVacancy(openVacancy === vacancy.id ? null : vacancy.id)
            }
          >
            <h2 className="font-museo text-base text-maingray font-bold ">
              {vacancy.title}
            </h2>
          </div>
          {openVacancy === vacancy.id && (
            <div className="mt-2 bg-white p-4 rounded shadow">
              <h3 className="font-museo text-sm font-bold mb-2">
                Обязанности:
              </h3>
              <ul className="custom-list">
                {vacancy.responsibilities[0]?.children.map((item, index) => (
                  <li
                    key={index}
                    className="font-museo text-sm leading-relaxed font-light mb-2"
                  >
                    {item.children[0].text}
                  </li>
                ))}
              </ul>
              <h3 className="font-museo text-sm font-bold mb-2 mt-4">
                Условия работы:
              </h3>
              <ul className="custom-list">
                {vacancy.workingConditions[0]?.children.map((item, index) => (
                  <li
                    key={index}
                    className="font-museo text-sm leading-relaxed font-light mb-2"
                  >
                    {item.children[0].text}
                  </li>
                ))}
              </ul>
              <h3 className="font-museo text-sm font-bold mb-2 mt-4">
                Требования:
              </h3>
              <ul className="custom-list">
                {vacancy.requirements[0]?.children.map((item, index) => (
                  <li
                    key={index}
                    className="font-museo text-sm leading-relaxed font-light mb-2"
                  >
                    {item.children[0].text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActiveVacancies;
