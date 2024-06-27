import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {

  }, [slug]);

  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">ServiceDetail</div>
  );
}

export default ServiceDetail;
