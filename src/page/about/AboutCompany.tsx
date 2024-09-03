import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useAboutPage from "../../hooks/useAboutPage";
import {photoAbout} from "../../assets";

const AboutCompany = () => {
  const { aboutData, isLoading, error } = useAboutPage();

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

  if (!aboutData) {
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
        <title>{aboutData.metadata.title}</title>
        <meta name="description" content={aboutData.metadata.description} />
        <link rel="prefetch" href={photoAbout} as="image" type="image/webp"/>
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
            <img src={photoAbout} alt="photoAbout" width={100} height={100} />
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
