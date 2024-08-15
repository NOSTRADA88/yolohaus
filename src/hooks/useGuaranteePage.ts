import { useEffect, useState } from "react";
import { AboutPagesData } from "../interfaces";
import { fetchGuaranteePage } from "../api/guarantee";

const useGuaranteePage = () => {
  const [guaranteeData, setGuaranteeData] = useState<AboutPagesData>();
  useEffect(() => {
    const fetchGuaranteeData = async () => {
      try {
        const response = await fetchGuaranteePage();
        setGuaranteeData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          titleMini: response.Information[0].Title,
          description: response.Information[0].Description.map((desc: any) => ({
            children: desc.children.map((child: any) => ({
              text: child.text,
              type: child.type,
            })),
          })),
          titleMiniTwo: response.Information[1].Title,
          descriptionTwo: response.Information[1].Description.map(
            (desc: any) => ({
              children: desc.children.map((child: any) => ({
                text: child.text,
                type: child.type,
              })),
            })
          ),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchGuaranteeData();
  }, []);

  return guaranteeData;
};

export default useGuaranteePage;
