import {
    fetchAboutCompanySlug, fetchBlogSlug, fetchBuiltHousesSlug,
    fetchContactsSlug,
    fetchGuaranteeSlug, fetchMortgageeSlug, fetchPrivacyPolicySlug,
    fetchProjectsSlug,
    fetchReviewsSlug, fetchServicesSlug, fetchStocksSlug,
    fetchVacancySlug
} from "../api";

import {useQuery, UseQueryResult} from "@tanstack/react-query";

interface Slugs {
    about: string;
    reviews: string;
    guarantee: string;
    vacancy: string;
    projects: string;
    contact: string;
    services: string;
    privacy: string;
    built: string;
    stocks: string;
    blog: string;
    mortgage: string;
}

const fetchSlugs = async (): Promise<Slugs> => {
    const [about, reviews, guarantee, vacancy, projects, contact, services, privacy, built, stocks, blog, mortgage] =
        await Promise.all([
            fetchAboutCompanySlug(), fetchReviewsSlug(), fetchGuaranteeSlug(), fetchVacancySlug(), fetchProjectsSlug(),
            fetchContactsSlug(), fetchServicesSlug(), fetchPrivacyPolicySlug(), fetchBuiltHousesSlug(), fetchStocksSlug(),
            fetchBlogSlug(), fetchMortgageeSlug()
        ]);

    return {
        about: about.slug,
        reviews: reviews.slug,
        guarantee: guarantee.slug,
        vacancy: vacancy.slug,
        projects: projects.slug,
        contact: contact.slug,
        services: services.slug,
        privacy: privacy.slug,
        built: built.slug,
        stocks: stocks.slug,
        blog: blog.slug,
        mortgage: mortgage.slug,
    };
};

const useSlugs = (): UseQueryResult<Slugs, Error> => {
    return useQuery<Slugs, Error>({
        queryKey: ['slugs'],
        queryFn: fetchSlugs
    });
};

export {useSlugs };