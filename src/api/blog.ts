import {fetchData} from "./index";
import {API_URL, axiosInstanse} from "../constants";

export const fetchBlogPage = () =>
    fetchData("/api/blog", "posts_list.Media,Metadata");

export const fetchBlogDetailPage = async (blogSlug: string) => {
    const response = await axiosInstanse.get(
        `${API_URL}/api/blog?populate[posts_list][filters][slug][$eq]=${blogSlug}&populate[Metadata]=*&populate[posts_list][populate][Metadata]=*&populate[posts_list][populate][Media]=*`
    );
    if (response.status === 200) {
        return response.data.data.attributes.posts_list;
    }
    throw new Error("no blog data");
};