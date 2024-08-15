import { fetchData } from "./index";
import { API_URL, axiosInstanse } from "../constants";

export const fetchServicesPage = () =>
  fetchData("/api/uslugi", "Metadata,Services.Photo");

export const fetchServicesDetailsPage = async (servicesSlug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/uslugi?populate[Services][filters][slug][$eq]=${servicesSlug}&populate[Services][populate][Card][populate][Photo]=*&populate[Services][populate][Metadata]=*`
  );
  if (response.status === 200) {
    return response.data.data.attributes.Services;
  }
  throw new Error("no service data");
};
