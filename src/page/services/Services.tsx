import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { Service } from "../../interfaces";
import useServicesPage from "../../hooks/useServicesPage";

const Services = () => {
  const servicesData = useServicesPage();

  if (!servicesData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }
  const breadcrumbItems = [{ title: "О компании", slug: slug.about }];

  return (
    <div>
      <Helmet>
        <title>{servicesData.metaTitle}</title>
        <meta name="description" content={servicesData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={servicesData.title} />
        <div
          className="grid grid-cols-3 mt-10 gap-20 max-xl:gap-10 max-[950px]:grid-cols-2
                 max-[500px]:grid-cols-1"
        >
          {servicesData.services.map((service: Service) => (
            <Link to={`${slug.services}/${service.slug}`}>
              <div className="relative group">
                <div
                  className="bg-white opacity-50 
                                        group-hover:opacity-100 transition-all duration-300"
                >
                  {service.photo && (
                    <img
                      src={`${API_URL}${service.photo.url}`}
                      alt={service.title}
                      className="w-[280px] h-[280px] object-cover max-[1000px]:w-[240px] max-[1000px]:h-[240px]  
                                             max-[950px]:w-[350px]    max-[850px]:w-[300px] max-md:w-[250px] max-[500px]:w-[350px] 
                                             max-[400px]:w-[280px]"
                    />
                  )}
                </div>
                <div
                  className="absolute bottom-10 left-10 bg-white p-4 group-hover:shadow-md w-[280px] max-[1000px]:w-[240px]
                                max-[950px]:w-[300px] max-[950px]:left-24 max-[850px]:left-8 max-[850px]:w-[260px] max-md:w-[220px] max-[500px]:w-[350px]
                                max-[500px]:left-10  max-[400px]:w-[280px] max-[400px]:left-5
                                h-[60px] flex items-center"
                >
                  <div className="flex justify-between items-center w-full">
                    <Link
                      to={`${slug.services}/${service.slug}`}
                      className="hover:text-orange text-maingray transition-all duration-300 text-base font-medium"
                    >
                      {service.title}
                    </Link>
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
