import { API_URL, axiosInstanse } from "../constants";

const fetchData = async (endpoint: string, populateParams: string) => {
  const url = `${API_URL}${endpoint}${populateParams ? `?populate=${populateParams}` : ""}`;
  const response = await axiosInstanse.get(url);
  if (response.status === 200) {
    return response.data.data.attributes;
  }
  throw new Error("no data")
};

export const fetchHomeData = () =>
  fetchData(
    "/api/glavnaya",
    "About.Photo,About.Information,Greetings.Photo,Metadata,Mortgage.Photos,Recommendations.List.Icon,Recommendations.List.BgPhoto,ContactsMap.WorkTime,PopularCottages.projects.Photos,PopularCottages.projects.Parameters,PopularCottages.projects.Complectation"
  );

export const fetchHeaderFooterData = () =>
  fetchData(
    "/api/glavnaya",
    "Header.Socials.Photo,Header.PhoneNumber,Header.CompanyLogo.Photo,Footer.Socials.Photo,Footer.PhoneNumber,Footer.CompanyLogo.Photo"
  );

export const fetchAboutData = () =>
  fetchData(
      "/api/o-kompanii",
      "Metadata,About.Photo,About.Information"
  );

export const fetchReviewsData = () =>
  fetchData(
      "/api/otzyvy",
      "Metadata,spisok_otzyvovs.Photo"
  );

export const fetchGuaranteeData = () =>
  fetchData(
      "/api/garantiya",
      "Metadata,Information,Photo"
  );

export const fetchVacancyData = () =>
  fetchData(
      "/api/vakansii",
      "Metadata,Vacancies"
  );

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

export const fetchServicesData = () =>
  fetchData(
      "/api/uslugi",
      "Metadata,Services.Photo"
  );

export const fetchServicesDetailsData = async (servicesSlug: string) => {
    const response = await axiosInstanse.get(
      `${API_URL}/api/uslugi?populate[Services][filters][slug][$eq]=${servicesSlug}&populate[Metadata]=*&populate[Services][populate][Card][populate][Photo]=*&populate[Services][populate][Metadata]=*`
    );
    if (response.status === 200) {
      return response.data.data.attributes.Services;
    }
    throw new Error("no service data")
};

export const fetchPrivacyPolicyData = () =>
  fetchData(
      "/api/politika-konfidenczialnosti",
      "Metadata"
  );

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
  throw new Error("no project data")
};

export const fetchStocksData = () =>
  fetchData(
      "/api/akczii",
      "stock_list.Photo,Metadata"
  );

export const fetchBlogData = () =>
  fetchData(
      "/api/blog",
      "posts_list.Media,Metadata"
  );

export const fetchMortgageData = () =>
  fetchData(
      "/api/ipoteka",
      "Metadata,banks_list.Photo,Photo"
  );

export const fetchBlogDetailData = async (blogSlug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/blog?populate[posts_list][filters][slug][$eq]=${blogSlug}&populate[Metadata]=*&populate[posts_list][populate][Metadata]=*&populate[posts_list][populate][Media]=*`
  );
  if (response.status === 200) {
    return response.data.data.attributes.posts_list;
  }
  throw new Error("no blog data")
};

export const fetchAllData = async () => {
  const [
    mainData,
    aboutData,
    projectData,
    reviewsData,
    phoneData,
    mortgageData,
  ] = await Promise.all([
    fetchHomeData(),
    fetchAboutData(),
    fetchProjectsData(),
    fetchReviewsData(),
    fetchHeaderFooterData(),
    fetchMortgageData(),
  ]);
  return {
    mainData,
    aboutData,
    projectData,
    reviewsData,
    phoneData,
    mortgageData,
  };
};
