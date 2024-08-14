import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { photoAbout } from "../../assets";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { AboutPagesData, Description } from "../../interfaces";
import { fetchAboutData } from "../../api/about";

const AboutCompany = () => {
  const [aboutData, setAboutData] = useState<AboutPagesData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleMini: "",
    description: [] as Description[],
    titleMiniTwo: "",
    descriptionTwo: [] as Description[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAboutData();

        setAboutData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          titleMini: response.About.Information[0].Title,
          description: response.About.Information[0].Description.map(
            (desc: any) => ({
              children: desc.children.map((child: any) => ({
                text: child.text,
                type: child.type,
              })),
            })
          ),
          titleMiniTwo: response.About.Information[1].Title,
          descriptionTwo: response.About.Information[1].Description.map(
            (desc: any) => ({
              children: desc.children.map((child: any) => ({
                text: child.text,
                type: child.type,
              })),
            })
          ),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchData();
  }, []);

  console.log(aboutData);
  return (
    <div>
      <Helmet>
        <title>{aboutData.metaTitle}</title>
        <meta name="description" content={aboutData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs finalTitle={aboutData.title} />
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
            <img src={photoAbout} alt="photoAbout" />
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

export { AboutCompany };
