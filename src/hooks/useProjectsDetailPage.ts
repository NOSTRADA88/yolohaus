import { useEffect, useState } from "react";
import { fetchProjectDetailData } from "../api/projects";
import { Project, ProjectsDetailProps } from "../interfaces";

const useProjectsDetailPage = ({ projectsSlug }: ProjectsDetailProps) => {
  const [projectData, setProjectData] = useState<Project | null>();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetchProjectDetailData(projectsSlug);
        setProjectData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          slug: response.slug,
          title: response.Title,
          photo: response.Photos.data.map((photo: any) => ({
            name: photo.attributes.name,
            url: photo.attributes.url,
          })),
          shortDescription: response.ShortDescription,
          description: response.Description,
          parameters: {
            houseArea: response.Parameters.HouseArea,
            builtUpArea: response.Parameters.BuiltUpArea,
            width: response.Parameters.Width,
            height: response.Parameters.Height,
            constructionPeriod: response.Parameters.ConstructionPeriod,
            bedrooms: response.Parameters.ConstructionPeriod,
            toilets: response.Parameters.Toilets,
            terraceAndPorchArea: response.Parameters.TerraceAndPorchArea,
            floors: response.Parameters.Floors,
            kitchenLivingRoomArea: response.Parameters.KitchenLivingRoomArea,
          },
          kits: response.Complectation.map((kit: any) => ({
            basePrice: kit.BasePrice,
            standardPrice: kit.StandartPrice,
            comfortPrice: kit.ComfortPrice,
            bundles: kit.complectations.data.flatMap((complectation: any) =>
              complectation.attributes.Equipment.map((equipment: any) => ({
                type: equipment.Type,
                description: equipment.Description.map((desc: any) => ({
                  type: desc.type,
                  children: desc.children.map((child: any) => ({
                    bold: child.bold,
                    text: child.text,
                    type: child.type,
                  })),
                })),
                name: complectation.attributes.NameForStrapi,
              }))
            ),
            slug:
              typeof kit.Slug === "string"
                ? kit.Slug
                : kit.Slug.BuildingTechnology,
            metaTitle: kit.Metadata.MetaTitle,
            metaDescription: kit.Metadata.metaDescription,
          })),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjectData();
  }, [projectsSlug]);

  return { projectData, setProjectData };
};

export default useProjectsDetailPage;
