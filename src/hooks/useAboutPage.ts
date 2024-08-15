import { useEffect, useState } from "react";
import { AboutPagesData } from "../interfaces";
import { fetchAboutPage } from "../api/about";

const useAboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutPagesData>();
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetchAboutPage();

        setAboutData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          titleMini: response.About.Information[0].Title,
          description: response.About.Information[0].Description.map(
            (desc: any) => ({
              children: desc.children.map((child: any) => ({
                text: child.text,
                type: child.type,
              })),
            })
          ),
          titleMiniTwo: response.About.Information[1].Title,
          descriptionTwo: response.About.Information[1].Description.map(
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
    fetchAboutData();
  }, []);

  return aboutData;
};

export default useAboutPage;
