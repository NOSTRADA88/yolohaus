import { Helmet } from "react-helmet";
import {
  About,
  MainScreen,
  Mortgage,
  PopularProjects,
  Recommendation,
  Contact,
} from "../../components/home";
import useHomePage from "../../hooks/useHomePage";

const Home = () => {
  const homeData = useHomePage();

  if (!homeData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>{homeData.meta.title}</title>
        <meta name="description" content={homeData.meta.description} />
      </Helmet>
      <MainScreen
        rawOne={homeData.greetings.rawOne}
        rawTwo={homeData.greetings.rawTwo}
      />
      <Mortgage {...homeData.mortgage} />
      <About {...homeData.about} />
      <PopularProjects {...homeData.popularProjects} />
      <Recommendation {...homeData.recommendations} />
      <Contact {...homeData.contactsMap} />
    </div>
  );
};

export { Home };
