import { Helmet } from "react-helmet";
import {
  ContactInfo,
  EmployeeCard,
  ProductionsList,
} from "../../components/contact";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useContactPage from "../../hooks/useContactPage";
import { useInView } from "react-intersection-observer";
import {photoContact} from "../../assets";

const Contact = () => {
  const { contactData, isLoading, error } = useContactPage();

  const { ref: refEmployeeCard, inView: inViewEmployeeCard } = useInView({
    triggerOnce: true,
  });
  const { ref: refProductionsList, inView: inViewProductionsList } = useInView({
    triggerOnce: true,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{contactData.metadata.title}</title>
        <meta name="description" content={contactData.metadata.description} />
        <link rel="preload" href={photoContact} as="image"/>
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

        <div ref={refProductionsList}>
          {inViewProductionsList && (
            <ProductionsList productions={contactData.productions} />
          )}
          <div ref={refEmployeeCard}>
            {inViewEmployeeCard && (
              <EmployeeCard employees={contactData.employees} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
