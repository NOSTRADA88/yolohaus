import { Helmet } from "react-helmet";
import { ContactBanner } from "../../sections/banner";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { ServiceDetailProps } from "../../interfaces";
import useServiceDetailPage from "../../hooks/useServiceDetailPage";

const ServiceDetail = ({ servicesSlug }: ServiceDetailProps) => {
  const {serviceData, isLoading, error} = useServiceDetailPage({
    servicesSlug: servicesSlug || "",
  });

  // TODO тут тоже
  if (!serviceData || isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  const breadcrumbItems = [{ title: "Услуги", slug: slug.services }];

  return (
    <div>
      <Helmet>
        <title>{serviceData.metadata.title}</title>
        <meta name="description" content={serviceData.metadata.description} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={serviceData.title} />

        <ContactBanner descriptionInfo={serviceData.serviceDescription} />
        <div className="mt-20">
          <h2 className="font-museo font-bold text-2xl max-md:text-xl ">
            {serviceData.header}
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-10 max-lg:grid-cols-2 max-md:grid-cols-1">
            {serviceData.card.length > 0 &&
              serviceData.card.map((service) => (
                <div className="mb-4 border border-[#E5E5E5] ">
                  {service.photo && (
                    <img
                      src={`${API_URL}${service.photo.url}`}
                      alt={service.photo.name}
                      className="w-full max-md:h-[250px] max-md:object-cover max-sm:h-[200px]"
                    />
                  )}
                  <h3 className="font-museo font-bold text-base p-4">
                    {service.title}
                  </h3>
                  {service.description.map((desc, index) => (
                    <div key={index} className="px-4 py-2">
                      {desc.type === "paragraph" && (
                        <p className="font-museo text-sm font-light text-justify">
                          {desc.children.map((child, idx) => (
                            <span key={idx}>{child.text}</span>
                          ))}
                        </p>
                      )}
                      {desc.type === "list" && (
                        <ul className="custom-list">
                          {desc.children.map((listItem, idx) => (
                            <li
                              key={idx}
                              className="font-museo text-sm leading-relaxed font-light mb-2"
                            >
                              {listItem.children.map((item, i) => (
                                <span key={i}>{item.text}</span>
                              ))}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ServiceDetail };
