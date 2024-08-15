import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import { HouseDetailProps } from "../../interfaces";
import useHousesDetailPage from "../../hooks/useHousesDetailPage";

const HousesDetail = ({ houseSlug }: HouseDetailProps) => {
  const houseData = useHousesDetailPage({
    houseSlug: houseSlug || "",
  });
  // const breadcrumbItems = [{ title: "Построенные дома", slug: slug.built }];

  console.log(houseData);
  return (
    <div>
      {/* <Helmet>
        <title>{houseData.metaTitle}</title>
        <meta name="description" content={houseData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={houseData.title} />
        <div className="flex flex-col mt-20 max-md:mt-10">
          <div className="flex justify-between max-lg:flex-col"> */}
      {/* <SliderHouses details={houseData.houses} /> */}
      {/* <OptionsHouses details={houseData.houses} /> */}
      {/* </div> */}
      {/* <AboutHouses details={houseData.houses} /> */}
      {/* </div>
      </div> */}
    </div>
  );
};

export { HousesDetail };
