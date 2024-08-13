interface WorkTime {
  weekdays: string;
  weekends: string;
}

export interface ContactsMap {
  address?: string;
  email?: string;
  phone?: string;
  info?: string;
  yandexMapURL?: string;
}

export interface ContactProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  address?: string;
  email?: string;
  phone?: string;
  info?: string;
  workTime?: WorkTime;
  yandexMapURL?: string;
}

interface DescriptionChild {
  text: string;
  type: string;
}

interface Description {
  type: string;
  children: DescriptionChild[];
}

export interface Information {
  title: string;
  description: Description[];
}

export interface Kit {
  basePrice: string;
  standardPrice: string;
  comfortPrice: string;
}

export interface Photo {
  url: string;
  name: string;
  width: string;
  height: string;
}

export interface Project {
  title: string;
  slug: string;
  kits: Kit[];
  parameters: {
    houseArea: string;
    builtUpArea: string;
    width: string;
    height: string;
    constructionPeriod: string;
    bedrooms: string;
  };
  photo: Photo;
}

export interface OurRecommendation {
  title: string;
  description: Description[];
  icon: Photo;
  bgPhoto: Photo;
}

export interface HomeData {
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
    photos: Photo[];
  };
  about: {
    title: string;
    information: Information[];
  };
  popularProjects: {
    title: string;
    popularProject: Project[];
    icons: Photo[];
  };
  recommendations: {
    title: string;
    recommendations: OurRecommendation[];
  };
  contactsMap: ContactsMap;
}

export interface MortgageMainProps {
  title?: string;
  description?: string;
  photos?: Photo[];
}

export interface RecommendationProps {
  title?: string;
  recommendations?: OurRecommendation[];
}

export interface MainScreenProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  rawOne?: string;
  rawTwo?: string;
}

export interface AboutProps {
  title?: string;
  information?: Information[];
}

export interface HomeProps {
  mortgage: string;
  about: string;
  reviews: string;
  projects: string;
}

interface Social {
  id: number;
  attributes: {
    URL: string;
    Title: string;
    Photo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface FooterHeader {
  info: string;
  socials: Social[];
  photo: Photo;
  phoneNumber: string;
}

export interface PopularProjectsProps {
  title?: string;
  popularProject?: Project[];
  icons?: Photo[];
}


export interface formatPhoneNumberProps {
  phoneNumber: string | undefined;
}