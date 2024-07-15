import { useEffect, useState } from "react";
import { fetchAboutData, fetchReviewsData } from "../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";

interface PhotoAttributes {
  url: string;
}

interface PhotoData {
  id: number;
  attributes: PhotoAttributes;
}

interface Photo {
  data: PhotoData;
}

interface ReviewAttributes {
  Title: string;
  URL: string;
  Photo: Photo;
}

interface Review {
  id: number;
  attributes: ReviewAttributes;
}

interface ReviewsData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleAbout: string;
  slugAbout: string;
  reviews: Review[];
}

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleAbout: "",
    slugAbout: "",
    reviews: [],
  });

  const fetchData = async () => {
    try {
      const reviewsResponse = await fetchReviewsData();
      const aboutResponse = await fetchAboutData();

      setReviewsData({
        metaTitle: reviewsResponse.Metadata.MetaTitle,
        metaDescription: reviewsResponse.Metadata.MetaDescription,
        title: reviewsResponse.Title,
        titleAbout: aboutResponse.Title,
        slugAbout: aboutResponse.slug,
        reviews: reviewsResponse.spisok_otzyvovs.data,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{reviewsData.metaTitle}</title>
        <meta name="description" content={reviewsData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {reviewsData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${reviewsData.slugAbout}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              {" "}
              {reviewsData.titleAbout} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {reviewsData.title}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10 gap-10 max-lg:grid-cols-1 max-lg:gap-8">
          {reviewsData.reviews.map((review) => (
            <a
              key={review.id}
              rel="noopener noreferrer"
              href={review.attributes.URL}
              target="_blank"
            >
              <div className="flex justify-center items-center w-full h-full p-10 bg-lightwhite hover:bg-orange cursor-pointer">
                <img
                  src={`${API_URL}${review.attributes.Photo.data.attributes.url}`}
                  alt={review.attributes.Title}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
