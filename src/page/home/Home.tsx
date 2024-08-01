import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAllData } from "../../api";
import {
  About,
  MainScreen,
  Mortgage,
  PopularProjects,
} from "../../components/home";

const Recommendation = lazy(
  () => import("../../components/home/Recommendation")
);
const Contact = lazy(() => import("../../components/home/Contact"));

type HomeData = {
  meta: { title: string; description: string };
  isModalOpen: boolean;
  title: { part1: string; part2: string };
  mortgage: { title: string; description: string; photos: any[]; link: string };
  about: {
    title: string;
    titleMini: string;
    description: any[];
    photo: string;
    slug: string;
  };
  popularProjects: {
    title: string;
    projects: any[];
    houseAreaIcon: string;
    widthHeightIcon: string;
    constructionPeriodIcon: string;
    bedroomsIcon: string;
    slugProjects: string;
  };
  recommendations: {
    title: string;
    recommendations: any[];
    slugReviews: string;
  };

  contact: {
    email: string;
    phone: string;
    address: string;
    urlAddressOffice: string;
  };
};

const Home = () => {
  const [homeData, setHomeData] = useState<HomeData>({
    meta: { title: "", description: "" },
    isModalOpen: false,
    title: { part1: "", part2: "" },
    mortgage: { title: "", description: "", photos: [], link: "" },
    about: {
      title: "",
      titleMini: "",
      description: [],
      photo: "",
      slug: "",
    },
    popularProjects: {
      title: "",
      projects: [],
      houseAreaIcon: "",
      widthHeightIcon: "",
      constructionPeriodIcon: "",
      bedroomsIcon: "",
      slugProjects: "",
    },
    recommendations: { title: "", recommendations: [], slugReviews: "" },
    contact: { email: "", phone: "", address: "", urlAddressOffice: "" },
  });

  useEffect(() => {
    fetchAllData()
      .then((data) => {
        const {
          mainData,
          aboutData,
          projectData,
          reviewsData,
          phoneData,
          mortgageData,
        } = data;
        const title = mainData.Greetings.Title;
        const splitIndex = title.indexOf("Дом вашей мечты");

        setHomeData({
          meta: {
            title: mainData.Metadata.MetaTitle,
            description: mainData.Metadata.MetaDescription,
          },
          isModalOpen: false,
          title: {
            part1:
              splitIndex !== -1 ? title.substring(0, splitIndex + 15) : title,
            part2: splitIndex !== -1 ? title.substring(splitIndex + 15) : "",
          },
          mortgage: {
            title: mainData.Mortgage.Title,
            description: mainData.Mortgage.Description,
            photos: mainData.Mortgage.Photos.data || [],
            link: mortgageData.slug,
          },
          about: {
            title: mainData.About.Title,
            titleMini: mainData.About.Information[0].Title,
            description: mainData.About.Information[0].Description,
            photo: mainData.About.Photo.data.attributes.url,
            slug: aboutData.slug,
          },
          popularProjects: {
            title: mainData.PopularCottages.Title,
            projects: mainData.PopularCottages.projects.data,
            houseAreaIcon: projectData.Icons.data[0].attributes.url,
            widthHeightIcon: projectData.Icons.data[2].attributes.url,
            constructionPeriodIcon: projectData.Icons.data[1].attributes.url,
            bedroomsIcon: projectData.Icons.data[3].attributes.url,
            slugProjects: projectData.slug,
          },
          recommendations: {
            title: mainData.Recommendations.Title,
            recommendations: mainData.Recommendations.List.data,
            slugReviews: reviewsData.slug,
          },
          contact: {
            email: mainData.ContactsMap.Email,
            phone: phoneData.Header.PhoneNumber.PhoneNumber,
            address: mainData.ContactsMap.Address,
            urlAddressOffice: mainData.ContactsMap.YandexMapURL,
          },
        });
      })
      .catch((error) => console.error("Ошибка запроса:", error));
  }, []);

  const toggleModal = () =>
    setHomeData((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));

  return (
    <div>
      <Helmet>
        <title>{homeData.meta.title}</title>
        <meta name="description" content={homeData.meta.description} />
      </Helmet>
      <MainScreen
        isModalOpen={homeData.isModalOpen}
        closeModal={toggleModal}
        openModal={toggleModal}
        titlePart1={homeData.title.part1}
        titlePart2={homeData.title.part2}
      />
      <Mortgage {...homeData.mortgage} />
      <About {...homeData.about} />
      <PopularProjects {...homeData.popularProjects} />
      <Suspense>
        <Recommendation {...homeData.recommendations} />
      </Suspense>
      <Suspense>
        <Contact {...homeData.contact} />
      </Suspense>
    </div>
  );
};

export { Home };
