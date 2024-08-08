import { lazy, FC } from "react";
import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import Layout from "../layouts/layout";
import ScrollToTop from "../components/ScrollToTop";
import { Home, ErrorPage } from "../page";
import {useSlugs} from "../hooks";

const AboutCompany = lazy(() => import("../page/about/About").then(module => ({default: module.About})));
const Reviews = lazy(() => import("../page/reviews/Reviews").then(module => ({default: module.Reviews})));
const Guarantee = lazy(() => import("../page/guarantee/Guarantee").then(module => ({default: module.Guarantee})));
const Vacancy = lazy(() => import("../page/vacancy/Vacancy").then(module => ({default: module.Vacancy})));
const Projects = lazy(() => import("../page/project/Projects").then(module => ({default: module.Projects})));
const Contact = lazy(() => import("../page/contact/Contact").then(module => ({default: module.Contact})));
const Services = lazy(() => import("../page/services/Services").then(module => ({default: module.Services})));
const PrivacyPolicy = lazy(() => import("../page/privacy&policy/PrivacyPolicy").then(module => ({default: module.PrivacyPolicy})));
const BuiltHouses = lazy(() => import("../page/built/Houses").then(module => ({default: module.Houses})));
const Stocks = lazy(() => import("../page/stocks/Stocks").then(module => ({default: module.Stocks})));
const Blog = lazy(() => import("../page/blog/Blog").then(module => ({default: module.Blog})));
const MortgageAbout = lazy(() => import("../page/mortgage/MortgageAbout").then(module => ({default: module.MortgageAbout})));
const ServiceDetail = lazy(() => import("../page/services/ServiceDetail").then(module => ({default: module.ServiceDetail})));
const HouseDetail = lazy(() => import("../page/built/HousesDetail").then(module => ({default: module.HousesDetail})));
const ProjectsDetail = lazy(() => import("../page/project/ProjectsDetail").then(module => ({default: module.ProjectsDetail})));
const BlogDetail = lazy(() => import("../page/blog/BlogDetail").then(module => ({default: module.BlogDetail})));

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
          <Routes>
            <Route path={"/"} element={<Layout><Home /></Layout>} />
            <Route path={`/${slugs.about}`} element={<Layout><AboutCompany /></Layout>} />
            <Route path={`/${slugs.reviews}`} element={<Layout><Reviews /></Layout>} />
            <Route path={`/${slugs.guarantee}`} element={<Layout><Guarantee /></Layout>} />
            <Route path={`/${slugs.vacancy}`} element={<Layout><Vacancy /></Layout>} />
            <Route path={`/${slugs.projects}`} element={<Layout><Projects /></Layout>} />
            <Route path={`/${slugs.contact}`} element={<Layout><Contact /></Layout>} />
            <Route path={`/${slugs.services}`} element={<Layout><Services /></Layout>} />
            <Route path={`/${slugs.privacy}`} element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path={`/${slugs.built}`} element={<Layout><BuiltHouses /></Layout>} />
            <Route path={`/${slugs.stocks}`} element={<Layout><Stocks /></Layout>} />
            <Route path={`/${slugs.blog}`} element={<Layout><Blog /></Layout>} />
            <Route path={`/${slugs.mortgage}`} element={<Layout><MortgageAbout /></Layout>} />
            <Route path={`/${slugs.blog}/:slug`} element={<Layout><BlogDetailRoute /></Layout>} />
            <Route path={`/${slugs.built}/:slug`} element={<Layout><HouseDetailRoute /></Layout>} />
            <Route path={`/${slugs.services}/:slug`} element={<Layout><ServiceDetailRoute /></Layout>} />
            <Route path={`/${slugs.projects}/:slug`} element={<Layout><ProjectsDetailRoute /></Layout>} />
            <Route path={"/*"} element={<Layout><ErrorPage /></Layout>} />
          </Routes>
      </BrowserRouter>
  );
}

const ServiceDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServiceDetail servicesSlug={slug ?? ""} />;
};

const HouseDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
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
  return (
      <ProjectsDetail projectsSlug={projectsSlug} initialTechnology={isTechnology ? technologySlug : ""} />
  );
};

const BlogDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <BlogDetail blogSlug={slug ?? ""}/>;
};


export default RoutesComponent;
