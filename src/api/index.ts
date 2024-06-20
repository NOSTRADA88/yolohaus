
import { API_URL, axiosInstanse } from "../constants";


export const fetchHomeData = async () => {
    try {
      const response = await axiosInstanse.get(`${API_URL}/api/glavnaya?populate=About.Photo&populate=About.Information&populate=Greetings.Photo&populate=Metadata&populate=Mortgage.Photos&populate=Recommendations.list.Icon&populate=Recommendations.list.BgPhoto`);
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
      const response = await axiosInstanse.get(`${API_URL}/api/glavnaya?populate=HeaderFooter.socials.Photo&&populate=HeaderFooter.PhoneNumber&populate=HeaderFooter.CompanyLogo.Photo`);
      if (response.status === 200) {
        return response.data.data.attributes.HeaderFooter;
      } else {
        throw new Error('Данные не найдены');
      }
    } catch (error) {
        console.log(error);
      throw new Error(`Ошибка запроса`);
    }
  };