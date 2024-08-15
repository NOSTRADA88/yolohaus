import { useEffect, useState } from "react";
import { fetchMortgagePage } from "../api/mortgage";
import { MortgageData } from "../interfaces";

const useMortgagePage = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>();

  useEffect(() => {
    const fetchMortgageData = async () => {
      try {
        const response = await fetchMortgagePage();
        setMortgageData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          titleDescription: response.TitleDescription,
          description: response.Description,
          banks: response.banks_list.data.map((bank: any) => ({
            id: bank.id,
            photo: {
              name: bank.attributes.Photo.data.attributes.name,
              url: bank.attributes.Photo.data.attributes.url
            },
            rate: bank.attributes.Rate,
            title: bank.attributes.Title,
            url: bank.attributes.URL
          })),
        });
      } catch (error) {
        console.error("Failed to fetch mortgage data", error);
      }
    };

    fetchMortgageData();
  }, []);

  return mortgageData;
};

export default useMortgagePage;
