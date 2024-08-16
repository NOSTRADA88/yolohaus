import { fetchData } from ".";

export const fetchContactPage = (signal: AbortSignal) =>
  fetchData(
    "/api/kontakty",
    "Metadata,Information.Photo,WorkingTime,Employees.Photo,Productions,Phone",
      signal
  );
