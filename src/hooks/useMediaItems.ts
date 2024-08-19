import { useState, useEffect } from "react";
import { MediaItem, Photo, SliderHousesProps, VideoMediaItem, YouTubeData } from "../interfaces";

export const useMediaItems = (details: SliderHousesProps["details"]) => {
  const mediaItems: MediaItem[] = details.flatMap((detail) => {
    const photos: Photo[] = detail.photos.map((photo) => ({
      type: "photo",
      url: photo.url,
      name: photo.name,
      width: photo.width,
      height: photo.height,
    }));

    const youTubeData: YouTubeData | null = detail.youtube || null;

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

  return {
    mediaItems,
    activeMediaIndex,
    isFullscreen,
    fullscreenOpacity,
    handleThumbnailClick,
    handlePrevClick,
    handleNextClick,
    openFullscreen,
    closeFullscreen,
  };
};
