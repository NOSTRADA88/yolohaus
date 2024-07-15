import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
interface DescriptionItem {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}
interface AboutProps {
  title: string;
  titleMini: string;
  description: DescriptionItem[];
  photo: string;
  slug: string;
}

const About = ({ title, titleMini, description, photo, slug }: AboutProps) => {
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 ">
      <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
        {title}
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-[60%] max-xl:w-full">
          <div className=" bg-lightwhite mt-8 p-5">
            <div className="flex items-center">
              <p className="font-light text-xl font-museo leading-normal text-justify">
                {titleMini}
              </p>
            </div>
          </div>
          {description.map((item, index) => (
            <div key={index} className="mt-5 ml-4 w-[85%] ">
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
          <div className=" bg-lightwhite mt-8 p-5">
            <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer arrow-container">
              <Link
                to={`/${slug}`}
                className="text-orange uppercase text-sm font-medium tracking-wider"
              >
                УЗНАТЬ БОЛЬШЕ{" "}
              </Link>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="text-orange arrow-icon"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 max-xl:hidden">
          <img src={`${API_URL}${photo}`} alt="photoAbout" className="" />
        </div>
      </div>
    </div>
  );
};

export default About;
