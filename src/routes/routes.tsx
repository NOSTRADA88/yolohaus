
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from '../layouts/layout';
import { AboutCompany, Contact, Guarantee, Home, Projects, Reviews, Vacancy } from "../page";
import { useEffect, useState } from "react";
import { fetchAboutData, fetchContactData, fetchGuaranteeData, fetchProjectsData, fetchReviewsData, fetchVacancyData } from "../api";

const useRoutes = () => {
  const [slugAbout, setSlugAbout] = useState<string>('');
  const [slugReviews, setSlugReviews] = useState<string>('');
  const [slugGuarantee, setSlugGuarantee] = useState<string>('');
  const [slugVacancy, setSlugVacancy] = useState<string>('');
  const [slugProjects, setSlugProjects] = useState<string>('');
  const [slugContact, setSlugContact] = useState<string>('');

  const fetchData = async () => {
    try {
      const aboutData = await fetchAboutData();
      const reviewsData = await fetchReviewsData();
      const guaranteeData = await fetchGuaranteeData();
      const vacancyData = await fetchVacancyData();
      const projectsData = await fetchProjectsData();
      const contactData = await fetchContactData();

      setSlugAbout(aboutData.slug);
      setSlugReviews(reviewsData.slug);
      setSlugGuarantee(guaranteeData.slug);
      setSlugVacancy(vacancyData.slug);
      setSlugProjects(projectsData.slug);
      setSlugContact(contactData.slug);

    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path={`/${slugAbout}`} element={<Layout><AboutCompany /></Layout>} />
        <Route path={`/${slugReviews}`} element={<Layout><Reviews /></Layout>} />
        <Route path={`/${slugGuarantee}`} element={<Layout><Guarantee /></Layout>} />
        <Route path={`/${slugVacancy}`} element={<Layout><Vacancy /></Layout>} />
        <Route path={`/${slugProjects}`} element={<Layout><Projects /></Layout>} />
        <Route path={`/${slugContact}`} element={<Layout><Contact /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default useRoutes