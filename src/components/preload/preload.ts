export const addPreloadLink = (apiURL: string, url: string): void => {
    const link: HTMLLinkElement = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `${apiURL}${url}`;
    document.head.appendChild(link);
};