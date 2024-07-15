import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchContactData, fetchHeaderFooterData, fetchHomeData } from "../api";
import {
  ContactInfo,
  EmployeeCard,
  ProductionsList,
} from "../components/contact";
import { Link } from "react-router-dom";

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
  photoContact: string;
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
    photoContact: "",
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
        photoContact:
          contactDataResponse.Information.Photo.data.attributes.formats.large
            .url,
        email: mainData.ContactsMap.Email,
        phone: phoneData.Header.PhoneNumber.PhoneNumber,
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
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4 ">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {contactData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {contactData.title}
            </p>
          </div>
        </div>
        <ContactInfo
          titleMini={contactData.titleMini}
          description={contactData.description}
          address={contactData.address}
          phone={contactData.phone}
          email={contactData.email}
          photoContact={contactData.photoContact}
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

export default Contact;
