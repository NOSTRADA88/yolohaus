import { useEffect, useState } from "react";
import { fetchBuiltHousesData, fetchProjectsData } from "../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";

const BuiltHouses = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const fetchData = async () => {
        try {
            const builtData = await fetchBuiltHousesData();
            setMetaTitle(builtData.Metadata.MetaTitle);
            setMetaDescription(builtData.Metadata.MetaDescription);
            setTitle(builtData.title);

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
            </Helmet> <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4 mb-10 max-sm:mb-5">
                    <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl ">{title}</h1>
                    <div className="flex items-center">
                        <Link to="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 ">Главная / </Link>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div></div>
        </div>
    )
}

export default BuiltHouses