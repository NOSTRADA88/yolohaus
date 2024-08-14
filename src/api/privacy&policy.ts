import { fetchData } from ".";

export const fetchPrivacyPolicyPage = () =>
  fetchData("/api/politika-konfidenczialnosti", "Metadata");
