
import { useEffect, useState } from "react";
import { fetchHomeData } from "../api";
import { Helmet } from 'react-helmet';
import { About, Contact, MainScreen, Mortgage, PopularProjects, Recommendation } from "../components/home";

const Home = () => {

  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');

  const fetchData = async () => {
    try {
      const mainData = await fetchHomeData();
      setMetaTitle(mainData.Metadata.MetaTitle);
      setMetaDescription(mainData.Metadata.MetaDescription);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <section>
        <MainScreen />
      </section>
      <section>
        <Mortgage />
      </section>
      <section>
        <About />
      </section>
      {/* <section>
        <PopularProjects />
      </section> */}
      <section>
        <Recommendation />
      </section>
      {/* <section>
        <Contact />
      </section> */}
    </div>
  )
}

export default Home