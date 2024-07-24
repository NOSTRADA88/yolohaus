import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Youtube } from "../../assets";

interface PhotoData {
  id: number;
  attributes: {
    url: string;
  };
}

interface YouTubeData {
  url: string;
  title: string;
  thumbnail: string;
  mime: string;
  rawData: {
    html: string;
  };
}

interface DetailsData {
  id: number;
  attributes: {
    Photos: {
      data: PhotoData[];
    };
    YouTube?: string;
  };
}

type MediaItem = PhotoMediaItem | VideoMediaItem;

interface PhotoMediaItem {
  type: "photo";
  url: string;
}

interface VideoMediaItem {
  type: "video";
  url: string;
  thumbnail: string;
  embedHtml: string;
}

type SliderHousesProps = {
  details: DetailsData[];
};

const SliderHouses = ({ details }: SliderHousesProps) => {
  const mediaItems: MediaItem[] = details.flatMap((detail) => {
    const photos: PhotoMediaItem[] = detail.attributes.Photos.data.map(
      (photo) => ({
        type: "photo",
        url: photo.attributes.url,
      })
    );

    const youTubeData: YouTubeData | null = detail.attributes.YouTube
      ? JSON.parse(detail.attributes.YouTube)
      : null;

    const videos: VideoMediaItem[] = youTubeData
      ? [
          {
            type: "video",
            url: youTubeData.url,
            thumbnail: youTubeData.thumbnail,
            embedHtml: youTubeData.rawData.html
              .replace(/width="\d+"/, 'width="100%"')
              .replace(/height="\d+"/, 'height="100%"'),
          },
        ]
      : [];

    return [...photos, ...videos];
  });

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenOpacity, setFullscreenOpacity] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveMediaIndex(index);
  };

  const handlePrevClick = () => {
    setFullscreenOpacity(0);
    setTimeout(() => {
      setActiveMediaIndex((prevIndex) =>
        prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
      );
      setFullscreenOpacity(1);
    }, 300);
  };

  const handleNextClick = () => {
    setFullscreenOpacity(0);
    setTimeout(() => {
      setActiveMediaIndex((prevIndex) =>
        prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
      );
      setFullscreenOpacity(1);
    }, 300);
  };

  const openFullscreen = () => {
    setFullscreenOpacity(1);
    setIsFullscreen(true);
  };

  const closeFullscreen = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (event.target === event.currentTarget) {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isFullscreen]);

  return (
    <div className="relative pr-5 mb-10 max-xl:pr-5 max-lg:pr-0">
      <div className="w-[750px] h-[450px] relative overflow-hidden max-xl:w-[620px] max-lg:w-full max-md:h-[400px] max-sm:h-[250px]">
        {mediaItems.map((media, index) => {
          if (media.type === "photo") {
            return (
              <img
                key={index}
                src={`${API_URL}${media.url}`}
                alt={`${index}`}
                className="absolute top-0 left-0 w-full h-full object-center cursor-pointer max-sm:object-cover"
                style={{
                  opacity: index === activeMediaIndex ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
                onClick={() => openFullscreen()}
              />
            );
          } else if (media.type === "video") {
            return (
              <div
                key={index}
                className="absolute top-0 left-0 flex justify-center items-center cursor-pointer w-full h-full max-sm:object-cover"
                style={{
                  opacity: index === activeMediaIndex ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
                onClick={() => openFullscreen()}
              >
                <img
                  src={media.thumbnail}
                  alt={`Thumbnail for video ${index}`}
                  className="w-full h-full transition duration-500"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                  <img src={Youtube} className="w-20" alt="youtube" />
                </div>
              </div>
            );
          }
          return null;
        })}
        <button
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-300"
          aria-label="Left"
        >
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="text-orange arrow-icon"
          />
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F8F8F8] bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-300"
          aria-label="Right"
        >
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="text-orange arrow-icon"
          />
        </button>
        <div className="flex justify-center absolute bottom-4 left-0 right-0">
          {mediaItems.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full mx-1 cursor-pointer ${
                index === activeMediaIndex
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
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer p-20 max-sm:p-5"
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
          {mediaItems[activeMediaIndex].type === "photo" ? (
            <img
              src={`${API_URL}${mediaItems[activeMediaIndex].url}`}
              alt={`${activeMediaIndex}`}
              className="max-w-full max-h-full "
              style={{
                opacity: fullscreenOpacity,
                transition: "opacity 0.5s ease-in-out",
                cursor: "auto",
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: (mediaItems[activeMediaIndex] as VideoMediaItem)
                  .embedHtml,
              }}
              className="w-full h-full"
            />
          )}
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 mt-4 overflow-hidden">
        {mediaItems.slice(0, 3).map((_, index) => {
          const thumbnailIndex = (activeMediaIndex + index) % mediaItems.length;
          return (
            <div
              key={index}
              className={`w-full h-32 max-md:h-20 relative cursor-pointer ${
                thumbnailIndex === activeMediaIndex
                  ? "border-2 border-orange"
                  : ""
              }`}
              onClick={() => handleThumbnailClick(thumbnailIndex)}
            >
              {mediaItems[thumbnailIndex].type === "photo" ? (
                <img
                  src={`${API_URL}${mediaItems[thumbnailIndex].url}`}
                  alt={`${thumbnailIndex}`}
                  className="w-full h-full  transition duration-500 max-sm:object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={
                      (mediaItems[thumbnailIndex] as VideoMediaItem).thumbnail
                    }
                    alt={`thumbnail-${thumbnailIndex}`}
                    className="w-full h-full  transition duration-500 max-sm:object-cover"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={Youtube} className="w-14" alt="youtube" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderHouses;
