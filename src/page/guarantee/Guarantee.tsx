import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchGuaranteeData } from "../../api";
import { photoGuarantee } from "../../assets";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";

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
  titleMini: string;
  description: DescriptionItem[];
  titleMiniTwo: string;
  descriptionTwo: DescriptionItem[];
}

const Guarantee = () => {
  const [guaranteeData, setGuaranteeData] = useState<GuaranteeData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleAbout: "",
    titleMini: "",
    description: [],
    titleMiniTwo: "",
    descriptionTwo: [],
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
        titleMini: guaranteeDataResponse.Information[0].Title,
        description: guaranteeDataResponse.Information[0].Description,
        titleMiniTwo: guaranteeDataResponse.Information[1].Title,
        descriptionTwo: guaranteeDataResponse.Information[1].Description,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbItems = [
    { title: guaranteeData.titleAbout, slug: slug.guarantee },
  ];

  return (
    <div>
      <Helmet>
        <title>{guaranteeData.metaTitle}</title>
        <meta name="description" content={guaranteeData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={guaranteeData.title} />
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
              src={photoGuarantee}
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

export { Guarantee };
