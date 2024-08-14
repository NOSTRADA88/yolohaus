import {fetchData} from "./index";

export const fetchStocksPage = () =>
    fetchData("/api/akczii", "stock_list.Photo,Metadata");
