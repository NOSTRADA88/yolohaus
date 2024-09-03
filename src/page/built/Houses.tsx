
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useHousesPage from "../../hooks/useHousesPage";
import usePaginatedItems from "../../hooks/usePaginatedItems";
import { API_URL } from "src/constants";
import { ProjectList } from "src/components/projects";

const Houses = () => {
  const { housesData, isLoading, error } = useHousesPage();
  const { visibleItems: visibleHouses, isEndOfList, lastItemRef } = usePaginatedItems({
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
        <div className="text-gray-500 text-lg font-museo">
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
              <link rel="prefetch" href={`${API_URL}${house.photos[0].url}`} as="image" type="image/webp"/>
          ))}
        </Helmet>
      )}
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
        <Breadcrumbs finalTitle={housesData.title} />
        <ProjectList
          projects={visibleHouses.map((house, index) => ({
            ...house,
            lastItemRef: index === visibleHouses.length - 1 ? lastItemRef : null
          }))}
          icons={housesData.icons}
          itemType="built"
        />
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
