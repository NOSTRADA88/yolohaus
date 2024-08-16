import {fetchData} from "./index";

export const fetchReviewsPage = (signal: AbortSignal) =>
    fetchData("/api/otzyvy", "Metadata,spisok_otzyvovs.Photo", signal);