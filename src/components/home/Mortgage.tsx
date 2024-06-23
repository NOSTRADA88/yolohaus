import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { fetchHomeData } from "../../api";
import { API_URL } from "../../constants";

interface Photo {
    id: number;
    attributes: {
        name: string;
        url: string;
    };
}

const Mortgage = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const fetchData = async () => {
        try {
            const mainData = await fetchHomeData();
            setTitle(mainData.Mortgage.Title);
            setDescription(mainData.Mortgage.Description);
            if (mainData.Mortgage.Photos && mainData.Mortgage.Photos.data.length > 0) {
                setPhotos(mainData.Mortgage.Photos.data);
            } else {
                console.error('Данные о фотографиях отсутствуют или имеют неверный формат');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 3000);
        return () => clearInterval(interval);
    }, [photos]);

    const goToNextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
    };

    if (photos.length === 0) {
        return null; 
    }

    return (
        <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16">
            <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">{title}</h1>
            <div className="w-full bg-lightwhite mt-8 p-5 ">
                <div className="flex items-center max-md:flex-col">
                    <div className="w-[55%] max-md:w-full max-md:mb-5">
                        <p className="font-light text-xl font-museo leading-normal text-justify">{description}</p>
                    </div>
                    <div className="slider-container">  
                        <div className="slider">
                            <img
                                src={`${API_URL}${photos[currentIndex].attributes.url}`}
                                alt={photos[currentIndex].attributes.name}
                                className="w-[350px] transition-transform duration-500 ease-in-out max-[1111px]:w-[300px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer arrow-container max-md:mt-5">
                    <a href="/" className="text-orange uppercase text-sm font-medium tracking-wider">Подробнее </a>
                    <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon" /> 
                </div>
            </div>
        </div>
    );
};

export default Mortgage;
