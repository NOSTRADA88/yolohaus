import { API_URL, axiosInstanse } from "../constants";

export const fetchData = async (endpoint: string, populateParams: string) => {
  console.log("endpoint: ", endpoint)
  const url = `${API_URL}${endpoint}${
    populateParams ? `?populate=${populateParams}` : ""
  }`;
  const response = await axiosInstanse.get(url);
  if (response.status === 200) {
    return response.data.data.attributes;
  }
  throw new Error("no data");
};

export const fetchHomeData = () =>
  fetchData(
    "/api/glavnaya",
    "About.Photo,About.Information,Greetings.Photo,Metadata,Mortgage.Photos,Recommendations.List.Icon,Recommendations.List.BgPhoto,ContactsMap.WorkTime,PopularCottages.Projects.Photos,PopularCottages.projects.Parameters,PopularCottages.projects.Complectation"
  );

export const fetchAboutData = () =>
  fetchData("/api/o-kompanii", "Metadata,About.Photo,About.Information");

export const fetchProjectsData = () =>
  fetchData(
    "/api/proekty",
    "Metadata,Icons.Photo,ProjectsList.Photos,ProjectsList.Metadata,ProjectsList.Parameters,ProjectsList.Complectation"
  );



export const fetchContactData = () =>
  fetchData(
    "/api/kontakty",
    "Metadata,Information.Photo,WorkingTime,Employees.Photo,Productions"
  );



export const fetchPrivacyPolicyPage = () =>
  fetchData("/api/politika-konfidenczialnosti", "Metadata");

export const fetchBuiltHousesData = () =>
  fetchData(
    "/api/postroennye-doma",
    "Metadata,BuiltHouses.Metadata,BuiltHouses.Parameters,BuiltHouses.BuildingTechnology,BuiltHouses.Photos,BuiltHouses.YouTube,Icons"
  );

export const fetchHousesDetailsData = async (houseSlug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/postroennye-doma?populate[BuiltHouses][filters][slug][$eq]=${houseSlug}&populate[Metadata]=*&populate[BuiltHouses][populate][Parameters]=*&populate[BuiltHouses][populate][Metadata]=*&populate[BuiltHouses][populate][BuildingTechnology]=*&populate[BuiltHouses][populate][Photos]=*`
  );
  if (response.status === 200) {
    return response.data.data.attributes.BuiltHouses;
  }
  throw new Error("no house data");
};

export const fetchProjectDetailData = async (projectsSlug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/proekty?populate[ProjectsList][filters][slug][$eq]=${projectsSlug}&populate[Metadata]=*&populate[ProjectsList][populate][Parameters]=*&populate[ProjectsList][populate][Metadata]=*&populate[ProjectsList][populate][Complectation][populate]=Slug,Metadata,complectations.Equipment,DescriptionList&populate[ProjectsList][populate][Photos]=*`
  );
  if (response.status === 200) {
    return response.data.data.attributes.ProjectsList;
  }
  throw new Error("no project data");
};
