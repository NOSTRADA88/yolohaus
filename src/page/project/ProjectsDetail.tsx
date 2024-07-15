import { useEffect, useState } from "react";
import { fetchProjectDetailData, fetchProjectsData } from "../../api";
import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Technology from "../../components/projects/Technology";

interface ProjectsDetailProps {
  projectsSlug: string;
  initialTechnology?: string;
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

const ProjectsDetail = ({
  projectsSlug,
  initialTechnology,
}: ProjectsDetailProps) => {
  const [projectData, setProjectData] = useState({
    metaTitle: "",
    metaDescription: "",
    title: "",
    slugProjects: "",
    titleProjects: "",
    projects: [] as DetailsData[],
    complectations: [] as Project[],
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [intermediateTitle, setIntermediateTitle] = useState<string>("");

  const fetchData = async () => {
    try {
      const projectDetailData = await fetchProjectDetailData(projectsSlug);
      const projectsData = await fetchProjectsData();

      if (projectDetailData.data && projectDetailData.data.length > 0) {
        const newProjectData = {
          metaTitle: projectDetailData.data[0].attributes.Metadata.MetaTitle,
          metaDescription:
            projectDetailData.data[0].attributes.Metadata.MetaDescription,
          title: projectDetailData.data[0].attributes.Title,
          projects: projectDetailData.data,
          complectations: projectDetailData.data[0].attributes.Complectation,
          titleProjects: projectsData.Title,
          slugProjects: projectsData.slug,
        };

        setProjectData(newProjectData);
        setIntermediateTitle(projectDetailData.data[0].attributes.Title);

        const urlParts = location.pathname.split("-");
        const technologyFromUrl = urlParts[urlParts.length - 1];
        if (["sip", "karkas", "gazobeton"].includes(technologyFromUrl)) {
          const technologyMap = {
            sip: "СИП",
            karkas: "Каркас",
            gazobeton: "Газобетон",
          };
          updateTitle(
            technologyMap[technologyFromUrl as keyof typeof technologyMap],
            projectDetailData.data[0].attributes.Title
          );
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Ошибка запроса:", error);
      setLoading(false);
    }
  };

  const updateTitle = (technology: string, initialTitle?: string) => {
    const technologyNames = ["СИП", "Каркас", "Газобетон"];
    let { metaTitle, metaDescription, title } = projectData;

    if (initialTitle) {
      title = initialTitle;
    }

    technologyNames.forEach((name) => {
      title = title.replace(` из ${name}`, "");
      metaTitle = metaTitle.replace(` из ${name}`, "");
      metaDescription = metaDescription.replace(` из ${name}`, "");
    });

    title = `${title} из ${technology}`;
    metaTitle = `${title}`;
    metaDescription = `Yolohaus дом под ключ. ${title}`;

    setProjectData((prevData) => ({
      ...prevData,
      title,
      metaTitle,
      metaDescription,
    }));
  };

  useEffect(() => {
    const fetchDataAndSetTitle = async () => {
      await fetchData();
      if (initialTechnology) {
        const technologyMap = {
          sip: "СИП",
          karkas: "Каркас",
          gazobeton: "Газобетон",
        };
        if (projectData.projects.length > 0) {
          updateTitle(
            technologyMap[initialTechnology as keyof typeof technologyMap],
            projectData.projects[0].attributes.Title
          );
        }
      }
    };

    fetchDataAndSetTitle();
  }, [projectsSlug, initialTechnology, location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>{projectData.metaTitle}</title>
        <meta name="description" content={projectData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {projectData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${projectData.slugProjects}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {projectData.titleProjects} /{" "}
            </Link>
            {initialTechnology && (
              <Link
                to={`/${projectData.slugProjects}/${projectsSlug}`}
                className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
              >
                {intermediateTitle} /{" "}
              </Link>
            )}
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {projectData.title}
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-20 max-md:mt-10">
          {projectData.projects.length > 0 && (
            <>
              <div className="flex justify-between max-lg:flex-col">
                <SliderHouses details={projectData.projects} />
                <OptionsHouses details={projectData.projects} />
              </div>
              <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mt-10">
                Технология строительства
              </h2>
              <Technology
                updateTitle={(technology) => updateTitle(technology)}
                complectations={projectData.complectations}
                currentProjectSlug={projectsSlug}
                slugProjects={projectData.slugProjects}
                initialTechnology={initialTechnology}
              />
              <div className="mt-10">
                <AboutHouses
                  details={projectData.projects}
                  slug={projectData.slugProjects}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetail;
