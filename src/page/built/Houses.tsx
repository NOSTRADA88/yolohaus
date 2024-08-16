import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { Project } from "../../interfaces";
import useHousesPage from "../../hooks/useHousesPage";

const Houses = () => {
  const [visibleHouses, setVisibleHouses] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastHouseRef = useRef<HTMLAnchorElement | null>(null);

  const housesPerPage = 9;

  const {housesData, isLoading, error} = useHousesPage();
  // TODO вынести логику, добавить обработку isLoading и ошибки!!!!!!
  const loadMoreHouses = useCallback(() => {
    if (!housesData || isEndOfList || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const newHouses = housesData.houses.slice(
      currentPage * housesPerPage,
      nextPage * housesPerPage
    );

    if (newHouses.length > 0) {
      setVisibleHouses((prevHouses) => [...prevHouses, ...newHouses]);
      setCurrentPage(nextPage);
    }

    if (newHouses.length < housesPerPage) {
      setIsEndOfList(true);
    }
    setIsLoadingMore(false);
  }, [currentPage, housesData, isEndOfList, isLoadingMore]);

  const handleScroll = useCallback(() => {
    if (!lastHouseRef.current || isEndOfList || isLoadingMore) return;

    const lastHouseRect = lastHouseRef.current.getBoundingClientRect();
    if (lastHouseRect.bottom <= window.innerHeight) {
      loadMoreHouses();
    }
  }, [isEndOfList, loadMoreHouses, isLoadingMore]);

  useEffect(() => {
    if (housesData) {
      const initialHouses = housesData.houses.slice(0, housesPerPage);
      setVisibleHouses(initialHouses);
      setIsEndOfList(initialHouses.length >= housesData.houses.length);
    }
  }, [housesData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!housesData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{housesData.metadata.title}</title>
        <meta name="description" content={housesData.metadata.description} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <Breadcrumbs finalTitle={housesData.title} />
        <div className="grid grid-cols-3 gap-20 mt-10 max-xl:gap-10 max-lg:grid-cols-2 max-lg:gap-14 max-sm:grid-cols-1">
          {visibleHouses.map((house, index) => (
            <Link
              to={`${slug.built}/${house.slug}`}
              key={house.slug}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-full h-[375px] max-md:h-full max-[350px]:w-[280px] transition-all duration-300 hover:shadow-2xl group"
              ref={index === visibleHouses.length - 1 ? lastHouseRef : null}
            >
              <div className="relative max-w-full overflow-hidden">
                <img
                  src={`${API_URL}${house.photos[0].url}`}
                  alt={house.photos[0].name}
                  className="w-full h-[220px] max-xl:w-full max-lg:object-center max-lg:object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <div className="p-4">
                <h2 className="font-museo font-bold text-2xl text-maingray">
                  {house.title}
                </h2>
                <div className="flex gap-[9px] mt-4 flex-col">
                  <div className="flex gap-10">
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${housesData.icons[0].url}`}
                        alt="Width and Height"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {house.parameters.houseArea}
                      </p>
                    </div>
                    <div className="flex gap-[4px]">
                      <img
                        src={`${API_URL}${housesData.icons[1].url}`}
                        alt="Construction Period"
                        className="w-4 h-4"
                      />
                      <p className="font-museo font-light text-sm text-maingray">
                        {house.parameters.constructionPeriod} дней
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-[4px] mt-2">
                    <img
                      src={`${API_URL}${housesData.icons[2].url}`}
                      alt="Location"
                      className="w-4 h-4"
                    />
                    <p className="font-museo font-light text-sm text-maingray mr-2">
                      {house.parameters.location}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {isLoadingMore && (
          <div className="flex justify-center items-center mt-8 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Houses };
