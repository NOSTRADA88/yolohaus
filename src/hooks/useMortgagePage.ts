import {useCallback, useEffect, useState} from "react";
import { fetchMortgagePage } from "../api/mortgage";
import { MortgageData } from "../interfaces";

const useMortgagePage = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchMortgageData = useCallback(async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const response = await fetchMortgagePage(signal);
      setMortgageData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
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
    fetchMortgageData(abortController.signal);
    return () => abortController.abort()
  }, []);

  return {mortgageData, isLoading, error};
};

export default useMortgagePage;
