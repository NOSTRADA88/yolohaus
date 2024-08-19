import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slug } from "../constants";
import { ProjectsDetailProps } from "../interfaces";
import useProjectsDetailPage from "./useProjectsDetailPage";

export const useProjectDetails = ({
  projectsSlug,
  initialTechnology,
}: ProjectsDetailProps) => {
  const { projectData, setProjectData, isLoading, error } =
    useProjectsDetailPage({ projectsSlug: projectsSlug || "" });
  const [loading, setLoading] = useState(true);
  const [finalTitle, setFinalTitle] = useState<string>("");
  const [intermediateTitle, setIntermediateTitle] = useState<string>("");
  const [isTechnologySelected, setIsTechnologySelected] =
    useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const updateMetaData = (technology: string | null) => {
    if (!projectData) return;

    let { title, metadata } = projectData;

    const technologyNames = ["СИП", "Каркас", "Газобетон"];
    technologyNames.forEach((name) => {
      title = title.replace(` из ${name}`, "");
      metadata.title = metadata.title?.replace(` из ${name}`, "") || "";
      metadata.description =
        metadata.description?.replace(` из ${name}`, "") || "";
    });

    if (technology) {
      title = `${title} из ${technology}`;
      metadata.title = title;
      metadata.description = `Yolohaus дом под ключ. ${title}`;
      setIsTechnologySelected(true);
    } else {
      setIsTechnologySelected(false);
    }

    setProjectData((prevData) => ({
      ...prevData!,
      title,
      metadata,
    }));

    setFinalTitle(title);
  };

  useEffect(() => {
    if (!projectData) return;

    if (!intermediateTitle) {
      setIntermediateTitle(projectData.title);
    }

    const currentPath = location.pathname;
    const technologySlugs = ["sip", "karkas", "gazobeton"];
    const selectedTechSlug = technologySlugs.find((slug) =>
      currentPath.endsWith(`-${slug}`)
    );

    const technologyMap = {
      sip: "СИП",
      karkas: "Каркас",
      gazobeton: "Газобетон",
    };

    const technologyName = selectedTechSlug
      ? technologyMap[selectedTechSlug as keyof typeof technologyMap]
      : null;

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

  return {
    loading,
    finalTitle,
    projectData,
    isLoading,
    error,
    isTechnologySelected,
    updateMetaData,
    handleTechnologySelect,
    intermediateTitle,
  };
};
