
import { API_URL, axiosInstanse } from "../constants";


export const fetchHomeData = async () => {
    try {
      const response = await axiosInstanse.get(`${API_URL}/api/glavnaya?populate=About.Photo&populate=About.Information&populate=Greetings.Photo&populate=Metadata&populate=Mortgage.Photos&populate=Recommendations.list.Icon&populate=Recommendations.list.BgPhoto&populate=ContactsMap.WorkTime&populate=PopularCottages.projects.Photos&populate=PopularCottages.projects.Parameters&populate=PopularCottages.projects.Complectation`);
      if (response.status === 200) {
        return response.data.data.attributes;
      } else {
        throw new Error('Данные не найдены');
      }
    } catch (error) {
        console.log(error);
      throw new Error(`Ошибка запроса`);
    }
  };


  export const fetchHeaderFooterData = async () => {
    try {
      const response = await axiosInstanse.get(`${API_URL}/api/glavnaya?populate=Header.socials.Photo&&populate=Header.PhoneNumber&populate=Header.CompanyLogo.Photo&populate=Footer.socials.Photo&&populate=Footer.PhoneNumber&populate=Footer.CompanyLogo.Photo`);
      if (response.status === 200) {
        return response.data.data.attributes;
      } else {
        throw new Error('Данные не найдены');
      }
    } catch (error) {
        console.log(error);
      throw new Error(`Ошибка запроса`);
    }
  };