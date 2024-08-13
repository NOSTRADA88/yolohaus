import { useEffect, useState } from "react";
import { fetchBuiltHousesData, fetchHousesDetailsData } from "../../api";
import { Helmet } from "react-helmet";

import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import { HouseDetailProps, HousesData } from "../../interfaces";

const HousesDetail = ({ houseSlug }: HouseDetailProps) => {
  const [houseData, setHouseData] = useState({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleBuilt: "",
    houses: [] as HousesData[],
  });

  const fetchData = async () => {
    try {
      const houseDetailsData = await fetchHousesDetailsData(houseSlug);
      const builtData = await fetchBuiltHousesData();

      setHouseData({
        metaTitle: houseDetailsData.data[0].attributes.Metadata.MetaTitle,
        metaDescription:
          houseDetailsData.data[0].attributes.Metadata.MetaDescription,
        title: houseDetailsData.data[0].attributes.Title,
        houses: houseDetailsData.data,
        titleBuilt: builtData.title,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbItems = [{ title: houseData.titleBuilt, slug: slug.built }];

  return (
    <div>
      <Helmet>
        <title>{houseData.metaTitle}</title>
        <meta name="description" content={houseData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={houseData.title} />
        <div className="flex flex-col mt-20 max-md:mt-10">
          <div className="flex justify-between max-lg:flex-col">
            <SliderHouses details={houseData.houses} />
            <OptionsHouses details={houseData.houses} />
          </div>
          <AboutHouses details={houseData.houses} />
        </div>
      </div>
    </div>
  );
};

export { HousesDetail };
