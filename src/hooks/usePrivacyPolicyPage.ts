import {useCallback, useEffect, useState} from "react";
import { PrivacyPolicyData } from "../interfaces";
import { fetchPrivacyPolicyPage } from "../api/privacy&policy";

const usePrivacyPolicyPage = () => {
  const [privacyPolicyData, setPrivacyPolicyData] = useState<PrivacyPolicyData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchPrivacyPolicyData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchPrivacyPolicyPage(signal);
      setPrivacyPolicyData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription
        },
        title: response.Title,
        description: response.Description.map((desc: any) => ({
          children: desc.children.map((child: any) => ({
            text: child.text,
            type: child.type,
          })),
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
    fetchPrivacyPolicyData(abortController.signal);
    return () => abortController.abort();
  }, []);

  return {privacyPolicyData, isLoading, error};
};

export default usePrivacyPolicyPage;
