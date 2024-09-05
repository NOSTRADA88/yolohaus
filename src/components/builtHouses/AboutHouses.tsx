import { Link, useLocation } from "react-router-dom";
import { slug } from "../../constants";
import { AboutHousesProps, DescriptionChild } from "../../interfaces";
import { arrowRight } from "src/assets";
import {memo} from "react";

const AboutHouses = memo(({ details }: AboutHousesProps) => {
  const location = useLocation();

  const isProjectsPage = location.pathname.includes("/projects");
  const isBuiltPage = location.pathname.includes("/built");

  const linkTo = isProjectsPage
    ? slug.projects
    : isBuiltPage
    ? slug.built
    : "/";

  return (
    <div id="more">
      <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mb-5">
        О проекте
      </h2>
      {details[0]?.description?.map((block, index) => {
        return (
          <p
            key={index}
            className="font-museo font-light text-base text-maingray text-justify mb-5"
          >
            {block.children.map((child: DescriptionChild, childIndex) => (
              <span
                key={childIndex}
                className={`${child.bold ? "font-bold" : ""} `}
              >
                {child.text}
              </span>
            ))}
          </p>
        );
      })}
      <div className=" bg-lightwhite p-5 w-60 max-md:w-full mt-10">
        <div className="flex justify-start items-center gap-2 cursor-pointer  arrow-container ">
          
          <img src={arrowRight} className=" arrow-icon w-5  rotate-180" width={5} height={5}  alt="arrow"/>  
          <Link
            to={`${linkTo}`}
            className="text-orange uppercase text-sm font-medium tracking-wider  max-md:text-xs"
          >
            Назад к проектам
          </Link>
        </div>
      </div>
    </div>
  );
});

export default AboutHouses;
