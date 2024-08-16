import { fetchData } from ".";
import { API_URL, axiosInstanse } from "../constants";
import axios from "axios";

export const fetchProjectsPage = (signal: AbortSignal) =>
  fetchData(
    "/api/proekty",
    "Metadata,Icons.Photo,Projects.Photos,Projects.Metadata,Projects.Parameters,Projects.Complectation",
      signal
  );

export const fetchProjectDetailData = async (slug: string, signal: AbortSignal) => {
  try {
    const response = await axiosInstanse.get(
        `${API_URL}/api/spisok-proektovs?[filters][slug][$eq]=${slug}&populate=Metadata,Photos,Parameters,ShortDescription,Description&populate=Complectation.Metadata,Complectation.Slug,Complectation.complectations.Equipment,Complectation.TechnologyDescription`,
        {signal: signal}
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
};
