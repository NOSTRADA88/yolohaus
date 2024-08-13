import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchContactData, fetchHomeData } from "../../api";
import {
  ContactInfo,
  EmployeeCard,
  ProductionsList,
} from "../../components/contact";
import { fetchHeaderFooterData } from "../../api/footer&header";
import { Breadcrumbs } from "../../sections/breadcrumbs";

interface DescriptionItem {
  type: string;
  children: {
    children: any;
    text: string;
    type: string;
  }[];
}

interface Production {
  id: number;
  attributes: {
    Name: string;
    Address: string;
    YandexMapURL: string;
  };
}

interface Employee {
  id: number;
  attributes: {
    FullName: string;
    Specialisation: string;
    email: string;
    PhoneNumber: string;
    Photo: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
}

interface ContactData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleMini: string;
  description: DescriptionItem[];
  email: string;
  phone: string;
  address: string;
  urlAddressOffice: string;
  weekdays: string;
  weekends: string;
  productions: Production[];
  employees: Employee[];
}

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleMini: "",
    description: [],
    email: "",
    phone: "",
    address: "",
    urlAddressOffice: "",
    weekdays: "",
    weekends: "",
    productions: [],
    employees: [],
  });

  const fetchData = async () => {
    try {
      const contactDataResponse = await fetchContactData();
      const mainData = await fetchHomeData();
      const phoneData = await fetchHeaderFooterData();

      setContactData({
        metaTitle: contactDataResponse.Metadata.MetaTitle,
        metaDescription: contactDataResponse.Metadata.MetaDescription,
        title: contactDataResponse.Title,
        titleMini: contactDataResponse.Information.Title,
        description: contactDataResponse.Information.Description,
        email: mainData.ContactsMap.Email,
        phone: phoneData.Phone.PhoneNumber,
        address: mainData.ContactsMap.Address,
        urlAddressOffice: mainData.ContactsMap.YandexMapURL,
        weekdays: contactDataResponse.WorkingTime.Weekdays,
        weekends: contactDataResponse.WorkingTime.Weekends,
        productions: contactDataResponse.Productions.data,
        employees: contactDataResponse.Employees.data,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
