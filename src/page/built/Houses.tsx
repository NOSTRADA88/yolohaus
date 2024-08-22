import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import usePaginatedItems from "../../hooks/usePaginatedItems"; // Import the generalized hook
import useHousesPage from "../../hooks/useHousesPage"; // Hook to fetch houses data

const Houses = () => {
  const { housesData, isLoading, error } = useHousesPage();
  const {
    visibleItems: visibleHouses,
    isEndOfList,
    lastItemRef,
  } = usePaginatedItems({
    items: housesData ? housesData.houses : [],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!housesData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      {visibleHouses.length > 0 && (
        <Helmet>
          <title>{housesData.metadata.title}</title>
          <meta name="description" content={housesData.metadata.description} />
          {housesData.houses.map(house => (
              <link rel="preload" href={`${API_URL}${house.photos[0].url}`} as="image"/>
          ))}
        </Helmet>
      )}
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <Breadcrumbs finalTitle={housesData.title} />
        <div className="grid grid-cols-3 gap-20 mt-10 max-xl:gap-10 max-lg:grid-cols-2 max-lg:gap-14 max-md:grid-cols-1">
          {visibleHouses.map((house, index) => (
            <div
              key={house.slug}
              className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] transition-all duration-300 hover:shadow-2xl group "
              ref={index === visibleHouses.length - 1 ? lastItemRef : null}
            >
              <Link to={`${slug.built}/${house.slug}`}>
                <div className="relative overflow-hidden h-[200px] flex items-center justify-center max-md:h-[400px] max-sm:h-auto">
                  <img
                    src={`${API_URL}${house.photos[0].url}`}
                    alt={house.photos[0].name}
                    width={350}
                    height={200}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125"
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
            </div>
          ))}
        </div>
        {!isEndOfList && (
          <div className="flex justify-center items-center mt-8 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Houses };
