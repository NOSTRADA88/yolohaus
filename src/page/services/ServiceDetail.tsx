import { useEffect, useState } from "react";
import { fetchServicesData, fetchServicesDetailsData } from "../../api";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ContactBanner } from "../../sections/banner";
import { API_URL } from "../../constants";

interface CardDescriptionText {
  type: "text";
  text: string;
}

interface CardDescriptionListItem {
  type: "list-item";
  children: CardDescriptionText[];
}

interface CardDescriptionList {
  type: "list";
  format: "unordered";
  children: CardDescriptionListItem[];
}

interface CardDescriptionParagraph {
  type: "paragraph";
  children: CardDescriptionText[];
}

type CardDescription = CardDescriptionParagraph | CardDescriptionList;

interface CardPhoto {
  data: {
    attributes: {
      url: string;
      Title: string;
    };
  };
}

interface ServiceData {
  id: number;
  Title: string;
  Description: CardDescription[];
  Photo: CardPhoto;
}

interface ServiceDetailProps {
  servicesSlug: string;
}

const ServiceDetail = ({ servicesSlug }: ServiceDetailProps) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [descriptionInfo, setDescriptionInfo] = useState<CardDescription[]>([]);
  const [titleServices, setTitleServices] = useState<string>("");
  const [slugServices, setSlugServices] = useState<string>("");

  const fetchData = async () => {
    try {
      const detailsData = await fetchServicesDetailsData(servicesSlug);
      setMetaTitle(detailsData.data[0].attributes.Metadata.MetaTitle);
      setMetaDescription(
        detailsData.data[0].attributes.Metadata.MetaDescription
      );
      setTitle(detailsData.data[0].attributes.Title);
      setDescriptionInfo(detailsData.data[0].attributes.ServiceDescription);
      setServices(detailsData.data[0].attributes.Card);

      const servicesData = await fetchServicesData();
      setTitleServices(servicesData.title);
      setSlugServices(servicesData.slug);
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
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${slugServices}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {titleServices} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {title}
            </p>
          </div>
        </div>
        <ContactBanner descriptionInfo={descriptionInfo} />
        <div className="mt-20">
          {/*    <h2 className="font-museo font-bold text-2xl max-md:text-xl">
            {" "}
            Заголовок{" "}
          </h2> */}
          <div className="grid grid-cols-3 gap-6 mt-10 max-lg:grid-cols-2 max-md:grid-cols-1">
            {services.length > 0 &&
              services.map((service) => (
                <div key={service.id} className="mb-4 border border-[#E5E5E5] ">
                  {service.Photo && service.Photo.data && (
                    <img
                      src={`${API_URL}${service.Photo.data.attributes.url}`}
                      alt={service.Photo.data.attributes.Title}
                      className="w-full max-md:h-[250px] max-md:object-cover max-sm:h-[200px]"
                    />
                  )}
                  <h3 className="font-museo font-bold text-base p-4">
                    {service.Title}
                  </h3>
                  {service.Description.map((desc, index) => (
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

export default ServiceDetail;
