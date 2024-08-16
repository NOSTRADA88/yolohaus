import { useEffect, useState } from "react";
import { BuiltHouse, HouseDetailProps } from "../interfaces";
import { fetchHousesDetailsData } from "../api/built";

const useHousesDetailPage = ({ houseSlug }: HouseDetailProps) => {
  const [houseData, setHouseData] = useState<BuiltHouse>();

  useEffect(() => {
    const fetchBuiltHouseData = async () => {
      try {
        const response = await fetchHousesDetailsData(houseSlug);
        console.log(response);
        setHouseData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          slug: response.slug,
          parameters: {
            houseArea: response.Parameters.HouseArea,
            location: response.Parameters.Location,
            constructionPeriod: response.Parameters.ConstructionPeriod,
          },
          description: response.Description,
          photo: response.Photos.data.map((photo: any) => ({
            name: photo.attributes.name,
            url: photo.attributes.url,
          })),
        });
      } catch (error) {
        console.error("Failed to fetch house data:", error);
      }
    };

    fetchBuiltHouseData();
  }, [houseSlug]);
  console.log(houseData);
  return houseData;
};

export default useHousesDetailPage;
