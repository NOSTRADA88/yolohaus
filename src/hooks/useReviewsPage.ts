import {useCallback, useEffect, useState} from "react";
import { ReviewsData } from "../interfaces";
import { fetchReviewsPage } from "../api/reviews";

const useReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchReviewsData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchReviewsPage(signal);
      setReviewsData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error(`unknown error occurred: ${error}`))
      }
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    fetchReviewsData(abortController.signal);
    return () => abortController.abort();
  }, [reviewsData]);

  return {reviewsData, isLoading, error};
};

export default useReviewsPage;
