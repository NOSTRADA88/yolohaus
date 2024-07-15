import { useEffect, useState } from "react";
import { fetchProjectDetailData, fetchProjectsData } from "../../api";
import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Technology from "../../components/projects/Technology";

interface ProjectsDetailProps {
  projectsSlug: string;
}

interface DetailsData {
  id: number;
  attributes: {
    YouTube: string;
    slug: string;
    Title: string;
    Description: { type: string; children: { text: string; type: string }[] }[];
    ShortDescription: {
      type: string;
      children: { text: string; type: string }[];
    }[];
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
  Metadata: {
    id: number;
    MetaTitle: string;
    MetaDescription: string;
  };
  Slug: {
    id: number;
    BuildingTechnology: string;
  };
  complectations: {
    data: Complectation[];
  };
}

const ProjectsDetail = ({ projectsSlug }: ProjectsDetailProps) => {
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slugProjects, setSlugProjects] = useState<string>("");
  const [titleProjects, setTitleProjects] = useState<string>("");
  const [projects, setProjects] = useState<DetailsData[]>([]);
  const [complectations, setComplectations] = useState<Project[]>([]);

  const fetchData = async () => {
    try {
      const projectData = await fetchProjectDetailData(projectsSlug);
      setMetaTitle(projectData.data[0].attributes.Metadata.MetaTitle);
      setMetaDescription(
        projectData.data[0].attributes.Metadata.MetaDescription
      );
      setTitle(projectData.data[0].attributes.Title);
      setProjects(projectData.data);
      const projectsData = await fetchProjectsData();
      setTitleProjects(projectsData.Title);
      setSlugProjects(projectsData.slug);
      setComplectations(projectData.data[0].attributes.Complectation);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };
  const updateTitle = (technology: string) => {
    const technologyNames = ["СИП", "Каркас", "Газобетон"];

    let newTitle = title;
    let newMetaTitle = metaTitle;
    let newMetaDescription = metaDescription;
    technologyNames.forEach((name) => {
      newTitle = newTitle.replace(` из ${name}`, "");
      newMetaTitle = newMetaTitle.replace(` из ${name}`, "");
      newMetaDescription = newMetaDescription.replace(` из ${name}`, "");
    });

    newTitle = `${newTitle} из ${technology}`;
    newMetaTitle = `${newMetaTitle} из ${technology}`;
    newMetaDescription = `Yolohaus дом под ключ. ${newTitle}`;

    setTitle(newTitle);
    setMetaTitle(newMetaTitle);
    setMetaDescription(newMetaDescription);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${slugProjects}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {titleProjects} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {title}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-20 max-md:mt-10">
          <div className="flex justify-between max-lg:flex-col">
            <SliderHouses details={projects} />
            <OptionsHouses details={projects} />
          </div>
          <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mt-10">
            Технология строительства
          </h2>
          <Technology
            updateTitle={updateTitle}
            complectations={complectations}
            currentProjectSlug={projectsSlug}
            slugProjects={slugProjects}
          />
          <div className="mt-10">
            <AboutHouses details={projects} slug={slugProjects} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetail;
