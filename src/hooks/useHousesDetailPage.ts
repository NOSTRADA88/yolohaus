import {useCallback, useEffect, useState} from "react";
import { Project, HouseDetailProps } from "../interfaces";
import { fetchHousesDetailsData } from "../api/built";

const useHousesDetailPage = ({ houseSlug }: HouseDetailProps) => {
  const [houseData, setHouseData] = useState<Project>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchBuiltHouseData = useCallback (async(houseSlug: string, signal: AbortSignal) => {
    try {
      const response = await fetchHousesDetailsData(houseSlug, signal);
      setHouseData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
        title: response.Title,
        slug: response.slug,
        parameters: {
          houseArea: response.Parameters.HouseArea,
          location: response.Parameters.Location,
          constructionPeriod: response.Parameters.ConstructionPeriod,
        },
        buildingTechnology: response.BuildingTechnology.BuildingTechnology,
        description: response.Description,
        photos: response.Photos.data.map((photo: any) => ({
          name: photo.attributes.name,
          url: photo.attributes.url,
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
  }, [houseSlug]);

  useEffect(() => {
    const abortController = new AbortController;
    fetchBuiltHouseData(houseSlug, abortController.signal);
    return () => abortController.abort();
  }, [houseSlug, houseData]);

  return {houseData, isLoading, error};
};

export default useHousesDetailPage;
