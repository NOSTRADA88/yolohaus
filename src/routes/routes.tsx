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
  Contact,
  Guarantee,
  Home,
  Reviews,
  ServiceDetail,
  Services,
  Vacancy,
  PrivacyPolicy,
} from "../page";

import { Suspense, useEffect, useState } from "react";
import {
  fetchAboutData,
  fetchBuiltHousesData,
  fetchContactData,
  fetchGuaranteeData,
  fetchPrivacyPolicyData,
  fetchProjectsData,
  fetchReviewsData,
  fetchServicesData,
  fetchVacancyData,
} from "../api";
import ScrollToTop from "../components/ScrollToTop";
import { Projects } from "../page/project";
import { BuiltHouses } from "../page/built";

import { ErrorPage } from "../page/error";
import React from "react";

const useRoutes = () => {
  const HouseDetail = React.lazy(() => import("../page/built/HouseDetail"));
  const ProjectsDetail = React.lazy(
    () => import("../page/project/ProjectsDetail")
  );
  const [slugAbout, setSlugAbout] = useState<string>("");
  const [slugReviews, setSlugReviews] = useState<string>("");
  const [slugGuarantee, setSlugGuarantee] = useState<string>("");
  const [slugVacancy, setSlugVacancy] = useState<string>("");
  const [slugProjects, setSlugProjects] = useState<string>("");
  const [slugContact, setSlugContact] = useState<string>("");
  const [slugServices, setSlugServices] = useState<string>("");
  const [slugPrivacy, setSlugPrivacy] = useState<string>("");
  const [slugBuilt, setSlugBuilt] = useState<string>("");

  const fetchData = async () => {
    try {
      const aboutData = await fetchAboutData();
      const reviewsData = await fetchReviewsData();
      const guaranteeData = await fetchGuaranteeData();
      const vacancyData = await fetchVacancyData();
      const projectsData = await fetchProjectsData();
      const contactData = await fetchContactData();
      const servicesData = await fetchServicesData();
      const privacyData = await fetchPrivacyPolicyData();
      const builtData = await fetchBuiltHousesData();

      setSlugAbout(aboutData.slug);
      setSlugReviews(reviewsData.slug);
      setSlugGuarantee(guaranteeData.slug);
      setSlugVacancy(vacancyData.slug);
      setSlugProjects(projectsData.slug);
      setSlugContact(contactData.slug);
      setSlugServices(servicesData.slug);
      setSlugPrivacy(privacyData.slug);
      setSlugBuilt(builtData.slug);
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
      <Suspense fallback={<div>Loading...</div>}>
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
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsDetail
          projectsSlug={projectsSlug}
          initialTechnology={isTechnology ? technologySlug : undefined}
        />
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
          path={`/${slugAbout}`}
          element={
            <Layout>
              <AboutCompany />
            </Layout>
          }
        />
        <Route
          path={`/${slugReviews}`}
          element={
            <Layout>
              <Reviews />
            </Layout>
          }
        />
        <Route
          path={`/${slugGuarantee}`}
          element={
            <Layout>
              <Guarantee />
            </Layout>
          }
        />
        <Route
          path={`/${slugVacancy}`}
          element={
            <Layout>
              <Vacancy />
            </Layout>
          }
        />
        <Route
          path={`/${slugProjects}`}
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
        <Route
          path={`/${slugProjects}/:slug`}
          element={
            <Layout>
              <ProjectsDetailRoute />
            </Layout>
          }
        />

        <Route
          path={`/${slugContact}`}
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path={`/${slugServices}`}
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path={`/${slugServices}/:slug`}
          element={
            <Layout>
              <ServiceDetailRoute />
            </Layout>
          }
        />
        <Route
          path={`/${slugPrivacy}`}
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route
          path={`/${slugBuilt}`}
          element={
            <Layout>
              <BuiltHouses />
            </Layout>
          }
        />
        <Route
          path={`/${slugBuilt}/:slug`}
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
      </Routes>
    </BrowserRouter>
  );
};

export default useRoutes;
