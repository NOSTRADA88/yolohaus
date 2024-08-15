import { fetchData } from ".";
import { API_URL, axiosInstanse } from "../constants";

export const fetchProjectsPage = () =>
  fetchData(
    "/api/proekty",
    "Metadata,Icons.Photo,Projects.Photos,Projects.Metadata,Projects.Parameters,Projects.Complectation"
  );

export const fetchProjectDetailData = async (projectsSlug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/proekty?populate[ProjectsList][filters][slug][$eq]=${projectsSlug}&populate[Metadata]=*&populate[ProjectsList][populate][Parameters]=*&populate[ProjectsList][populate][Metadata]=*&populate[ProjectsList][populate][Complectation][populate]=Slug,Metadata,complectations.Equipment,DescriptionList&populate[ProjectsList][populate][Photos]=*`
  );
  if (response.status === 200) {
    return response.data.data.attributes.ProjectsList;
  }
  throw new Error("no project data");
};
