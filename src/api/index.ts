import { API_URL, axiosInstanse } from "../constants";

export const fetchData = async (endpoint: string, populateParams: string) => {
  console.log("endpoint: ", endpoint);
  const url = `${API_URL}${endpoint}${
    populateParams ? `?populate=${populateParams}` : ""
  }`;
  const response = await axiosInstanse.get(url);
  if (response.status === 200) {
    return response.data.data.attributes;
  }
  throw new Error("no data");
};
