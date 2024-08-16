import { fetchData } from ".";

export const fetchPrivacyPolicyPage = (signal: AbortSignal) =>
  fetchData("/api/politika-konfidenczialnosti", "Metadata", signal);
