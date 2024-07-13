import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface DescriptionChild {
  text?: string;
  type: string;
  bold?: boolean;
  children?: DescriptionChild[];
}

interface DescriptionBlock {
  type: string;
  children: DescriptionChild[];
}

interface DetailsData {
  id: number;
  attributes: {
    YouTube: string | null;
    slug: string;
    Title: string;
    Description: DescriptionBlock[];
    Parameters: {
      id: number;
      Area: string;
      Location: string;
      Days: number;
      HouseArea: string;
      BuiltUpArea: string;
      Floors: number;
      KitchenLivingRoomArea: string;
      Bedrooms: number;
      Toilets: number;
      TerraceAndPorchArea: string;
      Width: string;
      Height: string;
      ConstructionPeriod: string;
    };
    Complectation: {
      id: number;
      Description: {
        type: string;
        children: { text: string; type: string }[];
      }[];
      BasePrice: string;
      StandartPrice: string;
      ComfortPrice: string;
      Slug: {
        id: number;
        BuildingTechnology: string;
      };
      Metadata: {
        id: number;
        MetaTitle: string;
        MetaDescription: string;
      };
    }[];
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
  details: DetailsData[];
  slug: string;
};

const AboutHouses = ({ details, slug }: AboutHousesProps) => {
  return (
    <div>
      <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mb-5">
        О проекте
      </h2>
      {details[0]?.attributes.Description?.map((block, index) => {
        return (
          <p
            key={index}
            className="font-museo font-light text-base text-maingray text-justify mb-5"
          >
            {block.children.map((child: DescriptionChild, childIndex) => (
              <span
                key={childIndex}
                className={`${child.bold ? "font-bold" : ""} `}
              >
                {child.text}
              </span>
            ))}
          </p>
        );
      })}
      <div className=" bg-lightwhite p-5 w-60 max-md:w-full mt-10">
        <div className="flex justify-start items-center gap-2 cursor-pointer  arrow-container ">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="text-orange arrow-icon"
          />
          <Link
            to={`/${slug}`}
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
