import {fetchData} from "./index";
import {API_URL, axiosInstanse} from "../constants";
import axios from "axios";

export const fetchBlogPage = (signal: AbortSignal) =>
    fetchData("/api/blog", "posts_list.Media,Metadata", signal);

export const fetchBlogDetailPage = async (blogSlug: string, signal: AbortSignal) => {
    try {
        const response = await axiosInstanse.get(
            `${API_URL}/api/spisok-postov-dlya-blogas?[filters][slug][$eq]=${blogSlug}&populate=Metadata,Media`,
            {signal: signal}
        );
        if (response.status === 200) {
            return response.data.data[0].attributes;
        }
    } catch (error: unknown ) {
        if (axios.isCancel(error)) {
            // TODO убрать console.log на что-нибудь другое вообще все консоль логи
            console.log("запрос отменён: ", error.message)
        } else {
            throw error
        }
    }
};