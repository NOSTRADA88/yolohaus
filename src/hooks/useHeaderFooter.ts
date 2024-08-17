import {useCallback, useEffect, useState} from "react";
import { FooterHeader } from "../interfaces";
import { fetchHeaderFooterData } from "../api/footer&header";

const useHeaderFooter = () => {
  const [informationData, setInformationData] = useState<FooterHeader>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchInformationData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
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
    fetchInformationData();
  }, []);

  return {informationData, isLoading, error};
};

export default useHeaderFooter;
