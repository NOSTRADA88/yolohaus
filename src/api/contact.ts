import { fetchData } from ".";

export const fetchContactData = () =>
  fetchData(
    "/api/kontakty",
    "Metadata,Information.Photo,WorkingTime,Employees.Photo,Productions"
  );
