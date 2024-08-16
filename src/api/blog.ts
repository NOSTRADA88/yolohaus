import {fetchData} from "./index";
import {API_URL, axiosInstanse} from "../constants";

export const fetchBlogPage = () =>
    fetchData("/api/blog", "posts_list.Media,Metadata");

export const fetchBlogDetailPage = async (blogSlug: string) => {
    const response = await axiosInstanse.get(
        `${API_URL}/api/spisok-postov-dlya-blogas?[filters][slug][$eq]=${blogSlug}&populate=Metadata,Media`
    );
    if (response.status === 200) {
        return response.data.data[0].attributes;
    }
    throw new Error("no blog data");
};