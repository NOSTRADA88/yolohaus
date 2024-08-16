import { useEffect, useState } from "react";
import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [finalTitle, setFinalTitle] = useState<string>("");
  const [intermediateTitle, setIntermediateTitle] = useState<string>("");
  const [isTechnologySelected, setIsTechnologySelected] =
    useState<boolean>(false);
  const { projectData, setProjectData } = useProjectsDetailPage({
    projectsSlug: projectsSlug || "",
  });

  const updateMetaData = (technology: string | null) => {
    if (!projectData) return;

    let { title, metaTitle, metaDescription } = projectData;

    const technologyNames = ["СИП", "Каркас", "Газобетон"];
    technologyNames.forEach((name) => {
      title = title.replace(` из ${name}`, "");
      metaTitle = metaTitle?.replace(` из ${name}`, "") || "";
      metaDescription = metaDescription?.replace(` из ${name}`, "") || "";
    });

    if (technology) {
      title = `${title} из ${technology}`;
      metaTitle = title;
      metaDescription = `Yolohaus дом под ключ. ${title}`;
      setIsTechnologySelected(true);
    } else {
      setIsTechnologySelected(false);
    }

    setProjectData((prevData) => ({
      ...prevData!,
      title,
      metaTitle,
      metaDescription,
    }));

    setFinalTitle(title);
  };

  useEffect(() => {
    if (!projectData) return;

    // Only set intermediateTitle if it hasn't been set yet
    if (!intermediateTitle) {
      setIntermediateTitle(projectData.title);
    }

    // Determine if a technology is selected based on the current path
    const currentPath = location.pathname;
    const technologySlugs = ["sip", "karkas", "gazobeton"];
    const selectedTechSlug = technologySlugs.find((slug) =>
      currentPath.endsWith(`-${slug}`)
    );

    // Map slug to technology name
    const technologyMap = {
      sip: "СИП",
      karkas: "Каркас",
      gazobeton: "Газобетон",
    };

    const technologyName = selectedTechSlug
      ? technologyMap[selectedTechSlug as keyof typeof technologyMap]
      : null;

    // Update meta data only if technology is selected
    if (technologyName && !isTechnologySelected) {
      updateMetaData(technologyName);
    } else if (!technologyName) {
      setFinalTitle(projectData.title);
      setIsTechnologySelected(false);
    }

    setLoading(false);
  }, [projectData, location.pathname, intermediateTitle, isTechnologySelected]);

  const handleTechnologySelect = (
    technology: string,
    technologySlug: string
  ) => {
    updateMetaData(technology);
    const newURL = `${slug.projects}/${projectsSlug}-${technologySlug}`;
    navigate(newURL, { replace: true });
  };

  const breadcrumbItems = [{ title: "Проекты и цены", slug: slug.projects }];

  if (isTechnologySelected) {
    breadcrumbItems.push({
      title: intermediateTitle,
      slug: `${slug.projects}/${projectsSlug}`,
    });
  }

  if (!projectData || loading) {
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
        <Breadcrumbs items={breadcrumbItems} finalTitle={finalTitle} />
        <div className="flex flex-col mt-20 max-xl:mt-10 max-sm:mt-5">
          <div className="flex justify-between max-lg:flex-col">
            <SliderHouses details={[projectData]} />
            <OptionsHouses details={[projectData]} />
          </div>
          <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mt-10">
            Технология строительства
          </h2>
          <Technology
            updateMetaData={updateMetaData}
            complectations={projectData.kits || []}
            currentProjectSlug={projectsSlug}
            slugProjects={slug.projects}
            initialTechnology={initialTechnology}
            onTechnologySelect={handleTechnologySelect}
            isTechnologySelected={isTechnologySelected}
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
