import { useEffect, useState } from "react";
import { fetchBuiltHousesData } from "../api/built";
import { BuiltHouses } from "../interfaces";

const useHousesPage = () => {
  const [housesData, setHousesData] = useState<BuiltHouses>();

  useEffect(() => {
    const fetchBuiltHouses = async () => {
      try {
        const response = await fetchBuiltHousesData();
        setHousesData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
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
            photo: {
              url: house.attributes.Photos.data[0].attributes.url,
              name: house.attributes.Photos.data[0].attributes.name,
            },
          })),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchBuiltHouses();
  }, []);

  return housesData;
};

export default useHousesPage;
