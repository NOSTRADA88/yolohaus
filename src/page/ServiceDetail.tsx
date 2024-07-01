import { useEffect, useState } from "react";
import { fetchServicesDetailsData } from "../api";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface ServiceDetailProps {
  servicesSlug: string;
}

interface ServiceData {
  Title: string;
  slug: string;
  ServiceDescription: { type: string; children: { text: string; type: string }[] }[];
  Card: {
    id: number;
    Title: string;
    Description: { type: string; children: { text: string; type: string }[] }[];
    Photo: { data: any };
  }[];
  Metadata: {
    MetaTitle: string;
    MetaDescription: string;
  };
}

const ServiceDetail = ({ servicesSlug }: ServiceDetailProps) => {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const fetchData = async () => {
    try {
      const detailsData = await fetchServicesDetailsData(servicesSlug);
      setMetaTitle(detailsData.Metadata.MetaTitle);
      setMetaDescription(detailsData.Metadata.MetaDescription);
      setTitle(detailsData.Title);

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
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">{title}</h1>
          <div className="flex items-center">
            <Link to="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300">Главная / </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;