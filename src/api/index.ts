import { API_URL, axiosInstanse } from "../constants";

export const fetchHomeData = async () => {
  try {
    const response = await axiosInstanse.get(
      `${API_URL}/api/glavnaya?populate=About.Photo&populate=About.Information&populate=Greetings.Photo&populate=Metadata&populate=Mortgage.Photos&populate=Recommendations.list.Icon&populate=Recommendations.list.BgPhoto&populate=ContactsMap.WorkTime&populate=PopularCottages.projects.Photos&populate=PopularCottages.projects.Parameters&populate=PopularCottages.projects.Complectation`
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
      `${API_URL}/api/glavnaya?populate=Header.socials.Photo&&populate=Header.PhoneNumber&populate=Header.CompanyLogo.Photo&populate=Footer.socials.Photo&&populate=Footer.PhoneNumber&populate=Footer.CompanyLogo.Photo`
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
      `${API_URL}/api/vakansii?populate=Metadata&populate=vacancies`
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
      `${API_URL}/api/proekty?populate=Metadata&populate=Icons.Photo&populate=spisok_proektovs.Photos&populate=spisok_proektovs.Metadata&populate=spisok_proektovs.Parameters&populate=spisok_proektovs.Complectation`
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
      `${API_URL}/api/kontakty?populate=Metadata&populate=Information.Photo&populate=WorkingTime&populate=employees.Photo&populate=productions`
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
      `${API_URL}/api/uslugi?populate=Metadata&populate=services.Photo`
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
      `${API_URL}/api/uslugi?populate[services][filters][slug][$eq]=${servicesSlug}&populate[Metadata]=*&populate[services][populate][Card][populate][Photo]=*&populate[services][populate][Metadata]=*`
    );
    if (response.status === 200 && response.data.data) {
      return response.data.data.attributes.services;
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
      `${API_URL}/api/postroennye-doma?populate=Metadata&populate=built_houses.Metadata&populate=built_houses.Parameters&populate=built_houses.BuildingTechnology&populate=built_houses.Photos&populate=built_houses.YouTube&populate=Icons`
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
      `${API_URL}/api/postroennye-doma?populate[built_houses][filters][slug][$eq]=${houseSlug}&populate[Metadata]=*&populate[built_houses][populate][Parameters]=*&populate[built_houses][populate][Metadata]=*&populate[built_houses][populate][BuildingTechnology]=*&populate[built_houses][populate][Photos]=*`
    );
    if (response.status === 200) {
      return response.data.data.attributes.built_houses;
    } else {
      throw new Error("Данные не найдены");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Ошибка запроса");
  }
};
