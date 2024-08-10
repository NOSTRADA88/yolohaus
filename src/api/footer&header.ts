import { fetchData } from "./index";

export const fetchHeaderFooterData = () =>
    fetchData("/api/informacziya", "Socials.Photo,HeaderPhoto,FooterPhoto,Phone,HeaderInfo");

