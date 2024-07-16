import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

interface Photo {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
}

interface MortgageProps {
  title: string;
  description: string;
  photos: Photo[];
}

const Mortgage = ({ title, description, photos }: MortgageProps) => {
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16">
      <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
        {title}
      </h1>
      <div className="w-full bg-lightwhite mt-8 p-5">
        <div className="flex items-center max-md:flex-col">
          <div className=" max-md:w-full max-md:mb-5">
            <p className="font-light text-lg font-museo leading-normal text-justify">
              {description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8 max-md:grid-cols-2 max-md:mt-2">
          {photos.map((photo) => (
            <div key={photo.id} className="flex">
              <img
                src={`${API_URL}${photo.attributes.url}`}
                alt={photo.attributes.name}
                className="w-full h-auto object-cover "
              />
            </div>
          ))}
        </div>
        <div className="flex justify-start items-center mt-8 gap-2 cursor-pointer arrow-container ">
          <Link
            to="/"
            className="text-orange uppercase text-sm font-medium tracking-wider"
          >
            Подробнее{" "}
          </Link>
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="text-orange arrow-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Mortgage;
