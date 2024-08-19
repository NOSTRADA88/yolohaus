import { Link, useLocation } from "react-router-dom";
import { slug } from "../../constants";
import { AboutHousesProps, DescriptionChild } from "../../interfaces";

const AboutHouses = ({ details }: AboutHousesProps) => {
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
          <p className="text-orange  rotate-180"> ➜ </p>
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
};

export default AboutHouses;
