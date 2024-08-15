import { useEffect, useState } from "react";
import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Technology from "../../components/projects/Technology";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import { ProjectsDetailProps } from "../../interfaces";
import useProjectsDetailPage from "../../hooks/useProjectsDetailPage";
const ProjectsDetail = ({
  projectsSlug,
  initialTechnology,
}: ProjectsDetailProps) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [finalTitle, setFinalTitle] = useState<string>("");
  const { projectData, setProjectData } = useProjectsDetailPage({
    projectsSlug: projectsSlug || "",
  });
//НАДО ПОЧИНИТЬ ХЛЕБНЫЕ КРОШКИ И ОТОБРАЖЕНИЕ ПРИ КЛИКЕ НА ПРЕДЫДУЩИЙ 
  const updateTitle = (technology: string, initialTitle?: string) => {
    const technologyNames = ["СИП", "Каркас", "Газобетон"];
    let { metaTitle, metaDescription, title } = projectData || {};

    if (initialTitle) {
      title = initialTitle;
    }

    technologyNames.forEach((name) => {
      if (title) title = title.replace(` из ${name}`, "");
      if (metaTitle) metaTitle = metaTitle.replace(` из ${name}`, "");
      if (metaDescription)
        metaDescription = metaDescription.replace(` из ${name}`, "");
    });

    const updatedTitle = `${title} из ${technology}`;
    metaTitle = `${updatedTitle}`;
    metaDescription = `Yolohaus дом под ключ. ${updatedTitle}`;

    setProjectData((prevData) => ({
      ...prevData!,
      title: updatedTitle || "",
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
    }));

    setFinalTitle(updatedTitle);
  };

  useEffect(() => {
    const fetchDataAndSetTitle = async () => {
      if (projectData) {
        let initialTitle = projectData.title || "";
        if (initialTechnology) {
          const technologyMap = {
            sip: "СИП",
            karkas: "Каркас",
            gazobeton: "Газобетон",
          };
          updateTitle(
            technologyMap[initialTechnology as keyof typeof technologyMap],
            initialTitle
          );
        } else {
          setFinalTitle(initialTitle);
        }
        setLoading(false);
      }
    };

    fetchDataAndSetTitle();
  }, [projectsSlug, initialTechnology, location.pathname, projectData]);

  useEffect(() => {
    if (projectData?.title && !finalTitle) {
      setFinalTitle(projectData.title);
    }
  }, [projectData?.title, finalTitle]);

  const breadcrumbItems = [
    { title: "Проекты и цены", slug: slug.projects },
    {
      title: projectData?.title || "",
      slug: `${slug.projects}/${projectsSlug}`,
    },
  ];

  if (finalTitle && finalTitle !== projectData?.title) {
    breadcrumbItems.push({
      title: finalTitle,
      slug: `${slug.projects}/${projectsSlug}`,
    });
  }

  if (!projectData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{projectData.metaTitle || ""}</title>
        <meta name="description" content={projectData.metaDescription || ""} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={finalTitle} />
        <div className="flex flex-col mt-20 max-xl:mt-10 max-sm:mt-5">
          <div className="flex justify-between max-lg:flex-col">
            {/* <SliderHouses details={[projectData]} /> */}
            <OptionsHouses details={[projectData]} />
          </div>
          <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mt-10">
            Технология строительства
          </h2>
          <Technology
            updateTitle={(technology) => updateTitle(technology)}
            complectations={projectData.kits}
            currentProjectSlug={projectsSlug}
            slugProjects={slug.projects}
            initialTechnology={initialTechnology}
          />
          <div className="mt-10">
            <AboutHouses details={[projectData]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectsDetail };
