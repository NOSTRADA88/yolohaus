import { useEffect, useState } from "react";
import { ContactPage } from "../interfaces";
import { fetchContactPage } from "../api/contact";

const useContactPage = (): ContactPage | undefined => {
  const [contactData, setContactData] = useState<ContactPage>();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetchContactPage();
        setContactData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
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
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchContactData();
  }, []);

  return contactData;
};

export default useContactPage;
