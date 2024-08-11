import { lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { About, MainScreen, Mortgage, PopularProjects } from "../../components/home";
import {fetchHomePage} from "../../api/home";
import {HomeData, HomeProps} from "../../interfaces";

const Recommendation = lazy(
  () => import("../../components/home/Recommendation")
);

const Contact = lazy(
    () => import("../../components/home/Contact")
);

const Home = ({slugs}: HomeProps) => {
  const [home, setHome] = useState<HomeData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => { setIsModalOpen((prev) => !prev)};
  useEffect(() => {
    // можно разбить на запросы для каждого компонента, Promise.All, интерфейсы для данных имеются, сделать маленькие запросы к конкретным ресурсам
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
              url: photo.attributes.url,
              name: photo.attributes.name,
              width: photo.attributes.width,
              height: photo.attributes.height
            })),
          },
          about: {
            title: home.About.Title,
            information: home.About.Information.map((info: any) => ({
              title: info.Title,
              description: info.Description.map((des: any) => ({
                type: des.type,
                children: des.children,
              })),
            })),
          },
          popularProjects: {
            title: home.PopularCottages.Title,
            icons: home.PopularCottages.Icons.data.map((icon: any) => ({
              name: icon.attributes.Photo.data.attributes.name,
              url: icon.attributes.Photo.data.attributes.url,
              width: icon.attributes.Photo.data.attributes.width,
              height: icon.attributes.Photo.data.attributes.height,
            })),
            projects: home.PopularCottages.Projects.data.map((project: any) => ({
              title: project.attributes.Title,
              slug: project.attributes.slug,
              kits: project.attributes.Complectation.map((kit: any) => ({
                basePrice: kit.BasePrice,
                standardPrice: kit.StandartPrice,
                comfortPrice: kit.ComfortPrice
              })),
              parameters: {
                houseArea: project.attributes.Parameters.HouseArea,
                builtUpArea: project.attributes.Parameters.BuiltUpArea,
                width: project.attributes.Parameters.Width,
                height: project.attributes.Parameters.Height,
                constructionPeriod: project.attributes.Parameters.ConstructionPeriod,
                bedrooms: project.attributes.Parameters.Bedrooms
              },
              photo: {
                name: project.attributes.Photos.data[0].attributes.name,
                url: project.attributes.Photos.data[0].attributes.url,
                width: project.attributes.Photos.data[0].attributes.width,
                height: project.attributes.Photos.data[0].attributes.height
              }
            }))},
          recommendations: {
            title: home.Recommendations.Title,
            recommendations: home.Recommendations.List.data.map((recommendation: any) => ({
              title: recommendation.attributes.Title,
              description: recommendation.attributes.Description,
              bgPhoto: {
                url: recommendation.attributes.BgPhoto.data.attributes.url,
                name: recommendation.attributes.BgPhoto.data.attributes.name,
                width: recommendation.attributes.BgPhoto.data.attributes.width,
                height: recommendation.attributes.BgPhoto.data.attributes.height,
              },
              icon: {
                url: recommendation.attributes.Icon.data.attributes.url,
                name: recommendation.attributes.Icon.data.attributes.name,
                width: recommendation.attributes.Icon.data.attributes.width,
                height: recommendation.attributes.Icon.data.attributes.height
              }
            })),
          },
          contactsMap: {
            address: home.ContactsMap.Address,
            email: home.ContactsMap.Email,
            info: home.ContactsMap.Info,
            phone: home.ContactsMap.PhoneNumber,
            workTime: {
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
      <div>
        <Helmet>
          <title>{home?.meta.title}</title>
          <meta name="description" content={home?.meta.description}/>
        </Helmet>
        <MainScreen isModalOpen={isModalOpen} closeModal={toggleModal} openModal={toggleModal} rawOne={home?.greetings.rawOne} rawTwo={home?.greetings.rawTwo} />
        <Mortgage {...home?.mortgage} slugs={slugs} />
        <About {...home?.about} slugs={slugs}/>
        <PopularProjects {...home?.popularProjects} slugs={slugs} />
        <Recommendation {...home?.recommendations} slugs={slugs}/>
        <Contact {...home?.contactsMap} />
      </div>
  );
};

export { Home };
