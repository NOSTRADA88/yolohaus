import {useCallback, useEffect, useState} from "react";
import { fetchBuiltHousesData } from "../api/built";
import { BuiltHouses } from "../interfaces";

const useHousesPage = () => {
  const [housesData, setHousesData] = useState<BuiltHouses>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchBuiltHouses = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchBuiltHousesData(signal);
      setHousesData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
        title: response.title,
        icons: response.Icons.data.map((icon: any) => ({
          name: icon.attributes.name,
          url: icon.attributes.url,
        })),
        houses: response.BuiltHouses.data.map((house: any) => ({
          title: house.attributes.Title,
          slug: house.attributes.slug,
          parameters: {
            houseArea: house.attributes.Parameters.HouseArea,
            location: house.attributes.Parameters.Location,
            constructionPeriod:
            house.attributes.Parameters.ConstructionPeriod,
          },
          photos: house.attributes.Photos.data.map((photo: any) => ({
            url: photo.attributes.url,
            name: photo.attributes.name,
          })),
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
    fetchBuiltHouses(abortController.signal);
    return () => abortController.abort()
  }, []);

  return {housesData, isLoading, error};
};

export default useHousesPage;
