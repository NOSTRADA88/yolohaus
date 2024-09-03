import { Link } from "react-router-dom";
import { arrowRight, photoAbout } from "../../assets";
import { AboutProps } from "../../interfaces";
import { slug } from "../../constants";
import {memo} from "react";

const About = memo(({title, information}: AboutProps) => {
  return (
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 ">
        <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
          {title}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[60%] max-[1111px]:w-full">
            <div className=" bg-lightwhite p-5 mt-12">
              <div className="flex items-center">
                <p className="font-light text-xl font-museo leading-normal text-justify">
                  «YOLO HAUS» – строительная компания, которая создает комфортную
                  загородную жизнь.
                </p>
              </div>
            </div>
            {information?.map((info, index) => (
                <div
                    key={index}
                    className="mt-5 ml-4 w-[85%] max-[1111px]:w-full max-[1111px]:pr-10"
                >
                  {info.description.map((desc, descIndex) => (
                      <div key={descIndex} className="mb-4">
                        {desc.children.map((child, childIndex) => (
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
              ))}
      
          <div className=" bg-lightwhite mt-6 p-5">
            <div className="flex justify-start items-center gap-2 cursor-pointer arrow-container">
              <Link
                to={slug.about}
                className="text-orange uppercase text-sm font-medium tracking-wider"
              >
                УЗНАТЬ БОЛЬШЕ{" "}
              </Link>
              <img src={arrowRight} className=" arrow-icon w-5" width={5} height={5} />  
            </div>
          </div>
          </div>
          <div className="mt-12 max-[1111px]:hidden">
            <img
                src={photoAbout}
                alt="photoAbout"
                width={100}
                height={100}
                className="h-[420px]"
            />
          </div>
          
        </div>
      </div>
  );
});

export default About;
