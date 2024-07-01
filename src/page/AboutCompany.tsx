import { useEffect, useState } from "react";
import { fetchAboutData } from "../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";

const AboutCompany = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleMini, setTitleMini] = useState<string>('');
    const [description, setDescription] = useState<{ type: string, children: { text: string, type: string }[] }[]>([]);
    const [titleMiniTwo, setTitleMiniTwo] = useState<string>('');
    const [descriptionTwo, setDescriptionTwo] = useState<{ type: string, children: { text: string, type: string }[] }[]>([]);
    const [photoAbout, setPhotoAbout] = useState<string>('');

    const fetchData = async () => {
        try {
            const aboutData = await fetchAboutData();
            setMetaTitle(aboutData.Metadata.MetaTitle);
            setMetaDescription(aboutData.Metadata.MetaDescription);
            setTitle(aboutData.Title);
            setTitleMini(aboutData.About.Information[0].Title);
            setTitleMiniTwo(aboutData.About.Information[1].Title);
            setDescription(aboutData.About.Information[0].Description);
            setDescriptionTwo(aboutData.About.Information[1].Description);
            setPhotoAbout(aboutData.About.Photo.data.attributes.url);
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
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4 ">
                    <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">{title}</h1>
                    <div className="flex items-center">
                        <Link to="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300">Главная / </Link>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center max-xl:mt-20 max-md:mt-10">
                    <div className="flex flex-col w-[60%] max-xl:w-full">
                        <div className=" bg-lightwhite p-5">
                            <div className="flex items-center">
                                <p className="font-light text-xl font-museo leading-normal text-justify">{titleMini}</p>
                            </div>
                        </div>
                        {description.map((item, index) => (
                            <div key={index} className="mt-5 ml-4 w-[85%]">
                                {item.children.map((child, childIndex) => (
                                    <p className="font-light text-sm font-museo leading-relaxed text-justify" key={childIndex}>{child.text}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="mt-[66px] max-xl:hidden">
                        <img src={`${API_URL}${photoAbout}`} alt="photoAbout" className="" />
                    </div>
                </div>
                <div className=" bg-lightwhite mt-8 p-5">
                    <div className="flex items-center">
                        <p className="font-light text-xl font-museo leading-normal text-justify">{titleMiniTwo}</p>
                    </div>
                </div>
                {descriptionTwo.map((item, index) => (
                    <div key={index} className="mt-5 ml-4 max-sm:w-[85%]">
                        {item.children.map((child, childIndex) => (
                            <p className="font-light text-sm font-museo leading-relaxed text-justify" key={childIndex}>{child.text}</p>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AboutCompany