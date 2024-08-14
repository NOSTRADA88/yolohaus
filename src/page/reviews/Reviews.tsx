import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { ReviewsData } from "../../interfaces";
import {fetchReviewsPage} from "../../api/reviews";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    reviews: [],
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchReviewsPage();
        setReviewsData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          reviews: response.spisok_otzyvovs.data.map((review: any) => ({
            url: review.attributes.URL,
            title: review.attributes.Title,
            photo: {
              url: review.attributes.Photo.data.attributes.url,
              name: review.attributes.Photo.data.attributes.name
            }})),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{reviewsData.metaTitle}</title>
        <meta name="description" content={reviewsData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs finalTitle={reviewsData.title} />
        <div className="grid grid-cols-3 mt-10 gap-10 max-lg:grid-cols-1 max-lg:gap-8">
          {reviewsData.reviews.map((review, index) => (
            <a
              key={index}
              rel="noopener noreferrer"
              href={review.url}
              target="_blank"
            >
              <div className="flex justify-center items-center w-full h-full p-10 bg-lightwhite hover:bg-orange cursor-pointer">
                <img src={`${API_URL}${review.photo.url}`} alt={review.title}/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Reviews };
