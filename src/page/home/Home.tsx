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
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { homeData, isLoading, error } = useHomePage();
  const { ref: refAbout, inView: inViewAbout } = useInView({
    triggerOnce: true,
  });
  const { ref: refMortgage, inView: inViewMortgage } = useInView({
    triggerOnce: true,
  });
  const { ref: refPopularProjects, inView: inViewPopularProjects } = useInView({
    triggerOnce: true,
  });
  const { ref: refRecommendation, inView: inViewRecommendation } = useInView({
    triggerOnce: true,
  });
  const { ref: refContact, inView: inViewContact } = useInView({
    triggerOnce: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8 min-h-screen">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8 min-h-screen">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{homeData.metadata.title}</title>
        <meta name="description" content={homeData.metadata.description} />
      </Helmet>
      <MainScreen
        rawOne={homeData.greetings.rawOne}
        rawTwo={homeData.greetings.rawTwo}
      />
      <div ref={refMortgage}>
        {inViewMortgage && <Mortgage {...homeData.mortgage} />}
      </div>
      <div ref={refAbout}>{inViewAbout && <About {...homeData.about} />}</div>
      <div ref={refPopularProjects}>
        {inViewPopularProjects && (
          <PopularProjects {...homeData.popularProjects} />
        )}
      </div>
      <div ref={refRecommendation}>
        {inViewRecommendation && (
          <Recommendation {...homeData.recommendations} />
        )}
      </div>
      <div ref={refContact}>
        {inViewContact && <Contact {...homeData.contactsMap} />}
      </div>
    </div>
  );
};

export { Home };
