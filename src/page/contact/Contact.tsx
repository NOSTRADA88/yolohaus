import { Helmet } from "react-helmet";
import {
  ContactInfo,
  EmployeeCard,
  ProductionsList,
} from "../../components/contact";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useContactPage from "../../hooks/useContactPage";

const Contact = () => {
  const contactData = useContactPage();

  if (!contactData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }
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
