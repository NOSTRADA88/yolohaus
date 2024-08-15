import { fetchData } from "./index";

export const fetchAboutPage= () =>
  fetchData("/api/o-kompanii", "Metadata,About.Photo,About.Information");
