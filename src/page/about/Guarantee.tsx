import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchGuaranteeData } from "../../api";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

interface Child {
  text: string;
  type: string;
}

interface DescriptionItem {
  type: string;
  children: Child[];
}

interface GuaranteeData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleAbout: string;
  slugAbout: string;
  titleMini: string;
  description: DescriptionItem[];
  titleMiniTwo: string;
  descriptionTwo: DescriptionItem[];
  photoGuarantee: string;
}

const Guarantee = () => {
  const [guaranteeData, setGuaranteeData] = useState<GuaranteeData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleAbout: "",
    slugAbout: "",
    titleMini: "",
    description: [],
    titleMiniTwo: "",
    descriptionTwo: [],
    photoGuarantee: "",
  });

  const fetchData = async () => {
    try {
      const guaranteeDataResponse = await fetchGuaranteeData();
      const aboutDataResponse = await fetchAboutData();

      setGuaranteeData({
        metaTitle: guaranteeDataResponse.Metadata.MetaTitle,
        metaDescription: guaranteeDataResponse.Metadata.MetaDescription,
        title: guaranteeDataResponse.Title,
        titleAbout: aboutDataResponse.Title,
        slugAbout: aboutDataResponse.slug,
        titleMini: guaranteeDataResponse.Information[0].Title,
        description: guaranteeDataResponse.Information[0].Description,
        titleMiniTwo: guaranteeDataResponse.Information[1].Title,
        descriptionTwo: guaranteeDataResponse.Information[1].Description,
        photoGuarantee: guaranteeDataResponse.Photo.data.attributes.url,
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
        <title>{guaranteeData.metaTitle}</title>
        <meta name="description" content={guaranteeData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4 mb-10">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl ">
            {guaranteeData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${guaranteeData.slugAbout}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {guaranteeData.titleAbout} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {guaranteeData.title}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center max-xl:mt-20 max-md:mt-10 ">
          <div className="flex flex-col w-[60%] max-[1111px]:w-full">
            <div className=" bg-lightwhite p-5">
              <div className="flex items-center">
                <p className="font-light text-xl font-museo leading-normal text-justify">
                  {guaranteeData.titleMini}
                </p>
              </div>
            </div>
            {guaranteeData.description.map((item, index) => (
              <div
                key={index}
                className="mt-5 ml-4 w-[85%] max-[1111px]:w-full max-[1111px]:pr-8"
              >
                {item.children.map((child, childIndex) => (
                  <p
                    className="font-light text-sm font-museo leading-relaxed text-justify"
                    key={childIndex}
                  >
                    {child.text}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6  max-[1111px]:hidden">
            <img
              src={`${API_URL}${guaranteeData.photoGuarantee}`}
              alt="photoGuarantee"
              className="w-[540px]"
            />
          </div>
        </div>
        <div className=" bg-lightwhite mt-8 p-5">
          <div className="flex items-center">
            <p className="font-light text-xl font-museo leading-normal text-justify">
              {guaranteeData.titleMiniTwo}
            </p>
          </div>
        </div>
        {guaranteeData.descriptionTwo.map((item, index) => (
          <div key={index} className="mt-5 ml-4 w-full pr-8 ">
            {item.children.map((child, childIndex) => (
              <p
                className="font-light text-sm font-museo leading-relaxed text-justify"
                key={childIndex}
              >
                {child.text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guarantee;
