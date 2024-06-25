import { useEffect, useState } from "react";
import { fetchAboutData, fetchReviewsData } from "../api";
import { Helmet } from "react-helmet";


const Reviews = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleAbout, setTitleAbout] = useState<string>('');
    const [slugAbout, setSlugAbout] = useState<string>('');

    const fetchData = async () => {
        try {
            const reviewsData = await fetchReviewsData();
            const aboutData = await fetchAboutData();

            setMetaTitle(reviewsData.Metadata.MetaTitle);
            setMetaDescription(reviewsData.Metadata.MetaDescription);
            setTitle(reviewsData.Title);
            setTitleAbout(aboutData.Title);
            setSlugAbout(aboutData.slug);

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
            </div>
        </div>
    )
}

export default Reviews