import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { photoAbout } from "../../assets";
import { AboutProps } from "../../interfaces";

const About = ({ title, information, slugs }: AboutProps) => {
  return (
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 ">
        <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
          {title}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[60%] max-[1111px]:w-full">
            {information?.map((info, index) => (
                <div key={index} className="mt-5 ml-4 w-[85%] max-[1111px]:w-full max-[1111px]:pr-10">
                  {info.description.map((desc, descIndex) => (
                      <div key={descIndex} className="mb-4">
                        {desc.children.map((child, childIndex) => (
                            <p className="font-light text-sm font-museo leading-relaxed text-justify" key={childIndex}>
                              {child.text}
                            </p>
                        ))}
                      </div>
                  ))}
                </div>
            ))}
            <div className=" bg-lightwhite mt-8 p-5">
              <div className="flex justify-start items-center gap-2 cursor-pointer arrow-container">
                <Link to={`/${slugs.about}`} className="text-orange uppercase text-sm font-medium tracking-wider">
                  УЗНАТЬ БОЛЬШЕ{" "}
                </Link>
                <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon"/>
              </div>
            </div>
          </div>
          <div className="mt-6 max-[1111px]:hidden">
            <img src={photoAbout} alt="photoAbout" className="" />
          </div>
        </div>
      </div>
  );
};

export default About;
