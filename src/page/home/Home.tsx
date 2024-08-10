import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  About,
  MainScreen,
  Mortgage,
  PopularProjects,
} from "../../components/home";
import {fetchHomePage} from "../../api/home";
import {fetchData} from "../../api";

const Recommendation = lazy(
  () => import("../../components/home/Recommendation")
);

const Contact = lazy(
    () => import("../../components/home/Contact")
);

interface WorkTime {
  id: number;
  weekdays: string;
  weekends: string;
}

interface ContactsMap {
  address: string;
  email: string;
  phone: string;
  info: string;
  workTime: WorkTime;
  yandexMapURL: string;
}

interface MortgagePhoto {
  id: number;
  attributes: {
    url: string;
  };
}

interface DescriptionChild {
  text: string;
  type: string;
}

interface Description {
  type: string;
  children: DescriptionChild[];
}

interface Information {
  id: number;
  title: string;
  description: Description[];
}

interface Project {
  id: number;
  attributes: {
    title: string;
    slug: string;
    shortDescription: Description[];
    description: Description[];
  };
}

interface Recommendation {
  id: number;
  attributes: {
    title: string;
    description: Description[];
  };
}

interface Home {
  meta: {
    title: string;
    description: string;
  };
  greetings: {
    rawOne: string;
    rawTwo: string;
  };
  mortgage: {
    title: string;
    description: string;
    photos: MortgagePhoto[];
  };
  about: {
    title: string;
    information: Information[];
  };
  popularProjects: {
    title: string;
    projects: Project[];
    slugProjects: string;
  };
  recommendations: {
    title: string;
    recommendations: Recommendation[];
  };
  contactsMap: ContactsMap;
}

const Home = () => {
  const [home, setHome] = useState<Home>();
  useEffect(() => {
      const fetchHome = async () => {
        try {
          const home = await fetchHomePage();
          setHome({
            meta: {
              title: home.Metadata.MetaTitle,
              description: home.Metadata.MetaDescription,
            },
            greetings: {
              rawOne: home.Greetings.RawOne,
              rawTwo: home.Greetings.RawTwo,
            },
            mortgage: {
              title: home.Mortgage.Title,
              description: home.Mortgage.Description,
              photos: home.Mortgage.Photos.data.map((photo: any) => ({
                id: photo.id,
                attributes: {
                  url: photo.attributes.url,
                },
              })),
            },
            about: {
              title: home.About.Title,
              information: home.About.Information.map((info: any) => ({
                id: info.id,
                title: info.Title,
                description: info.Description.map((des: any) => ({
                  type: des.type,
                  children: des.children,
                })),
              })),
            },
            popularProjects: {
              title: home.PopularCottages.Title,
              projects: home.PopularCottages.Projects.data.map((project: any) => ({
                id: project.id,
                attributes: {
                  title: project.attributes.Title,
                  slug: project.attributes.slug,
                  shortDescription: project.attributes.ShortDescription,
                  description: project.attributes.Description,
                },
              })),
              slugProjects: home.PopularCottages.slugProjects,
            },
            recommendations: {
              title: home.Recommendations.Title,
              recommendations: home.Recommendations.List.data.map((recommendation: any) => ({
                id: recommendation.id,
                attributes: {
                  title: recommendation.attributes.Title,
                  description: recommendation.attributes.Description,
                },
              })),
            },
            contactsMap: {
              address: home.ContactsMap.Address,
              email: home.ContactsMap.Email,
              info: home.ContactsMap.Info,
              phone: home.ContactsMap.PhoneNumber,
              workTime: {
                id: home.ContactsMap.WorkTime.id,
                weekdays: home.ContactsMap.WorkTime.Weekdays,
                weekends: home.ContactsMap.WorkTime.Weekends,
              },
              yandexMapURL: home.ContactsMap.YandexMapURL,
            }
          });
        } catch (e) {
          console.error(e)
        }
      };
      fetchHome()
  }, []);
  console.log(home)
  return (
      <div>Page</div>
  )
  // const toggleModal = () =>
  //   setHomeData((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));

  // return (
  //   <div>
  //     <Helmet>
  //       <title>{}</title>
  //       <meta name="description" content={homeData.meta.description} />
  //     </Helmet>
  //     <MainScreen
  //       isModalOpen={homeData.isModalOpen}
  //       closeModal={toggleModal}
  //       openModal={toggleModal}
  //       titlePart1={homeData.title.part1}
  //       titlePart2={homeData.title.part2}
  //     />
  //     <Mortgage {...homeData.mortgage} />
  //     <About {...homeData.about} />
  //     <PopularProjects {...homeData.popularProjects} />
  //     <Suspense>
  //       <Recommendation {...homeData.recommendations} />
  //     </Suspense>
  //     <Contact {...homeData.contact} />
  //   </div>
  // );
};

export { Home };
