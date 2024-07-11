import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

interface DetailsData {
  id: number;
  attributes: {
    Photos: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      }[];
    };
  };
}

type SliderHousesProps = {
  details: DetailsData[];
};

const SliderHouses = ({ details }: SliderHousesProps) => {
  const photos = details.flatMap((detail) =>
    detail.attributes.Photos.data.map((photo) => photo.attributes.url)
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handlePrevClick = () => {
    setActivePhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActivePhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (event.target === event.currentTarget) {
      setIsFullscreen(false);
    }
  };

  const handleFullscreenClick = () => {
    openFullscreen();
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isFullscreen]);

  return (
    <div className="relative pr-10 mb-10 max-xl:pr-5 max-lg:pr-0">
      <div className="w-[700px] h-[500px] relative overflow-hidden max-xl:w-[620px] max-lg:w-full max-md:h-[400px] max-sm:h-[250px]">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`${API_URL}${photo}`}
            alt={`${index}`}
            className="absolute top-0 left-0 w-full h-full object-cover object-center cursor-pointer"
            style={{
              opacity: index === activePhotoIndex ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
            onClick={handleFullscreenClick}
          />
        ))}
        <button
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-300"
        >
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="text-orange arrow-icon"
          />
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-300"
        >
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="text-orange arrow-icon"
          />
        </button>
        <div className="flex justify-center absolute bottom-4 left-0 right-0">
          {photos.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full mx-1 cursor-pointer ${
                index === activePhotoIndex
                  ? "bg-white"
                  : "border-white border-[1px]"
              }`}
              onClick={() => handleThumbnailClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer "
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
          >
            &times;
          </button>
          <button
            onClick={handlePrevClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-300 "
          >
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className="text-orange arrow-icon "
            />
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-300"
          >
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className="text-orange arrow-icon"
            />
          </button>
          <img
            src={`${API_URL}${photos[activePhotoIndex]}`}
            alt={`${activePhotoIndex}`}
            className="max-w-full max-h-full transition duration-500 "
            style={{ cursor: "auto" }}
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 mt-4 overflow-hidden">
        {photos.slice(0, 3).map((_, index) => {
          const thumbnailIndex = (activePhotoIndex + index) % photos.length;
          return (
            <div
              key={index}
              className={`w-full h-32 max-md:h-20 relative cursor-pointer ${
                thumbnailIndex === activePhotoIndex
                  ? "border-2 border-orange"
                  : ""
              }`}
              onClick={() => handleThumbnailClick(thumbnailIndex)}
            >
              <img
                src={`${API_URL}${photos[thumbnailIndex]}`}
                alt={`${thumbnailIndex}`}
                className="w-full h-full object-cover transition duration-500"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderHouses;
