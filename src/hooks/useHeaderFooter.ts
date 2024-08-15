import { useEffect, useState } from "react";
import { FooterHeader } from "../interfaces";
import { fetchHeaderFooterData } from "../api/footer&header";

const useHeaderFooter = () => {
  const [informationData, setInformationData] = useState<FooterHeader>();

  useEffect(() => {
    const fetchInformationData = async () => {
      try {
        const response = await fetchHeaderFooterData();
        setInformationData({
          info: response.HeaderInfo,
          phoneNumber: response.Phone.Number,
          socials: response.Socials.data.map((social: any) => ({
            url: social.attributes.URL,
            photo: {
              name: social.attributes.Photo.data.attributes.name,
              url: social.attributes.Photo.data.attributes.url,
            },
          })),
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchInformationData();
  }, []);

  return informationData;
};

export default useHeaderFooter;
