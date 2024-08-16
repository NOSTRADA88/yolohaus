import {fetchData} from "./index";

export const fetchGuaranteePage = (signal: AbortSignal) =>
    fetchData("/api/garantiya", "Metadata,Information,Photo", signal);