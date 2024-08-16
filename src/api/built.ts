import { fetchData } from ".";
import { API_URL, axiosInstanse } from "../constants";
import axios from "axios";

export const fetchBuiltHousesData = (signal: AbortSignal) =>
  fetchData(
    "/api/postroennye-doma",
    "Metadata,BuiltHouses.Metadata,BuiltHouses.Parameters,BuiltHouses.BuildingTechnology,BuiltHouses.Photos,BuiltHouses.YouTube,Icons",
      signal
  );

export const fetchHousesDetailsData = async (houseSlug: string, signal: AbortSignal) => {
  try {
    const response = await axiosInstanse.get(
        `${API_URL}/api/spisok-postroennyh-domovs?[filters][slug][$eq]=${houseSlug}&populate=Metadata,Parameters,BuildingTechnology,Photos`
    );
    if (response.status === 200) {
      return response.data.data[0].attributes;
    }
  } catch (error: unknown) {
    if (axios.isCancel(error)) {
      // TODO убрать console.log на что-нибудь другое вообще все консоль логи
      console.log("запрос отменён: ", error.message)
    } else {
      throw error
    }
  }

  throw new Error("no house data");
};
