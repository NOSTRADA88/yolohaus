import { useEffect, useState } from "react";
import { fetchServicesPage } from "../api/services";
import { ServicesData } from "../interfaces";

const useServicesPage = () => {
  const [servicesData, setServicesData] = useState<ServicesData>();
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await fetchServicesPage();

        setServicesData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          services: response.Services.data.map((service: any) => ({
            title: service.attributes.Title,
            slug: service.attributes.slug,
            photo: {
              name: service.attributes.Photo.data.attributes.name,
              url: service.attributes.Photo.data.attributes.url,
            },
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchServicesData();
  }, []);
  return servicesData;
};

export default useServicesPage;
