import { useCallback, useEffect, useState } from "react";
import {
  fetchAboutData,
  fetchHeaderFooterData,
  fetchHomeData,
  fetchProjectsData,
  fetchReviewsData,
} from "../api";
import { Helmet } from "react-helmet";
import {
  About,
  Contact,
  MainScreen,
  Mortgage,
  PopularProjects,
  Recommendation,
} from "../components/home";

export interface Description {
  type: string;
  children: { text: string; type: string }[];
}

export interface Icon {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

export interface BgPhoto {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

export interface RecommendationAttributes {
  Title: string;
  Description: Description[];
  Icon: Icon;
  BgPhoto: BgPhoto;
}

export interface Recommendations {
  id: number;
  attributes: RecommendationAttributes;
}

export interface PhotoFormats {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface PhotoAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: PhotoFormats;
    small: PhotoFormats;
  };
  url: string; // Добавляем url
}

export interface Photo {
  id: number;
  attributes: PhotoAttributes;
}

export interface ProjectAttributes {
  Title: string;
  isRecommended: boolean;
  slug: string;
  Photos: {
    data: Photo[];
  };
  Parameters: {
    id: number;
    HouseArea: string;
    BuiltUpArea: string;
    Floors: number;
    KitchenLivingRoomArea: string;
    Bedrooms: number;
    Toilets: number;
    TerraceAndPorchArea: string;
    Width: string;
    Height: string;
    ConstructionPeriod: string;
  };
  Complectation: {
    id: number;
    Description: {
      type: string;
      children: {
        text: string;
        type: string;
      }[];
    }[];
    BasePrice: string;
    StandartPrice: string;
    ComfortPrice: string;
  }[];
}

export interface Project {
  id: number;
  attributes: ProjectAttributes;
}

export interface Complectation {
  id: number;
  BasePrice: string;
  StandartPrice: string;
  ComfortPrice: string;
}

interface HomeData {
  metaTitle: string;
  metaDescription: string;
  isModalOpen: boolean;
  mainBanner: string;
  titlePart1: string;
  titlePart2: string;
  mortgageTitle: string;
  mortgageDescription: string;
  mortgagePhotos: Photo[];
  currentPage: number;
  aboutTitle: string;
  aboutTitleMini: string;
  aboutDescription: {
    type: string;
    children: { text: string; type: string }[];
  }[];
  aboutPhoto: string;
  aboutSlug: string;
  popularProjectsTitle: string;
  popularProjects: Project[];
  houseAreaIcon: string;
  widthHeightIcon: string;
  constructionPeriodIcon: string;
  bedroomsIcon: string;
  slugProjects: string;
  recommendationsTitle: string;
  recommendations: Recommendations[];
  slugReviews: string;
  email: string;
  phone: string;
  address: string;
  urlAddressOffice: string;
}

const Home = () => {
  const [homeData, setHomeData] = useState<HomeData>({
    metaTitle: "",
    metaDescription: "",
    isModalOpen: false,
    mainBanner: "",
    titlePart1: "",
    titlePart2: "",
    mortgageTitle: "",
    mortgageDescription: "",
    mortgagePhotos: [],
    currentPage: 0,
    aboutTitle: "",
    aboutTitleMini: "",
    aboutDescription: [],
    aboutPhoto: "",
    aboutSlug: "",
    popularProjectsTitle: "",
    popularProjects: [],
    houseAreaIcon: "",
    widthHeightIcon: "",
    constructionPeriodIcon: "",
    bedroomsIcon: "",
    slugProjects: "",
    recommendationsTitle: "",
    recommendations: [],
    slugReviews: "",
    email: "",
    phone: "",
    address: "",
    urlAddressOffice: "",
  });

  const fetchData = async () => {
    try {
      const mainData = await fetchHomeData();
      const aboutData = await fetchAboutData();
      const projectData = await fetchProjectsData();
      const reviewsData = await fetchReviewsData();
      const phoneData = await fetchHeaderFooterData();
      const title = mainData.Greetings.Title;
      const splitIndex = title.indexOf("Дом вашей мечты");

      setHomeData((prevData) => ({
        ...prevData,
        metaTitle: mainData.Metadata.MetaTitle,
        metaDescription: mainData.Metadata.MetaDescription,
        mainBanner: mainData.Greetings.Photo.data.attributes.url,
        titlePart1:
          splitIndex !== -1 ? title.substring(0, splitIndex + 15) : title,
        titlePart2: splitIndex !== -1 ? title.substring(splitIndex + 15) : "",
        mortgageTitle: mainData.Mortgage.Title,
        mortgageDescription: mainData.Mortgage.Description,
        mortgagePhotos: mainData.Mortgage.Photos.data || [],
        aboutTitle: mainData.About.Title,
        aboutTitleMini: mainData.About.Information[0].Title,
        aboutDescription: mainData.About.Information[0].Description,
        aboutPhoto: mainData.About.Photo.data.attributes.url,
        aboutSlug: aboutData.slug,
        popularProjectsTitle: mainData.PopularCottages.Title,
        popularProjects: mainData.PopularCottages.projects.data,
        houseAreaIcon: projectData.Icons.data[0].attributes.url,
        widthHeightIcon: projectData.Icons.data[2].attributes.url,
        constructionPeriodIcon: projectData.Icons.data[1].attributes.url,
        bedroomsIcon: projectData.Icons.data[3].attributes.url,
        slugProjects: projectData.slug,
        recommendationsTitle: mainData.Recommendations.Title,
        recommendations: mainData.Recommendations.List.data,
        slugReviews: reviewsData.slug,
        email: mainData.ContactsMap.Email,
        phone: phoneData.Header.PhoneNumber.PhoneNumber,
        address: mainData.ContactsMap.Address,
        urlAddressOffice: mainData.ContactsMap.YandexMapURL,
      }));
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const openModal = () => {
    setHomeData((prevData) => ({
      ...prevData,
      isModalOpen: true,
    }));
  };

  const closeModal = () => {
    setHomeData((prevData) => ({
      ...prevData,
      isModalOpen: false,
    }));
  };

  return (
    <div>
      <Helmet>
        <title>{homeData.metaTitle}</title>
        <meta name="description" content={homeData.metaDescription} />
      </Helmet>
      <section>
        <MainScreen
          isModalOpen={homeData.isModalOpen}
          closeModal={closeModal}
          openModal={openModal}
          mainBanner={homeData.mainBanner}
          titlePart1={homeData.titlePart1}
          titlePart2={homeData.titlePart2}
        />
      </section>
      <section>
        <Mortgage
          title={homeData.mortgageTitle}
          description={homeData.mortgageDescription}
          photos={homeData.mortgagePhotos}
        />
      </section>
      <section>
        <About
          title={homeData.aboutTitle}
          titleMini={homeData.aboutTitleMini}
          description={homeData.aboutDescription}
          photo={homeData.aboutPhoto}
          slug={homeData.aboutSlug}
        />
      </section>
      <section>
        <PopularProjects
          title={homeData.popularProjectsTitle}
          projects={homeData.popularProjects}
          houseAreaIcon={homeData.houseAreaIcon}
          widthHeightIcon={homeData.widthHeightIcon}
          constructionPeriodIcon={homeData.constructionPeriodIcon}
          bedroomsIcon={homeData.bedroomsIcon}
          slugProjects={homeData.slugProjects}
        />
      </section>
      <section>
        <Recommendation
          title={homeData.recommendationsTitle}
          recommendations={homeData.recommendations}
          slugReviews={homeData.slugReviews}
        />
      </section>
      <section>
        <Contact
          email={homeData.email}
          phone={homeData.phone}
          address={homeData.address}
          urlAddressOffice={homeData.urlAddressOffice}
        />
      </section>
    </div>
  );
};

export default Home;
