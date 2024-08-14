import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  ContactInfo,
  EmployeeCard,
  ProductionsList,
} from "../../components/contact";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import {
  ContactPage, ContactsMap,
  Description,
  Employee,
} from "../../interfaces";
import { fetchContactPage } from "../../api/contact";


const Contact = () => {
  const [contactData, setContactData] = useState<ContactPage>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleMini: "",
    description: [] as Description[],
    email: "",
    phone: "",
    address: "",
    urlAddressOffice: "",
    weekdays: "",
    weekends: "",
    productions: [] as ContactsMap[],
    employees: [] as Employee[],
  });

  useEffect(() => {
    const fetchData = async () => {
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
            yandexMapURL: production.attributes.YandexMapURL
          })),
          employees: response.Employees.data,
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchData();
  }, []);
  console.log(contactData)
  return (
    <div>
      <Helmet>
        <title>{contactData.metaTitle}</title>
        <meta name="description" content={contactData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs finalTitle={contactData.title} />
        <ContactInfo
          titleMini={contactData.titleMini}
          description={contactData.description}
          address={contactData.address}
          phone={contactData.phone}
          email={contactData.email}
          weekdays={contactData.weekdays}
          weekends={contactData.weekends}
          urlAddressOffice={contactData.urlAddressOffice}
        />
        <ProductionsList productions={contactData.productions} />
        <EmployeeCard employees={contactData.employees} />
      </div>
    </div>
  );
};

export { Contact };
