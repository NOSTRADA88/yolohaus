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
import { API_URL } from "../../constants";
import {BgMain, ConsultationPhoto} from "../../assets";

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
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
          <div>{error.message}</div>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
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
        <link rel="prefetch" href={BgMain} as="image" type="image/webp"/>
        {homeData.mortgage.photos.map((photo) => (
          <link rel="prefetch" href={`${API_URL}${photo.url}`} as="image"/>
        ))}
        {homeData.popularProjects.popularProject.map((project) => (
          <link
            rel="prefetch"
            href={`${API_URL}${project.photos[0].url}`}
            as="image" type="image/webp"
          />
        ))}
        <link rel="prefetch" href={ ConsultationPhoto } as="image" type="image/webp" />
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
