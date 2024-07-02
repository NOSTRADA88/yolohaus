import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface HousesData {
  id: number;
  attributes: {
    YouTube: string | null;
    slug: string;
    Title: string;
    Discription: { type: string; children: { text: string; type: string }[] }[];
    Parameters: {
      id: number;
      Area: string;
      Location: string;
      Days: number;
    };
    BuildingTechnology: {
      id: number;
      BuildingTechnology: string;
    };
    Photos: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      }[];
    };
  };
}

type AboutHousesProps = {
  houses: HousesData[];
  slugBuilt: string;
};
const AboutHouses = ({ houses, slugBuilt }: AboutHousesProps) => {
  return (
    <div>
      <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mb-5">
        О проекте
      </h2>
      {houses[0]?.attributes.Discription.map((paragraph, index) => (
        <p
          key={index}
          className="font-museo font-light text-base text-maingray text-justify mb-5"
        >
          {paragraph.children.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      ))}
      <div className=" bg-lightwhite p-5 w-60 max-md:w-full mt-10">
        <div className="flex justify-start items-center gap-2 cursor-pointer  arrow-container ">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="text-orange arrow-icon"
          />
          <Link
            to={`/${slugBuilt}`}
            className="text-orange uppercase text-sm font-medium tracking-wider  max-md:text-xs"
          >
            Назад к проектам
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHouses;
