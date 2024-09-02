import { useNavigate } from "react-router-dom";
import { SwitchTechnologyProps } from "../../interfaces";
import { useInitializeTechnology } from "../../hooks/useInitializeTechnology";
import {
  constructURL,
  getCurrentTechnology,
  technologyNames,
  technologySlugs,
} from "../../utilts/technologyUtils";
import {FC} from "react" ;

const SwitchTechnology: FC<SwitchTechnologyProps> = ({
  onTechnologySelect,
  updateMetaData,
  currentProjectSlug,
  slugProjects,
}) => {
  const navigate = useNavigate();

  useInitializeTechnology(onTechnologySelect, updateMetaData);

  const handleTechnologySelect = (
    technology: string,
    technologySlug: string
  ) => {
    onTechnologySelect(technology, technologySlug);
    updateMetaData(technology);

    const newURL = constructURL(
      currentProjectSlug,
      technologySlug,
      slugProjects
    );
    navigate(newURL, { replace: true });
  };
  const currentTechnology = getCurrentTechnology(window.location.pathname);

  return (
    <div className="flex gap-2 mt-5 mb-5">
      {technologyNames.map((technology, index) => (
        <button
          key={technology}
          className={`border flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange ${
            currentTechnology === technology ? "bg-orange" : ""
          }`}
          onClick={() =>
            handleTechnologySelect(technology, technologySlugs[index])
          }
        >
          <p
            className={`font-museo text-lg text-maingray font-bold transition-all duration-300 ${
              currentTechnology === technology ? "text-white" : ""
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
