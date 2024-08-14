// Description

interface Child {
  text: string;
  type: string;
}

export interface DescriptionChild {
  children: Child[];
  bold?: boolean;
  text: string;
  type: string;
}

export interface Description {
  type: string;
  children: DescriptionChild[];
}

export interface Information {
  title: string;
  description: Description[];
}

// Photo & Video
export interface YouTubeData {
  url: string;
  title: string;
  thumbnail: string;
  mime: string;
  rawData: {
    html: string;
  };
}

export type MediaItem = Photo | VideoMediaItem;

export interface VideoMediaItem {
  type: "video";
  url: string;
  thumbnail: string;
  embedHtml: string;
}

export interface Photo {
  type: "photo";
  url: string;
  name: string;
  width?: string;
  height?: string;
}

// Home Page

export interface HomeProps {
  mortgage: string;
  about: string;
  reviews: string;
  projects: string;
}

export interface MainScreenProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  rawOne?: string;
  rawTwo?: string;
}

export interface MortgageMainProps {
  title?: string;
  description?: string;
  photos?: Photo[];
}

export interface AboutProps {
  title?: string;
  information?: Information[];
}

export interface PopularProjectsProps {
  title?: string;
  popularProject?: Project[];
  icons?: Photo[];
}

export interface Project {
  title: string;
  slug: string;
  kits: Complectation[];
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

export interface RecommendationProps {
  title?: string;
  recommendations?: OurRecommendation[];
}

export interface ContactProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  address?: string;
  email?: string;
  phone?: string;
  info?: string;
  yandexMapURL?: string;
}

export interface ContactsMap {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  info?: string;
  yandexMapURL?: string;
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

// Footer and Header

interface Social {
  url: string;
  photo: Photo;
}

export interface FooterHeader {
  info: string;
  socials: Social[];
  phoneNumber: string;
}

export interface HeaderProps {
  header?: FooterHeader;
  footer?: FooterHeader;
}

// Phone Number

export interface formatPhoneNumberProps {
  phoneNumber: string | undefined;
  color: string;
}

// About & Guarantee  Page

export interface AboutPagesData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleAbout?: string;
  titleMini: string;
  description: Description[];
  titleMiniTwo: string;
  descriptionTwo: Description[];
}

// Blog Page

export interface CardDescriptionText {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface CardDescriptionListItem {
  type: "list-item";
  children: CardDescriptionText[];
}

export interface CardDescriptionList {
  type: "list";
  format: "unordered" | "ordered";
  children: CardDescriptionListItem[];
}
export interface CardDescriptionParagraph {
  type: "paragraph";
  children: CardDescriptionText[];
}

export interface CardDescriptionHeading {
  type: "heading";
  level: number;
  children: CardDescriptionText[];
}

export interface CardDescriptionQuote {
  type: "quote";
  children: CardDescriptionText[];
}

export interface CardDescriptionImage {
  type: "image";
  photo: Photo;
}

export type CardDescription =
  | CardDescriptionParagraph
  | CardDescriptionList
  | CardDescriptionHeading
  | CardDescriptionQuote
  | CardDescriptionImage;

export interface Post {
  metaTile: string;
  metaDescription: string;
  slug?: string;
  title: string;
  text: CardDescription[];
  photo: Photo[];
}

export interface BlogsData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleBlog?: string;
  posts: Post[];
}

export interface BlogDetailProps {
  blogSlug: string;
}

// Built Houses & Projects Page

export interface Technology {
  id: number;
  attributes: {
    NameForStrapi: string;
    Equipment: Description[];
  };
}

export interface Complectation {
  id: number;
  Description: Description[];
  BasePrice: string;
  StandardPrice: string;
  ComfortPrice: string;
  Slug: {
    id: number;
    BuildingTechnology: string;
  };
  Metadata: {
    id: number;
    MetaTitle: string;
    MetaDescription: string;
  };
  complectations: {
    data: Technology[];
  };
}

export interface HousesAttributes {
  Title: string;
  YouTube: string;
  isRecommended: boolean;
  slug: string;
  Description: Description[];
  ShortDescription: Description[];
  Parameters: {
    id: number;
    Area: string;
    Location: string;
    Days: number;
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
  Complectation: Complectation[];
  BuildingTechnology: {
    id: number;
    BuildingTechnology: string;
  };
  Photos: {
    data: Photo[];
  };
}

export interface HousesData {
  id: number;
  attributes: HousesAttributes;
}
export interface HouseDetailProps {
  houseSlug: string;
}

export interface ProjectsDetailProps {
  projectsSlug: string;
  initialTechnology?: string;
}

export interface SliderHousesProps {
  details: HousesData[];
}

export interface OptionsHousesProps {
  details: HousesData[];
}

export interface TechnologyProps {
  complectations: Complectation[];
  currentProjectSlug: string;
  slugProjects: string;
  updateTitle: (technology: string) => void;
  initialTechnology?: string;
}

export interface AboutHousesProps {
  details: HousesData[];
}

// Contact page

export interface Employee {
  id: number;
  attributes: {
    FullName: string;
    Specialisation: string;
    email: string;
    PhoneNumber: string;
    Photo: Photo;
  };
}

interface Production {
  id: number;
  attributes: ContactsMap;
}

export interface ContactData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleMini: string;
  description: Description[];
  email: string;
  phone: string;
  address: string;
  urlAddressOffice: string;
  weekdays: string;
  weekends: string;
  productions: Production[];
  employees: Employee[];
}

export interface ContactInfoProps {
  titleMini: string;
  description: Description[];
  address: string;
  urlAddressOffice: string;
  phone: string;
  email: string;
  weekdays: string;
  weekends: string;
}

export interface ProductionsListProps {
  productions: Production[];
}

export interface EmployeeCardProps {
  employees: Employee[];
}

// Mortfage page
export interface Bank {
  id: number;
  attributes: {
    Photo: Photo;
    Rate: string;
    Title: string;
    URL: string;
  };
}

export interface MortgageData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleDescription: string;
  description: Description[];
  banks: Bank[];
}

export interface BankSelectionProps {
  banks: Bank[];
  selectedBank: number;
  onSelectBank: (bankId: number) => void;
}

// Privacy & Policy page

export interface PrivacyPolicyData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: Description[];
}

// Reviews Page

interface Review {
  title: string;
  url: string;
  photo: Photo;
}

export interface ReviewsData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  reviews: Review[];
}

// Stocks Page

export interface StockItem {
  PromotionTime: string;
  ShortTitle: string;
  LongTitle: string;
  Price: string;
  Description: Description[];
  Photo: Photo;
}

export interface StocksData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  stock_list: StockItem[];
}
