import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { Service } from "../../interfaces";
import useServicesPage from "../../hooks/useServicesPage";

const Services = () => {
  const { servicesData, isLoading, error } = useServicesPage();

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

  if (!servicesData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  const breadcrumbItems = [{ title: "О компании", slug: slug.about }];

  return (
    <div>
      <Helmet>
        <title>{servicesData.metadata.title}</title>
        <meta name="description" content={servicesData.metadata.description} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={servicesData.title} />
        <div
          className="grid grid-cols-3 mt-10 gap-20 max-xl:gap-10 max-[950px]:grid-cols-2
                 max-[500px]:grid-cols-1"
        >
          {servicesData.services.map((service: Service, index: number) => (
            <Link to={`${slug.services}/${service.slug}`} key={index}>
              <div className="relative group">
                <div
                  className="relative overflow-hidden group bg-white opacity-50 
                                        group-hover:opacity-100 transition-all duration-300"
                >
                  {service.photo && (
                    <img
                      src={`${API_URL}${service.photo.url}`}
                      alt={service.title}
                      width={100}
                      height={100}
                    />
                  )}
                  <div
                    className="absolute bottom-5 right-0 bg-white p-4 group-hover:shadow-md w-[280px] max-xl:w-[250px] max-[950px]:w-[300px] max-md:w-[250px] max-sm:w-[230px] 
                   h-[60px] flex items-center justify-between"
                  >
                    <span className="hover:text-orange text-maingray transition-all duration-300 text-base font-medium">
                      {service.title}
                    </span>
                    <p className="text-orange arrow-icon"> ➜ </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Services };
