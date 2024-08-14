import { fetchData } from ".";

export const fetchContactPage = () =>
  fetchData(
    "/api/kontakty",
    "Metadata,Information.Photo,WorkingTime,Employees.Photo,Productions,Phone"
  );
