import {useCallback, useEffect, useState} from "react";
import { fetchServicesDetailsPage } from "../api/services";
import { Service, ServiceDetailProps } from "../interfaces";

const useServiceDetailPage = ({ servicesSlug }: ServiceDetailProps) => {
  const [serviceData, setServiceData] = useState<Service>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchServiceDetailData = useCallback(async (servicesSlug: string, signal: AbortSignal) => {
    try {
      const response = await fetchServicesDetailsPage(servicesSlug, signal);
      setServiceData({
        metadata: {
          title: response.data[0].attributes.Metadata.MetaTitle,
          description: response.data[0].attributes.Metadata.MetaDescription
        },
        title: response.data[0].attributes.Title,
        serviceDescription:
            response.data[0].attributes.ServiceDescription.map((desc: any) => ({
              children: desc.children.map((child: any) => ({
                text: child.text,
                type: child.type,
              })),
            })),
        header: response.data[0].attributes.Header,
        card: response.data[0].attributes.Card.map((card: any) => ({
          title: card.Title,
          description: card.Description.map((item: any) => {
            switch (item.type) {
              case "paragraph":
                return {
                  type: "paragraph",
                  children: item.children.map((child: any) => ({
                    type: "text",
                    text: child.text,
                    bold: child.bold,
                    italic: child.italic,
                    underline: child.underline,
                  })),
                };
              case "list":
                return {
                  type: "list",
                  format: item.format,
                  children: item.children.map((listItem: any) => ({
                    type: "list-item",
                    children: listItem.children.map((child: any) => ({
                      type: "text",
                      text: child.text,
                      bold: child.bold,
                      italic: child.italic,
                      underline: child.underline,
                    })),
                  })),
                };
              default:
                return item;
            }
          }),
          photo: card.Photo?.data
              ? {
                name: card.Photo.data.attributes.name,
                url: card.Photo.data.attributes.url,
              }
              : undefined,
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
  }, [servicesSlug]);

  useEffect(() => {
    const abortController = new AbortController;
    fetchServiceDetailData(servicesSlug, abortController.signal);
    return () => abortController.abort();
  }, [servicesSlug, serviceData]);

  return {serviceData, isLoading, error};
};

export default useServiceDetailPage;
