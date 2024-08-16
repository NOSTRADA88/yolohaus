import { API_URL, axiosInstanse } from "../constants";
import axios from "axios";

export const fetchData = async (endpoint: string, populateParams: string, signal?: AbortSignal) => {
  console.log("endpoint: ", endpoint);
  const url = `${API_URL}${endpoint}${
    populateParams ? `?populate=${populateParams}` : ""
  }`;
  try {
    const response = await axiosInstanse.get(url, {
      signal: signal,
    });
    if (response.status === 200) {
      return response.data.data.attributes;
    }
  } catch (error: unknown ) {
    if (axios.isCancel(error)) {
      console.log("запрос отменён: ", error.message)
    } else {
      throw error
    }
  }
};
