import { fetchData } from ".";
import { API_URL, axiosInstanse } from "../constants";

export const fetchBuiltHousesData = () =>
  fetchData(
    "/api/postroennye-doma",
    "Metadata,BuiltHouses.Metadata,BuiltHouses.Parameters,BuiltHouses.BuildingTechnology,BuiltHouses.Photos,BuiltHouses.YouTube,Icons"
  );

export const fetchHousesDetailsData = async (houseSlug: string) => {
  const response = await axiosInstanse.get(
    `${API_URL}/api/spisok-postroennyh-domovs?[filters][slug][$eq]=${houseSlug}&populate=Metadata,Parameters,BuildingTechnology,Photos`
  );
  if (response.status === 200) {
    return response.data.data[0].attributes;
  }
  throw new Error("no house data");
};
