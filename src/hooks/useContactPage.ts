import {useCallback, useEffect, useState} from "react";
import { ContactPage } from "../interfaces";
import { fetchContactPage } from "../api/contact";

const useContactPage = () => {
  const [contactData, setContactData] = useState<ContactPage>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchContactData = useCallback(async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const response = await fetchContactPage(signal);
      setContactData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
        title: response.Title,
        titleMini: response.Information.Title,
        description: response.Information.Description,
        email: response.Information.Email,
        phone: response.Phone.Number,
        address: response.Address,
        urlAddressOffice: response.YandexMapURL,
        weekdays: response.WorkingTime.Weekdays,
        weekends: response.WorkingTime.Weekends,
        productions: response.Productions.data.map((production: any) => ({
          name: production.attributes.Name,
          address: production.attributes.Address,
          yandexMapURL: production.attributes.YandexMapURL,
        })),
        employees: response.Employees.data.map((employee: any) => ({
          fullName: employee.attributes.FullName,
          specialisation: employee.attributes.Specialisation,
          email: employee.attributes.email,
          phoneNumber: employee.attributes.PhoneNumber,
          photo: {
            name: employee.attributes.Photo.data.attributes.name,
            url: employee.attributes.Photo.data.attributes.url,
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
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    fetchContactData(abortController.signal);
    return () => abortController.abort()
  }, []);

  return {contactData, isLoading, error};
};

export default useContactPage;
