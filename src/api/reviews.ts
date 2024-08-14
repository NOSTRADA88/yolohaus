import {fetchData} from "./index";

export const fetchReviewsPage = () =>
    fetchData("/api/otzyvy", "Metadata,spisok_otzyvovs.Photo");