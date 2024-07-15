import { API_URL, axiosInstanse } from "../constants";

const fetchData = async (endpoint: string, populateParams: string) => {
  try {
    const url = `${API_URL}${endpoint}${
      populateParams ? `?populate=${populateParams}` : ""
    }`;
    const response = await axiosInstanse.get(url);
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Ошибка запроса");
  }
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
  fetchData("/api/o-kompanii", "Metadata,About.Photo,About.Information");

export const fetchReviewsData = () =>
  fetchData("/api/otzyvy", "Metadata,spisok_otzyvovs.Photo");

export const fetchGuaranteeData = () =>
  fetchData("/api/garantiya", "Metadata,Information,Photo");

export const fetchVacancyData = () =>
  fetchData("/api/vakansii", "Metadata,Vacancies");

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
  fetchData("/api/uslugi", "Metadata,Services.Photo");

export const fetchServicesDetailsData = async (servicesSlug: string) => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/uslugi?populate[Services][filters][slug][$eq]=${servicesSlug}&populate[Metadata]=*&populate[Services][populate][Card][populate][Photo]=*&populate[Services][populate][Metadata]=*`
    );
    if (response.status === 200 && response.data.data) {
      return response.data.data.attributes.Services;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.error("Ошибка запроса:", error);
    throw new Error("Ошибка запроса");
  }
};

export const fetchPrivacyPolicyData = () =>
  fetchData("/api/politika-konfidenczialnosti", "Metadata");

export const fetchBuiltHousesData = () =>
  fetchData(
    "/api/postroennye-doma",
    "Metadata,BuiltHouses.Metadata,BuiltHouses.Parameters,BuiltHouses.BuildingTechnology,BuiltHouses.Photos,BuiltHouses.YouTube,Icons"
  );

export const fetchHousesDetailsData = async (houseSlug: string) => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/postroennye-doma?populate[BuiltHouses][filters][slug][$eq]=${houseSlug}&populate[Metadata]=*&populate[BuiltHouses][populate][Parameters]=*&populate[BuiltHouses][populate][Metadata]=*&populate[BuiltHouses][populate][BuildingTechnology]=*&populate[BuiltHouses][populate][Photos]=*`
    );
    if (response.status === 200) {
      return response.data.data.attributes.BuiltHouses;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Ошибка запроса");
  }
};

export const fetchProjectDetailData = async (projetsSlug: string) => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/proekty?populate[ProjectsList][filters][slug][$eq]=${projetsSlug}&populate[Metadata]=*&populate[ProjectsList][populate][Parameters]=*&populate[ProjectsList][populate][Metadata]=*&populate[ProjectsList][populate][Complectation][populate]=Slug,Metadata,complectations.Equipment,DescriptionList&populate[ProjectsList][populate][Photos]=*`
    );
    if (response.status === 200) {
      return response.data.data.attributes.ProjectsList;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Ошибка запроса");
  }
};

export const fetchAllData = async () => {
  const [mainData, aboutData, projectData, reviewsData, phoneData] =
    await Promise.all([
      fetchHomeData(),
      fetchAboutData(),
      fetchProjectsData(),
      fetchReviewsData(),
      fetchHeaderFooterData(),
    ]);
  return { mainData, aboutData, projectData, reviewsData, phoneData };
};
