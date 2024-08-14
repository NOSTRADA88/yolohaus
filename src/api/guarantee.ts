import {fetchData} from "./index";

export const fetchGuaranteePage = () =>
    fetchData("/api/garantiya", "Metadata,Information,Photo");