import { useEffect, useState } from "react";
import { ProjectsList } from "../interfaces";
import { fetchProjectsPage } from "../api/projects";

const useProjectsPage = () => {
  const [projectsData, setProjectsData] = useState<ProjectsList>();

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetchProjectsPage();
        setProjectsData({
          title: response.Title,
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          icons: response.Icons.data.map((icon: any) => ({
            url: icon.attributes.Photo.data.attributes.url,
            name: icon.attributes.Photo.data.attributes.name,
          })),
          projects: response.Projects.data.map((project: any) => ({
            id: project.id,
            slug: project.attributes.slug,
            title: project.attributes.Title,
            prices: project.attributes.Complectation.map((price: any) => ({
              basePrice: price.BasePrice,
              standardPrice: price.StandartPrice,
              comfortPrice: price.ComfortPrice,
            })),
            parameters: {
              houseArea: project.attributes.Parameters.HouseArea,
              builtUpArea: project.attributes.Parameters.BuiltUpArea,
              width: project.attributes.Parameters.Width,
              height: project.attributes.Parameters.Height,
              constructionPeriod:
                project.attributes.Parameters.ConstructionPeriod,
              bedrooms: project.attributes.Parameters.Bedrooms,
            },
            photos: project.attributes.Photos.data.map((photo: any) => ({
              url: photo.attributes.url,
              name: photo.attributes.name,
            })),
          })),
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectsData();
  }, []);

  return projectsData;
};

export default useProjectsPage;
