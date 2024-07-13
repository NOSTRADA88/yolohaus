import { API_URL, axiosInstanse } from "../constants";

export const fetchHomeData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/glavnaya?populate=About.Photo&populate=About.Information&populate=Greetings.Photo&populate=Metadata&populate=Mortgage.Photos&populate=Recommendations.List.Icon&populate=Recommendations.List.BgPhoto&populate=ContactsMap.WorkTime&populate=PopularCottages.projects.Photos&populate=PopularCottages.projects.Parameters&populate=PopularCottages.projects.Complectation`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchHeaderFooterData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/glavnaya?populate=Header.Socials.Photo&&populate=Header.PhoneNumber&populate=Header.CompanyLogo.Photo&populate=Footer.Socials.Photo&&populate=Footer.PhoneNumber&populate=Footer.CompanyLogo.Photo`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchAboutData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/o-kompanii?populate=Metadata&populate=About.Photo&populate=About.Information`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchReviewsData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/otzyvy?populate=Metadata&populate=spisok_otzyvovs.Photo`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchGuaranteeData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/garantiya?populate=Metadata&populate=Information&populate=Photo`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchVacancyData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/vakansii?populate=Metadata&populate=Vacancies`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchProjectsData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/proekty?populate=Metadata&populate=Icons.Photo&populate=ProjectsList.Photos&populate=ProjectsList.Metadata&populate=ProjectsList.Parameters&populate=ProjectsList.Complectation`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchContactData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/kontakty?populate=Metadata&populate=Information.Photo&populate=WorkingTime&populate=Employees.Photo&populate=Productions`
    );
    if (response.status === 200) {
      return response.data.data.attributes;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка запроса`);
  }
};

export const fetchServicesData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/uslugi?populate=Metadata&populate=Services.Photo`
    );
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

export const fetchPrivacyPolicyData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/politika-konfidenczialnosti?populate=Metadata`
    );
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

export const fetchBuiltHousesData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/postroennye-doma?populate=Metadata&populate=BuiltHouses.Metadata&populate=BuiltHouses.Parameters&populate=BuiltHouses.BuildingTechnology&populate=BuiltHouses.Photos&populate=BuiltHouses.YouTube&populate=Icons`
    );
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
