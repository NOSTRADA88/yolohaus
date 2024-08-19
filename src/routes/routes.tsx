import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Layout from "../layouts/layout";
import ScrollToTop from "../components/ScrollToTop";
import {
  Home,
  Projects,
  Services,
  Stocks,
  MortgageAbout,
  Houses,
} from "../page";
import { slug } from "../constants";
import { lazy, Suspense } from "react";

const AboutCompany = lazy(() => import("../page/about/AboutCompany"));
const Vacancy = lazy(() => import("../page/vacancy/Vacancy"));
const Blog = lazy(() => import("../page/blog/Blog"));
const Contact = lazy(() => import("../page/contact/Contact"));
const ServiceDetail = lazy(() => import("../page/services/ServiceDetail"));
const HousesDetail = lazy(() => import("../page/built/HousesDetail"));
const ProjectsDetail = lazy(() => import("../page/project/ProjectsDetail"));
const ErrorPage = lazy(() => import("../page/error/Error"));
const PrivacyPolicy = lazy(
  () => import("../page/privacy&policy/PrivacyPolicy")
);
const BlogDetail = lazy(() => import("../page/blog/BlogDetail"));
const Guarantee = lazy(() => import("../page/guarantee/Guarantee"));
const Reviews = lazy(() => import("../page/reviews/Reviews"));

const ServiceDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServiceDetail servicesSlug={slug ?? ""} />;
};

const HouseDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <HousesDetail houseSlug={slug ?? ""} />;
};

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

// TODO добавить колёсико в fallback для suspense =)
const BlogDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <BlogDetail blogSlug={slug ?? ""} />;
};

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={slug.main} element={<Layout children={<Home />} />} />
        <Route
          path={slug.about}
          element={
            <Layout children={<Suspense children={<AboutCompany />} />} />
          }
        />
        <Route
          path={slug.reviews}
          element={<Layout children={<Suspense children={<Reviews />} />} />}
        />
        <Route
          path={slug.guarantee}
          element={<Layout children={<Suspense children={<Guarantee />} />} />}
        />
        <Route
          path={slug.vacancies}
          element={<Layout children={<Suspense children={<Vacancy />} />} />}
        />
        <Route
          path={slug.projects}
          element={<Layout children={<Projects />} />}
        />
        <Route
          path={slug.contact}
          element={<Layout children={<Suspense children={<Contact />} />} />}
        />
        <Route
          path={slug.services}
          element={<Layout children={<Services />} />}
        />
        <Route path={slug.built} element={<Layout children={<Houses />} />} />
        <Route path={slug.stocks} element={<Layout children={<Stocks />} />} />
        <Route
          path={slug.blog}
          element={<Layout children={<Suspense children={<Blog />} />} />}
        />
        <Route
          path={slug.mortgage}
          element={<Layout children={<MortgageAbout />} />}
        />
        <Route
          path={`${slug.blog}/:slug`}
          element={
            <Layout children={<Suspense children={<BlogDetailRoute />} />} />
          }
        />
        <Route
          path={`${slug.built}/:slug`}
          element={
            <Layout children={<Suspense children={<HouseDetailRoute />} />} />
          }
        />
        <Route
          path={`${slug.services}/:slug`}
          element={
            <Layout children={<Suspense children={<ServiceDetailRoute />} />} />
          }
        />
        <Route
          path={`${slug.projects}/:slug`}
          element={
            <Layout
              children={<Suspense children={<ProjectsDetailRoute />} />}
            />
          }
        />
        <Route
          path={"/*"}
          element={<Layout children={<Suspense children={<ErrorPage />} />} />}
        />
        <Route
          path={slug.privacy}
          element={
            <Layout children={<Suspense children={<PrivacyPolicy />} />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
