// Shared

import { ReactNode } from "react";

interface Metadata {
  title: string;
  description: string;
}

// Description

interface Child {
  bold?: boolean;
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
  metadata: Metadata;
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

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLink {
  href: string;
  label: string;
  submenu?: { href: string; label: string }[];
}

export interface NavbarProps {
  navLinks: NavLink[];
}

export interface SubmenuProps {
  submenu: {
    href: string;
    label: string;
  }[];
}

// Phone Number

export interface formatPhoneNumberProps {
  phoneNumber: string | undefined;
  color: string;
}

// About & Guarantee  Page

export interface AboutPagesData {
  metadata: Metadata;
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
  metadata: Metadata;
  slug?: string;
  title: string;
  text: CardDescription[];
  photo: Photo;
}

export interface BlogsData {
  metadata: Metadata;
  title: string;
  titleBlog?: string;
  posts: Post[];
}

export interface BlogDetailProps {
  blogSlug: string;
}

// Built Houses & Projects Page
export interface SortProps {
  sortBy: "popularity" | "area" | "price" | null;
  sortDirection: "asc" | "desc";
  toggleSortBy: (criteria: "popularity" | "area" | "price") => void;
  resetSort: () => void;
}
export interface BuiltHouses {
  metadata: Metadata;
  title: string;
  icons: Photo[];
  houses: Project[];
}

interface Bundle {
  type: string;
  description: Description[];
  name: string;
}

export interface Kit {
  kits: never[];
  metadata: Metadata;
  basePrice: string;
  standardPrice: string;
  comfortPrice: string;
  bundles: Bundle[];
  slug: string;
}

interface Parameters {
  houseArea: string;
  builtUpArea?: string;
  location?: string;
  width?: string;
  height?: string;
  constructionPeriod: string;
  bedrooms?: string;
  toilets?: string;
  terraceAndPorchArea?: string;
  floors?: string;
  kitchenLivingRoomArea?: string;
}

export interface Project {
  metadata: Metadata;
  youtube?: YouTubeData;
  slug: string;
  title: string;
  prices?: Kit[];
  parameters: Parameters;
  buildingTechnology?: string;
  photos: Photo[];
  shortDescription?: Description[];
  description: Description[];
  kits?: Kit[];
  isPopular?: boolean;
  lastItemRef?: React.RefObject<HTMLDivElement> | null; 
}

export interface ProjectsList {
  metadata: Metadata;
  title: string;
  projects: Project[];
  icons: Photo[];
}

export interface HouseDetailProps {
  houseSlug: string;
}

export interface ProjectsDetailProps {
  projectsSlug: string;
  initialTechnology?: string;
}

export interface SliderHousesProps {
  details: Project[];
}

export interface OptionsHousesProps {
  details: Project[];
  minPrice?: number;
}

export interface TechnologyProps {
  initialTechnology: string | null | undefined;
  complectations: Kit[];
  updateMetaData: (technology: string | null) => void;
  onTechnologySelect: (technology: string, technologySlug: string) => void;
  isTechnologySelected: boolean;
  currentProjectSlug: string;
  slugProjects: string;
}

export interface SwitchTechnologyProps {
  updateMetaData: (technology: string | null) => void;
  onTechnologySelect: (technology: string, technologySlug: string) => void;
  currentProjectSlug: string;
  slugProjects: string;
  selectedTechnology: string;
}

export interface AboutHousesProps {
  details: Project[];
}


export interface ProjectListProps {
  projects: Project[];
  icons: Photo[];
  itemType: "projects" | "built"; 
}
// Contact page

export interface Employee {
  fullName: string;
  specialisation: string;
  email: string;
  phoneNumber: string;
  photo: Photo;
}

export interface ContactPage {
  metadata: Metadata;
  title: string;
  titleMini: string;
  description: Description[];
  email: string;
  phone: string;
  address: string;
  urlAddressOffice: string;
  weekdays: string;
  weekends: string;
  productions: ContactsMap[];
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
  productions: ContactsMap[];
}

export interface EmployeeCardProps {
  employees: Employee[];
}

// Mortgage page
export interface Bank {
  id: number;
  photo: Photo;
  rate: string;
  title: string;
  url: string;
}

export interface MortgageData {
  metadata: Metadata;
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

export interface MortgageFormProps {
  projectCost: number;
  initialPayment: number;
  loanAmount: number;
  rate: number;
  term: number;
  termType: string;
  startDate: string;
  onProjectCostChange: (value: number) => void;
  onInitialPaymentChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onTermChange: (value: number) => void;
  onTermTypeChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  termError: string;
  rateError: string;
}

export interface CalculationResultsProps {
  monthlyPayment: number;
  totalDebt: number;
  overpayment: number;
  endDate: string;
  pieData: any[];
  barData: any[];
  tableData: any[];
  showAllRows: boolean;
  handleShowAllRows: () => void;
  term: number;
  termType: string;
}

// Privacy & Policy page

export interface PrivacyPolicyData {
  metadata: Metadata;
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
  metadata: Metadata;
  title: string;
  reviews: Review[];
}

// Stocks Page

export interface StockItem {
  promotionTime: string;
  shortTitle: string;
  longTitle: string;
  price: string;
  description: Description[];
  photo: Photo;
}

export interface StocksData {
  metadata: Metadata;
  title: string;
  stocks: StockItem[];
}
// Contact Banner

export interface ContactBannerProps {
  descriptionInfo?: Description[];
}

//Breadcrumbs

interface BreadcrumbItem {
  title?: string;
  slug?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  finalTitle: string;
}

//Vacancy Page
export type TabType = "activeVacancies" | "brigade";

export interface SwitchProps {
  activeTab: string;
  setActiveTab: (tab: TabType) => void;
}
export interface Vacancies {
  id: number;
  title: string;
  responsibilities: CardDescriptionList[];
  workingConditions: CardDescriptionList[];
  requirements: CardDescriptionList[];
}

export interface VacancyPagesData {
  metadata: Metadata;
  title: string;
  vacancies: Vacancies[];
}

export interface ActiveVacanciesProps {
  vacancies: Vacancies[];
}

// Services Page

export interface Card {
  title: string;
  description: CardDescription[];
  photo?: Photo;
}

export interface Service {
  metadata: Metadata;
  title: string;
  slug?: string;
  photo?: Photo;
  serviceDescription: Description[];
  header: string;
  card: Card[];
}

export interface ServicesData {
  metadata: Metadata;
  title: string;
  services: Service[];
}

export interface ServiceDetailProps {
  servicesSlug: string;
}

export interface LayoutProps {
  children: ReactNode;
}
