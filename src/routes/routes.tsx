import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import Layout from "../layouts/layout";
import ScrollToTop from "../components/ScrollToTop";
import {
  Home,
  ErrorPage,
  Reviews,
  AboutCompany,
  Guarantee,
  Vacancy,
  Projects,
  Contact,
  Services,
  PrivacyPolicy,
  Stocks,
  Blog,
  MortgageAbout,
  ServiceDetail,
  BlogDetail,
  ProjectsDetail,
} from "../page";
import { slug } from "../constants";

// const BuiltHouses = lazy(() =>
//   import("../page/built/Houses").then((module) => ({ default: module.Houses }))
// );

// const HouseDetail = lazy(() =>
//   import("../page/built/HousesDetail").then((module) => ({
//     default: module.HousesDetail,
//   }))
// );

const RoutesComponent = () => {
  // if (!slugs) {
  //   return (
  //     <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
  //       <div className="flex justify-center items-center mt-8 mb-8">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={slug.main}
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path={slug.about}
          element={
            <Layout>
              <AboutCompany />
            </Layout>
          }
        />
        <Route
          path={slug.reviews}
          element={
            <Layout>
              <Reviews />
            </Layout>
          }
        />
        <Route
          path={slug.guarantee}
          element={
            <Layout>
              <Guarantee />
            </Layout>
          }
        />
        <Route
          path={slug.vacancies}
          element={
            <Layout>
              <Vacancy />
            </Layout>
          }
        />
        <Route
          path={slug.projects}
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
        <Route
          path={slug.contact}
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path={slug.services}
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path={slug.privacy}
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        {/* <Route
          path={slug.built}
          element={
            <Layout>
              <BuiltHouses />
            </Layout>
          }
        /> */}
        <Route
          path={slug.stocks}
          element={
            <Layout>
              <Stocks />
            </Layout>
          }
        />
        <Route
          path={slug.blog}
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path={slug.mortgage}
          element={
            <Layout>
              <MortgageAbout />
            </Layout>
          }
        />
        <Route
          path={`${slug.blog}/:slug`}
          element={
            <Layout>
              <BlogDetailRoute />
            </Layout>
          }
        />
        {/* <Route
          path={`${slug.built}/:slug`}
          element={
            <Layout>
              <HouseDetailRoute />
            </Layout>
          }
        /> */}
        <Route
          path={`${slug.services}/:slug`}
          element={
            <Layout>
              <ServiceDetailRoute />
            </Layout>
          }
        />
        <Route
          path={`${slug.projects}/:slug`}
          element={
            <Layout>
              <ProjectsDetailRoute />
            </Layout>
          }
        />
        <Route
          path={"/*"}
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const ServiceDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServiceDetail servicesSlug={slug ?? ""} />;
};

// const HouseDetailRoute = () => {
//   const { slug } = useParams<{ slug: string }>();
//   return <HouseDetail houseSlug={slug ?? ""} />;
// };

const ProjectsDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const urlParts = location.pathname.split("/").pop()?.split("-") || [];
  const technologySlug = urlParts[urlParts.length - 1];
  const baseProjectSlug = urlParts.slice(0, -1).join("-");
  const isTechnology = ["sip", "karkas", "gazobeton"].includes(technologySlug);
  const projectsSlug = isTechnology ? baseProjectSlug : slug ?? "";
  return (
    <ProjectsDetail
      projectsSlug={projectsSlug}
      initialTechnology={isTechnology ? technologySlug : ""}
    />
  );
};

const BlogDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <BlogDetail blogSlug={slug ?? ""} />;
};

export default RoutesComponent;
