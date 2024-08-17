import { useCallback, useEffect, useState } from "react";
import { HomeData } from "../interfaces";
import { fetchHomePage } from "../api/home";
const useHomePage = () => {
  const [homeData, setHomeData] = useState<HomeData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchHome = useCallback(async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const response = await fetchHomePage(signal);
      setHomeData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription
        },
        greetings: {
          rawOne: response.Greetings.RawOne,
          rawTwo: response.Greetings.RawTwo,
        },
        mortgage: {
          title: response.Mortgage.Title,
          description: response.Mortgage.Description,
          photos: response.Mortgage.Photos.data.map((photo: any) => ({
            url: photo.attributes.url,
            name: photo.attributes.name,
            width: photo.attributes.width,
            height: photo.attributes.height,
          })),
        },
        about: {
          title: response.About.Title,
          information: response.About.Information.map((info: any) => ({
            title: info.Title,
            description: info.Description.map((des: any) => ({
              type: des.type,
              children: des.children,
            })),
          })),
        },
        popularProjects: {
          title: response.PopularCottages.Title,
          icons: response.PopularCottages.Icons.data.map((icon: any) => ({
            name: icon.attributes.Photo.data.attributes.name,
            url: icon.attributes.Photo.data.attributes.url,
            width: icon.attributes.Photo.data.attributes.width,
            height: icon.attributes.Photo.data.attributes.height,
          })),
          popularProject: response.PopularCottages.Projects.data.map(
            (project: any) => ({
              title: project.attributes.Title,
              slug: project.attributes.slug,
              prices: project.attributes.Complectation.map((price: any) => ({
                basePrice: price.BasePrice,
                standardPrice: price.StandartPrice,
                comfortPrice: price.ComfortPrice,
              })),
              parameters: {
                houseArea: project.attributes.Parameters.HouseArea,
                builtUpArea: project.attributes.Parameters.BuiltUpArea,
                width: project.attributes.Parameters.Width,
                height: project.attributes.Parameters.Height,
                constructionPeriod:
                  project.attributes.Parameters.ConstructionPeriod,
                bedrooms: project.attributes.Parameters.Bedrooms,
              },
              photos: project.attributes.Photos.data.map((photo: any) => ({
                url: photo.attributes.url,
                name: photo.attributes.name,
              })),
            })
          ),
        },
        recommendations: {
          title: response.Recommendations.Title,
          recommendations: response.Recommendations.List.data.map(
            (recommendation: any) => ({
              title: recommendation.attributes.Title,
              description: recommendation.attributes.Description,
              bgPhoto: {
                url: recommendation.attributes.BgPhoto.data.attributes.url,
                name: recommendation.attributes.BgPhoto.data.attributes.name,
                width: recommendation.attributes.BgPhoto.data.attributes.width,
                height:
                  recommendation.attributes.BgPhoto.data.attributes.height,
              },
              icon: {
                url: recommendation.attributes.Icon.data.attributes.url,
                name: recommendation.attributes.Icon.data.attributes.name,
                width: recommendation.attributes.Icon.data.attributes.width,
                height: recommendation.attributes.Icon.data.attributes.height,
              },
            })
          ),
        },
        contactsMap: {
          address: response.ContactsMap.Address,
          email: response.ContactsMap.Email,
          info: response.ContactsMap.Info,
          phone: response.ContactsMap.PhoneNumber,
          yandexMapURL: response.ContactsMap.YandexMapURL,
        },
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
    const abortController = new AbortController();
    fetchHome(abortController.signal);
    return () => abortController.abort()
  }, []);

  return {homeData, isLoading, error};
};

export default useHomePage;
