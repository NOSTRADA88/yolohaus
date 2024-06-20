import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fetchHomeData } from "../../api";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";


const About = () => {
    const [title, setTitle] = useState<string>('');
    const [titleMini, setTitleMini] = useState<string>('');
    const [description, setDescription] = useState<{ type: string, children: { text: string, type: string }[] }[]>([]);
    const [photoAbout, setPhotoAbout] = useState<string>('');
    const fetchData = async () => {
        try {
            const mainData = await fetchHomeData();
            setTitle(mainData.About.Title);
            setTitleMini(mainData.About.Information[0].Title);
            setDescription(mainData.About.Information[0].Description);
            setPhotoAbout(mainData.About.Photo.data.attributes.url)

        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full max-w-[1111px] mx-auto mt-20">
            <h1 className="text-maingray font-museo font-bold text-3xl">{title}</h1>
            <div className="flex justify-between items-center">
                <div className="flex flex-col w-[60%] ">
                    <div className=" bg-lightwhite mt-8 p-5">
                        <div className="flex items-center">
                            <div className="">
                                <p className="font-light text-xl font-museo leading-normal text-justify">{titleMini}</p>
                            </div>
                        </div>
                    </div>
                    {description.map((item, index) => (
                        <div key={index} className="mt-5 ml-4 w-[85%]">
                            {item.children.map((child, childIndex) => (
                                <p className="font-light text-sm font-museo leading-relaxed text-justify" key={childIndex}>{child.text}</p>
                            ))}
                        </div>
                    ))}
                    <div className=" bg-lightwhite mt-8 p-5">
                        <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer  arrow-container">
                            <a href="/" className="text-orange uppercase text-sm font-medium tracking-wider">УЗНАТЬ БОЛЬШЕ </a>
                            <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon" />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <img src={`${API_URL}${photoAbout}`} alt="photoAbout" className="" />
                </div>
            </div>
        </div>

    )
}

export default About