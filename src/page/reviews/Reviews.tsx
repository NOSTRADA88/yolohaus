import React from "react";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useReviewsPage from "../../hooks/useReviewsPage";

const Reviews: React.FC = () => {
    const reviewsData = useReviewsPage();

    if (!reviewsData) {
        return (
            <div className="flex justify-center items-center mt-8 mb-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
            </div>
        );
    }

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
                                <img src={`${API_URL}${review.photo.url}`} alt={review.title} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;
