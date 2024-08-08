import { lazy, Suspense, FC } from "react";
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import Layout from "../layouts/layout";
import ScrollToTop from "../components/ScrollToTop";

import {
  fetchAboutData,
  fetchBlogData, fetchBlogDetailData,
  fetchBuiltHousesData,
  fetchContactData,
  fetchGuaranteeData, fetchHousesDetailsData,
  fetchMortgageData,
  fetchPrivacyPolicyData, fetchProjectDetailData,
  fetchProjectsData,
  fetchReviewsData,
  fetchServicesData, fetchServicesDetailsData,
  fetchStocksData,
  fetchVacancyData,
} from "../api";
import { Home, ErrorPage } from "../page";

const AboutCompany = lazy(() => import("../page/about/AboutCompany").then(module => ({default: module.AboutCompany})));
const Reviews = lazy(() => import("../page/reviews/Reviews").then(module => ({default: module.Reviews})));
const Guarantee = lazy(() => import("../page/about/Guarantee").then(module => ({default: module.Guarantee})));
const Vacancy = lazy(() => import("../page/about/Vacancy").then(module => ({default: module.Vacancy})));
const Projects = lazy(() => import("../page/project/Projects").then(module => ({default: module.Projects})));
const Contact = lazy(() => import("../page/contact/Contact").then(module => ({default: module.Contact})));
const Services = lazy(() => import("../page/services/Services").then(module => ({default: module.Services})));
const PrivacyPolicy = lazy(() => import("../page/privacy&policy/PrivacyPolicy").then(module => ({default: module.PrivacyPolicy})));
const BuiltHouses = lazy(() => import("../page/built/BuiltHouses").then(module => ({default: module.BuiltHouses})));
const Stocks = lazy(() => import("../page/stocks/Stocks").then(module => ({default: module.Stocks})));
const Blog = lazy(() => import("../page/blog/Blog").then(module => ({default: module.Blog})));
const MortgageAbout = lazy(() => import("../page/mortage/MortgageAbout").then(module => ({default: module.MortgageAbout})));
const ServiceDetail = lazy(() => import("../page/services/ServiceDetail").then(module => ({default: module.ServiceDetail})));
const HouseDetail = lazy(() => import("../page/built/HouseDetail").then(module => ({default: module.HouseDetail})));
const ProjectsDetail = lazy(() => import("../page/project/ProjectsDetail").then(module => ({default: module.ProjectsDetail})));
const BlogDetail = lazy(() => import("../page/blog/BlogDetail").then(module => ({default: module.BlogDetail})));

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
        fetchAboutData(), fetchReviewsData(), fetchGuaranteeData(), fetchVacancyData(), fetchProjectsData(),
        fetchContactData(), fetchServicesData(), fetchPrivacyPolicyData(), fetchBuiltHousesData(), fetchStocksData(),
        fetchBlogData(), fetchMortgageData()
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

const RoutesComponent: FC = () => {
  const { data: slugs } = useSlugs();

  if (!slugs) {
    return (
        <div>
          Loading...
        </div>
    )
  }

  return (
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={"/"} element={<Layout><Home /></Layout>} />
            <Route path={`/${slugs.about}`} element={<Layout><AboutCompany /></Layout>} />
            <Route path={`/${slugs.reviews}`} element={<Layout><Reviews /></Layout>} />
            <Route path={`/${slugs.guarantee}`} element={<Layout><Guarantee /></Layout>} />
            <Route path={`/${slugs.vacancy}`} element={<Layout><Vacancy /></Layout>} />
            <Route path={`/${slugs.projects}`} element={<Layout><Projects /></Layout>} />
            <Route path={`/${slugs.projects}/:slug`} element={<Layout><ProjectsDetailRoute /></Layout>} />
            <Route path={`/${slugs.contact}`} element={<Layout><Contact /></Layout>} />
            <Route path={`/${slugs.services}`} element={<Layout><Services /></Layout>} />
            <Route path={`/${slugs.services}/:slug`} element={<Layout><ServiceDetailRoute /></Layout>} />
            <Route path={`/${slugs.privacy}`} element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path={`/${slugs.built}`} element={<Layout><BuiltHouses /></Layout>} />
            <Route path={`/${slugs.built}/:slug`} element={<Layout><HouseDetailRoute /></Layout>} />
            <Route path={`/${slugs.stocks}`} element={<Layout><Stocks /></Layout>} />
            <Route path={`/${slugs.blog}`} element={<Layout><Blog /></Layout>} />
            <Route path={`/${slugs.blog}/:slug`} element={<Layout><BlogDetailRoute /></Layout>} />
            <Route path={`/${slugs.mortgage}`} element={<Layout><MortgageAbout /></Layout>} />
            <Route path={"/*"} element={<Layout><ErrorPage /></Layout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}

const ServiceDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data } = useQuery({
    queryKey: ['serviceDetail', slug],
    queryFn: () => fetchServicesDetailsData(slug ?? ""),
    enabled: !!slug
  });

  return <ServiceDetail servicesSlug={slug ?? ""} />;
};

const HouseDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useQuery({
    queryKey: ['houseDetail', slug],
    queryFn: () => fetchHousesDetailsData(slug ?? ""),
    enabled: !!slug
  })

  return <HouseDetail houseSlug={slug ?? ""} />;
};

const ProjectsDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const urlParts = location.pathname.split("/").pop()?.split("-") || [];
  const technologySlug = urlParts[urlParts.length - 1];
  const baseProjectSlug = urlParts.slice(0, -1).join("-");
  const isTechnology = ["sip", "karkas", "gazobeton"].includes(technologySlug);
  const projectsSlug = isTechnology ? baseProjectSlug : slug ?? '';

  const { data } = useQuery({
    queryKey: ['projectsDetail', projectsSlug],
    queryFn: () => fetchProjectDetailData(projectsSlug),
    enabled: !!projectsSlug
  });

  return (
      <ProjectsDetail projectsSlug={projectsSlug} initialTechnology={isTechnology ? technologySlug : undefined} />
  );
};

const BlogDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useQuery({
    queryKey: ['blogDetail', slug],
    queryFn: () => fetchBlogDetailData(slug ?? ""),
    enabled: !!slug
  });

  return <BlogDetail blogSlug={slug ?? ""}/>;
};


export default RoutesComponent;
