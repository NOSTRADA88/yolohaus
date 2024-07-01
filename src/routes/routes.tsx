
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Layout from '../layouts/layout';
import { AboutCompany, Contact, Guarantee, Home, Projects, Reviews, ServiceDetail, Services, Vacancy, PrivacyPolicy, BuiltHouses } from "../page";
import { useEffect, useState } from "react";
import { fetchAboutData, fetchBuiltHousesData, fetchContactData, fetchGuaranteeData, fetchPrivacyPolicyData, fetchProjectsData, fetchReviewsData, fetchServicesData, fetchVacancyData } from "../api";
import ScrollToTop from "../components/ScrollToTop";


const useRoutes = () => {
  const [slugAbout, setSlugAbout] = useState<string>('');
  const [slugReviews, setSlugReviews] = useState<string>('');
  const [slugGuarantee, setSlugGuarantee] = useState<string>('');
  const [slugVacancy, setSlugVacancy] = useState<string>('');
  const [slugProjects, setSlugProjects] = useState<string>('');
  const [slugContact, setSlugContact] = useState<string>('');
  const [slugServices, setSlugServices] = useState<string>('');
  const [slugPrivacy, setSlugPrivacy] = useState<string>('');
  const [slugBuilt, setSlugBuilt] = useState<string>('');

  const fetchData = async () => {
    try {
      const aboutData = await fetchAboutData();
      const reviewsData = await fetchReviewsData();
      const guaranteeData = await fetchGuaranteeData();
      const vacancyData = await fetchVacancyData();
      const projectsData = await fetchProjectsData();
      const contactData = await fetchContactData();
      const servicesData = await fetchServicesData();
      const privacyData = await fetchPrivacyPolicyData();
      const builtData = await fetchBuiltHousesData();

      setSlugAbout(aboutData.slug);
      setSlugReviews(reviewsData.slug);
      setSlugGuarantee(guaranteeData.slug);
      setSlugVacancy(vacancyData.slug);
      setSlugProjects(projectsData.slug);
      setSlugContact(contactData.slug);
      setSlugServices(servicesData.slug);
      setSlugPrivacy(privacyData.slug);
      setSlugBuilt(builtData.slug);

    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const ServiceDetailRoute = () => {
    const { slug } = useParams<{ slug: string }>();
    const servicesSlug = slug || '';

    return <ServiceDetail servicesSlug={servicesSlug} />;
  };

  return (
    <BrowserRouter>
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path={`/${slugAbout}`} element={<Layout><AboutCompany /></Layout>} />
        <Route path={`/${slugReviews}`} element={<Layout><Reviews /></Layout>} />
        <Route path={`/${slugGuarantee}`} element={<Layout><Guarantee /></Layout>} />
        <Route path={`/${slugVacancy}`} element={<Layout><Vacancy /></Layout>} />
        <Route path={`/${slugProjects}`} element={<Layout><Projects /></Layout>} />
        <Route path={`/${slugContact}`} element={<Layout><Contact /></Layout>} />
        <Route path={`/${slugServices}`} element={<Layout><Services /></Layout>} />
        <Route path={`/${slugServices}/:slug`} element={<Layout><ServiceDetailRoute /></Layout>} />
        <Route path={`/${slugPrivacy}`} element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path={`/${slugBuilt}`} element={<Layout><BuiltHouses /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default useRoutes