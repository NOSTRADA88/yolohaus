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
  Houses,
  HousesDetail,
} from "../page";
import { slug } from "../constants";

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

const BlogDetailRoute = () => {
    const { slug } = useParams<{ slug: string }>();
    return <BlogDetail blogSlug={slug ?? ""} />;
};

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route
                    path={slug.main}
                    element={<Layout children={<Home />}/>}
                />
                <Route
                    path={slug.about}
                    element={<Layout children={<AboutCompany />}/>}
                />
                <Route
                    path={slug.reviews}
                    element={<Layout children={<Reviews />}/>}
                />
                <Route
                    path={slug.guarantee}
                    element={<Layout children={<Guarantee />}/>}
                />
                <Route
                    path={slug.vacancies}
                    element={<Layout children={<Vacancy />}/>}
                />
                <Route
                    path={slug.projects}
                    element={<Layout children={<Projects />}/>}
                />
                <Route
                    path={slug.contact}
                    element={<Layout children={<Contact />}/>}
                />
                <Route
                    path={slug.services}
                    element={<Layout children={<Services />} />}
                />
                <Route
                    path={slug.built}
                    element={<Layout children={<Houses />}/>}
                />
                <Route
                    path={slug.stocks}
                    element={<Layout children={<Stocks />} />}
                />
                <Route
                    path={slug.blog}
                    element={<Layout children={<Blog />}/>}
                />
                <Route
                    path={slug.mortgage}
                    element={<Layout children={<MortgageAbout />}/>}
                />
                <Route
                    path={`${slug.blog}/:slug`}
                    element={<Layout children={<BlogDetailRoute />}/>}
                />
                <Route
                    path={`${slug.built}/:slug`}
                    element={<Layout children={<HouseDetailRoute />}/>}
                />
                <Route
                    path={`${slug.services}/:slug`}
                    element={<Layout children={<ServiceDetailRoute />}/>}
                />
                <Route
                    path={`${slug.projects}/:slug`}
                    element={<Layout children={<ProjectsDetailRoute />}/>}
                />
                <Route
                    path={"/*"}
                    element={<Layout children={<ErrorPage />}/>}
                />
                <Route
                    path={slug.privacy}
                    element={<Layout children={<PrivacyPolicy />}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;
