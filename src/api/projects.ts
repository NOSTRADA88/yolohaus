import { fetchData } from ".";
import { API_URL, axiosInstanse } from "../constants";

export const fetchProjectsPage = () =>
  fetchData(
    "/api/proekty",
    "Metadata,Icons.Photo,Projects.Photos,Projects.Metadata,Projects.Parameters,Projects.Complectation"
  );

export const fetchProjectDetailData = async (slug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/spisok-proektovs?[filters][slug][$eq]=${slug}&populate=Metadata,Photos,Parameters,ShortDescription,Description&populate=Complectation.Metadata,Complectation.Slug,Complectation.complectations.Equipment,Complectation.TechnologyDescription`
  );
  if (response.status === 200) {
    return response.data.data[0].attributes;
  }
  throw new Error("no project data");
};
