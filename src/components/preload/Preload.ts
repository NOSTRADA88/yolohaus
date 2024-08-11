import {API_URL} from "../../constants";

export const addPreloadLink = (url: string): void => {
    const link: HTMLLinkElement = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `${API_URL}${url}`;
    document.head.appendChild(link);
};