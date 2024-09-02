import { fetchData } from "./index";
import { API_URL, axiosInstanse } from "../constants";
import axios from "axios";

export const fetchServicesPage = (signal: AbortSignal) =>
  fetchData("/api/uslugi", "Metadata,Services.Photo", signal);

export const fetchServicesDetailsPage = async (servicesSlug: string, signal: AbortSignal) => {
  try {
    const response = await axiosInstanse.get(
        `${API_URL}/api/uslugi?populate[Services][filters][slug][$eq]=${servicesSlug}&populate[Services][populate][Card][populate][Photo]=*&populate[Services][populate][Metadata]=*`,
        {signal: signal}
    );
    if (response.status === 200) {
      return response.data.data.attributes.Services;
    }
  } catch (error: unknown) {
    if (axios.isCancel(error)) {
      throw error.message
    } else {
      throw error
    }
  }
};
