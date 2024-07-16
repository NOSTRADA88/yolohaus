import { useEffect, useState } from "react";
import { fetchAboutData } from "../../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

interface DescriptionItem {
  type: string;
  children: { text: string; type: string }[];
}

interface Child {
  text: string;
  type: string;
}

interface DescriptionItem {
  type: string;
  children: Child[];
}

interface AboutData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleMini: string;
  description: DescriptionItem[];
  titleMiniTwo: string;
  descriptionTwo: DescriptionItem[];
  photoAbout: string;
}

const AboutCompany = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleMini: "",
    description: [],
    titleMiniTwo: "",
    descriptionTwo: [],
    photoAbout: "",
  });
  const fetchData = async () => {
    try {
      const aboutDataResponse = await fetchAboutData();

      setAboutData({
        metaTitle: aboutDataResponse.Metadata.MetaTitle,
        metaDescription: aboutDataResponse.Metadata.MetaDescription,
        title: aboutDataResponse.Title,
        titleMini: aboutDataResponse.About.Information[0].Title,
        description: aboutDataResponse.About.Information[0].Description,
        titleMiniTwo: aboutDataResponse.About.Information[1].Title,
        descriptionTwo: aboutDataResponse.About.Information[1].Description,
        photoAbout: aboutDataResponse.About.Photo.data.attributes.url,
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
        <title>{aboutData.metaTitle}</title>
        <meta name="description" content={aboutData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4 ">
          <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">
            {aboutData.title}
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
              {aboutData.title}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center max-xl:mt-20 max-md:mt-10">
          <div className="flex flex-col w-[60%] max-[1111px]:w-full">
            <div className=" bg-lightwhite p-5">
              <div className="flex items-center">
                <p className="font-light text-xl font-museo leading-normal text-justify">
                  {aboutData.titleMini}
                </p>
              </div>
            </div>
            {aboutData.description.map((item, index) => (
              <div
                key={index}
                className="mt-5 ml-4 w-[85%] max-[1111px]:w-full max-[1111px]:pr-8  "
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
          <div className="mt-[66px]  max-[1111px]:hidden">
            <img
              src={`${API_URL}${aboutData.photoAbout}`}
              alt="photoAbout"
              className=""
            />
          </div>
        </div>
        <div className=" bg-lightwhite mt-8 p-5">
          <div className="flex items-center">
            <p className="font-light text-xl font-museo leading-normal text-justify">
              {aboutData.titleMiniTwo}
            </p>
          </div>
        </div>
        {aboutData.descriptionTwo.map((item, index) => (
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

export default AboutCompany;
