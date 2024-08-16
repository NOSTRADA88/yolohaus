import { fetchData } from "./index";

export const fetchAboutPage= (signal: AbortSignal) =>
  fetchData("/api/o-kompanii", "Metadata,About.Photo,About.Information", signal);
