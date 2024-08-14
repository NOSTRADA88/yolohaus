import { fetchData } from "./index";

export const fetchAboutData = () =>
  fetchData("/api/o-kompanii", "Metadata,About.Photo,About.Information");
