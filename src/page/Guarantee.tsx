import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchGuaranteeData } from "../api";
import { API_URL } from "../constants";


const Guarantee = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleAbout, setTitleAbout] = useState<string>('');
    const [slugAbout, setSlugAbout] = useState<string>('');
    const [titleMini, setTitleMini] = useState<string>('');
    const [description, setDescription] = useState<{ type: string, children: { text: string, type: string }[] }[]>([]);
    const [titleMiniTwo, setTitleMiniTwo] = useState<string>('');
    const [descriptionTwo, setDescriptionTwo] = useState<{ type: string, children: { text: string, type: string }[] }[]>([]);
    const [photoGuarantee, setPhotoGuarantee] = useState<string>('');

    const fetchData = async () => {
        try {
            const guaranteeData = await fetchGuaranteeData();
            const aboutData = await fetchAboutData();

            setMetaTitle(guaranteeData.Metadata.MetaTitle);
            setMetaDescription(guaranteeData.Metadata.MetaDescription);
            setTitle(guaranteeData.Title);
            setTitleAbout(aboutData.Title);
            setSlugAbout(aboutData.slug);
            setTitleMini(guaranteeData.Information[0].Title);
            setTitleMiniTwo(guaranteeData.Information[1].Title);
            setDescription(guaranteeData.Information[0].Description);
            setDescriptionTwo(guaranteeData.Information[1].Description);
            setPhotoGuarantee(guaranteeData.Photo.data.attributes.url)

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
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4 mb-10">
                    <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl ">{title}</h1>
                    <div className="flex items-center">
                        <a href="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 ">Главная / </a>
                        <a href={`/${slugAbout}`} className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "> {titleAbout} / </a>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center max-xl:mt-20 max-md:mt-10 ">
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
                    <div className="mt-6 max-xl:hidden">
                        <img src={`${API_URL}${photoGuarantee}`} alt="photoAbout" className="w-[540px]" />
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

export default Guarantee