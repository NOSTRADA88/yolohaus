import { useEffect, useState, useCallback } from "react";
import { AboutPagesData } from "../interfaces";
import { fetchAboutPage } from "../api/about";

const useAboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutPagesData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchAboutData = useCallback(async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const response = await fetchAboutPage(signal);
      if (response) {
        setAboutData({
          metadata: {
            title: response.Metadata.MetaTitle,
            description: response.Metadata.MetaDescription,
          },
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
      }
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
    const abortController = new AbortController();
    fetchAboutData(abortController.signal)
    return () => abortController.abort();
  }, []);

  return { aboutData, isLoading, error };
};

export default useAboutPage;