import { useEffect, useState } from "react";
import { StocksData } from "../interfaces";
import { fetchStocksPage } from "../api/stocks";

const useStocksPage = () => {
  const [stocksData, setStocksData] = useState<StocksData>();
  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        const response = await fetchStocksPage();
        setStocksData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
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
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchStocksData();
  }, []);
  return stocksData;
};

export default useStocksPage;
