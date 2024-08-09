import { fetchServicesData } from "../../api";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

interface DescriptionText {
  type: string;
  text: string;
}

interface ServiceDescription {
  type: string;
  children: DescriptionText[];
}

interface ServiceCard {
  Title: string;
  Description: ServiceDescription[];
  Photo: {
    data: {
      attributes: {
        url: string;
        Title: string;
      };
    };
  };
}

interface ServiceAttributes {
  Title: string;
  slug: string;
  ServiceDescription: ServiceDescription[];
  Metadata: { MetaTitle: string; MetaDescription: string };
  Card: ServiceCard[];
  Photo: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Service {
  id: number;
  attributes: ServiceAttributes;
}

interface ServicesData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  services: Service[];
  slugServices: string;
}

const Services = () => {
  const {
    data: servicesData,
    isLoading,
    error,
  } = useQuery<ServicesData>({
    queryKey: ["services"],
    queryFn: async () => {
      const servicesDataResponse = await fetchServicesData();
      return {
        metaTitle: servicesDataResponse.Metadata.MetaTitle,
        metaDescription: servicesDataResponse.Metadata.MetaDescription,
        title: servicesDataResponse.Title,
        services: servicesDataResponse.Services.data,
        slugServices: servicesDataResponse.slug,
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!servicesData) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <title>{servicesData.metaTitle}</title>
        <meta name="description" content={servicesData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {servicesData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {servicesData.title}
            </p>
          </div>
        </div>
        <div
          className="grid grid-cols-3 mt-10 gap-20 max-xl:gap-10 max-[950px]:grid-cols-2
                 max-[500px]:grid-cols-1"
        >
          {servicesData.services.map((service: Service) => (
            <Link
              to={`/${servicesData.slugServices}/${service.attributes.slug}`}
              key={service.id}
            >
              <div className="relative group">
                <div
                  className="bg-white opacity-50 
                                        group-hover:opacity-100 transition-all duration-300"
                >
                  {service.attributes.Photo.data && (
                    <img
                      src={`${API_URL}${service.attributes.Photo.data.attributes.url}`}
                      alt={service.attributes.Title}
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
                      to={`/${servicesData.slugServices}/${service.attributes.slug}`}
                      className="hover:text-orange text-maingray transition-all duration-300 text-base font-medium"
                    >
                      {service.attributes.Title}
                    </Link>
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      className="text-orange arrow-icon"
                    />
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
