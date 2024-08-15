import { useEffect, useState } from "react";
import { PrivacyPolicyData } from "../interfaces";
import { fetchPrivacyPolicyPage } from "../api/privacy&policy";

const usePrivacyPolicyPage = () => {
  const [privacyPolicyData, setPrivacyPolicyData] =
    useState<PrivacyPolicyData>();

  useEffect(() => {
    const fetchPrivacyPolicyData = async () => {
      try {
        const response = await fetchPrivacyPolicyPage();
        setPrivacyPolicyData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          description: response.Description.map((desc: any) => ({
            children: desc.children.map((child: any) => ({
              text: child.text,
              type: child.type,
            })),
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchPrivacyPolicyData();
  }, []);

  return privacyPolicyData;
};

export default usePrivacyPolicyPage;
