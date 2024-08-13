import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  title?: string;
  slug?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  finalTitle: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, finalTitle }) => {
  return (
    <div className="flex justify-between max-xl:flex-col max-xl:gap-4">
      <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl ">
        {finalTitle}
      </h1>
      <div className="flex items-center max-[450px]:flex-wrap max-[450px]:justify-start">
        <Link
          to="/"
          className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
        >
          Главная /{" "}
        </Link>
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {item.slug ? (
              <Link
                to={item.slug}
                className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
              >
                {item.title} /{" "}
              </Link>
            ) : (
              <span className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
                {item.title} /{" "}
              </span>
            )}
          </React.Fragment>
        ))}
        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
          {finalTitle}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Breadcrumbs);
