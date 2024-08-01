import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Layout from "../layouts/layout";
import {
  AboutCompany,
  Guarantee,
  Vacancy,
  Blog,
  BuiltHouses,
  Contact,
  ErrorPage,
  Home,
  PrivacyPolicy,
  Projects,
  Reviews,
  ServiceDetail,
  Services,
  Stocks,
  BlogDetail,
  MortgageAbout,
} from "../page";

import { Suspense, useEffect, useState } from "react";

import {
  fetchAboutData,
  fetchBlogData,
  fetchBuiltHousesData,
  fetchContactData,
  fetchGuaranteeData,
  fetchMortgageData,
  fetchPrivacyPolicyData,
  fetchProjectsData,
  fetchReviewsData,
  fetchServicesData,
  fetchStocksData,
  fetchVacancyData,
} from "../api";

import ScrollToTop from "../components/ScrollToTop";
import React from "react";

const useRoutes = () => {
  const HouseDetail = React.lazy(() =>
    import("../page/built/HouseDetail").then((module) => ({
      default: module.HouseDetail,
    }))
  );
  const ProjectsDetail = React.lazy(() =>
    import("../page/project/ProjectsDetail").then((module) => ({
      default: module.ProjectsDetail,
    }))
  );

  const [slugs, setSlugs] = useState({
    about: "",
    reviews: "",
    guarantee: "",
    vacancy: "",
    projects: "",
    contact: "",
    services: "",
    privacy: "",
    built: "",
    stocks: "",
    blog: "",
    mortgage: "",
  });

  const fetchData = async () => {
    try {
      const fetchFunctions = [
        fetchAboutData,
        fetchReviewsData,
        fetchGuaranteeData,
        fetchVacancyData,
        fetchProjectsData,
        fetchContactData,
        fetchServicesData,
        fetchPrivacyPolicyData,
        fetchBuiltHousesData,
        fetchStocksData,
        fetchBlogData,
        fetchMortgageData,
      ];

      const data = await Promise.all(fetchFunctions.map((func) => func()));
      const newSlugs = {
        about: data[0].slug,
        reviews: data[1].slug,
        guarantee: data[2].slug,
        vacancy: data[3].slug,
        projects: data[4].slug,
        contact: data[5].slug,
        services: data[6].slug,
        privacy: data[7].slug,
        built: data[8].slug,
        stocks: data[9].slug,
        blog: data[10].slug,
        mortgage: data[11].slug,
      };

      setSlugs(newSlugs);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ServiceDetailRoute = () => {
    const { slug } = useParams<{ slug: string }>();
    const servicesSlug = slug || "";

    return <ServiceDetail servicesSlug={servicesSlug} />;
  };

  const HouseDetailRoute = () => {
    const { slug } = useParams<{ slug: string }>();
    const houseSlug = slug ?? "";

    return (
      <Suspense>
        <HouseDetail houseSlug={houseSlug} />
      </Suspense>
    );
  };

  const ProjectsDetailRoute = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();

    const urlParts = location.pathname.split("/").pop()?.split("-") || [];
    const technologySlug = urlParts[urlParts.length - 1];
    const baseProjectSlug = urlParts.slice(0, -1).join("-");

    const isTechnology = ["sip", "karkas", "gazobeton"].includes(
      technologySlug
    );
    const projectsSlug = isTechnology ? baseProjectSlug : slug || "";

    return (
      <Suspense>
        <ProjectsDetail
          projectsSlug={projectsSlug}
          initialTechnology={isTechnology ? technologySlug : undefined}
        />
      </Suspense>
    );
  };

  const BlogDetailRoute = () => {
    const { slug } = useParams<{ slug: string }>();
    const blogSlug = slug ?? "";

    return (
      <Suspense>
        <BlogDetail blogSlug={blogSlug} />
      </Suspense>
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.about}`}
          element={
            <Layout>
              <AboutCompany />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.reviews}`}
          element={
            <Layout>
              <Reviews />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.guarantee}`}
          element={
            <Layout>
              <Guarantee />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.vacancy}`}
          element={
            <Layout>
              <Vacancy />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.projects}`}
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.projects}/:slug`}
          element={
            <Layout>
              <ProjectsDetailRoute />
            </Layout>
          }
        />

        <Route
          path={`/${slugs.contact}`}
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.services}`}
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.services}/:slug`}
          element={
            <Layout>
              <ServiceDetailRoute />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.privacy}`}
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.built}`}
          element={
            <Layout>
              <BuiltHouses />
            </Layout>
          }
        />
        <Route
          path={`/${slugs.built}/:slug`}
          element={
            <Layout>
              <HouseDetailRoute />
            </Layout>
          }
        />
        <Route
          path="/:random"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        ></Route>
        <Route
          path={`/${slugs.stocks}`}
          element={
            <Layout>
              <Stocks />
            </Layout>
          }
        ></Route>
        <Route
          path={`/${slugs.blog}`}
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        ></Route>
        <Route
          path={`/${slugs.blog}/:slug`}
          element={
            <Layout>
              <BlogDetailRoute />
            </Layout>
          }
        ></Route>
        <Route
          path={`/${slugs.mortgage}`}
          element={
            <Layout>
              <MortgageAbout />
            </Layout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default useRoutes;
