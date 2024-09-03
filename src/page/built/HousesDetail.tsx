import { Helmet } from "react-helmet";
import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import {API_URL, slug} from "../../constants";
import { HouseDetailProps } from "../../interfaces";
import useHousesDetailPage from "../../hooks/useHousesDetailPage";
import { useInView } from "react-intersection-observer";

const HousesDetail = ({ houseSlug }: HouseDetailProps) => {
  const { houseData, isLoading, error } = useHousesDetailPage({
    houseSlug: houseSlug || "",
  });
  const { ref: refAbout, inView: inViewAbout } = useInView({
    triggerOnce: true,
  });
  const breadcrumbItems = [{ title: "Построенные дома", slug: slug.built }];

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

  if (!houseData) {
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
      <Helmet>
        <title>{houseData.metadata.title}</title>
        <meta name="description" content={houseData.metadata.description} />
        {houseData.photos.map(photo => (
            <link rel="prerender" href={`${API_URL}${photo.url}`} as="image" type="image/webp"/>
        ))}
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={houseData.title} />
        <div className="flex flex-col mt-20 max-md:mt-10">
          <div className="flex justify-between max-lg:flex-col">
            <SliderHouses details={[houseData]} />
            <OptionsHouses details={[houseData]} />
          </div>
          <div ref={refAbout}>
            {inViewAbout && <AboutHouses details={[houseData]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousesDetail;
