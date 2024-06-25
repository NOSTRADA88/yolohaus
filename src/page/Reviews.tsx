import { useEffect, useState } from "react";
import { fetchAboutData, fetchReviewsData } from "../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../constants";

interface PhotoAttributes {
    url: string;
}

interface PhotoData {
    id: number;
    attributes: PhotoAttributes;
}

interface Photo {
    data: PhotoData ;
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

const Reviews = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleAbout, setTitleAbout] = useState<string>('');
    const [slugAbout, setSlugAbout] = useState<string>('');
    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchData = async () => {
        try {
            const reviewsData = await fetchReviewsData();
            const aboutData = await fetchAboutData();

            setMetaTitle(reviewsData.Metadata.MetaTitle);
            setMetaDescription(reviewsData.Metadata.MetaDescription);
            setTitle(reviewsData.Title);
            setTitleAbout(aboutData.Title);
            setSlugAbout(aboutData.slug);
            setReviews(reviewsData.spisok_otzyvovs.data);

        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>

            <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
                    <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">{title}</h1>
                    <div className="flex items-center">
                        <a href="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 ">Главная / </a>
                        <a href={`/${slugAbout}`} className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "> {titleAbout} / </a>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 mt-10 gap-10 max-lg:grid-cols-1 max-lg:gap-8">
                    {reviews.map((review) => (
                        <a href={review.attributes.URL}>
                            <div key={review.id} className="flex justify-center items-center w-full h-full p-10
                             bg-lightwhite  hover:bg-orange cursor-pointer ">
                                <img src={`${API_URL}${review.attributes.Photo.data.attributes.url}`} alt={review.attributes.Title} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Reviews