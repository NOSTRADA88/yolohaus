import {useCallback, useEffect, useState} from "react";
import { StocksData } from "../interfaces";
import { fetchStocksPage } from "../api/stocks";

const useStocksPage = () => {
  const [stocksData, setStocksData] = useState<StocksData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchStocksData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchStocksPage(signal);
      setStocksData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
        title: response.Title,
        stocks: response.stock_list.data.map((stock: any) => ({
          promotionTime: stock.attributes.PromotionTime,
          shortTitle: stock.attributes.ShortTitle,
          longTitle: stock.attributes.LongTitle,
          price: stock.attributes.Price,
          description: stock.attributes.Description.map((desc: any) => ({
            children: desc.children.map((child: any) => ({
              text: child.text,
              type: child.type,
            })),
          })),
          photo: {
            name: stock.attributes.Photo.data.attributes.name,
            url: stock.attributes.Photo.data.attributes.url,
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
    fetchStocksData(abortController.signal);
    return () => abortController.abort();
  }, [stocksData]);

  return {stocksData, isLoading, error};
};

export default useStocksPage;
