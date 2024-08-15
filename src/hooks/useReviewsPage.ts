import { useEffect, useState } from "react";
import { ReviewsData } from "../interfaces";
import { fetchReviewsPage } from "../api/reviews";

const useReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData>();
  useEffect(() => {
    const fetchReviewsData = async () => {
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
              name: review.attributes.Photo.data.attributes.name,
            },
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchReviewsData();
  }, []);
  return reviewsData;
};

export default useReviewsPage;
