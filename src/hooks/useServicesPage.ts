import {useCallback, useEffect, useState} from "react";
import { fetchServicesPage } from "../api/services";
import { ServicesData } from "../interfaces";

const useServicesPage = () => {
  const [servicesData, setServicesData] = useState<ServicesData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchServicesData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchServicesPage(signal);
      setServicesData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription
        },
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error(`unknown error occurred: ${error}`))
      }
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    fetchServicesData(abortController.signal);
    return () => abortController.abort();
  }, [servicesData]);

  return {servicesData, isLoading, error};
};

export default useServicesPage;
