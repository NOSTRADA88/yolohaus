import {useCallback, useEffect, useState} from "react";
import { AboutPagesData } from "../interfaces";
import { fetchGuaranteePage } from "../api/guarantee";

const useGuaranteePage = () => {
  const [guaranteeData, setGuaranteeData] = useState<AboutPagesData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchGuaranteeData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchGuaranteePage(signal);
      setGuaranteeData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error(`unknown error occurred: ${error}`))
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    fetchGuaranteeData(abortController.signal);
    return () => abortController.abort()
  }, [guaranteeData]);

  return {guaranteeData, isLoading, error};
};

export default useGuaranteePage;
