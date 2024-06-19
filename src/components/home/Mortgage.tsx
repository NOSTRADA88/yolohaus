import { useEffect, useState } from "react";
import { fetchHomeData } from "../../api";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong  } from "@fortawesome/free-solid-svg-icons";

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

        const interval = setInterval(() => {
            goToNextSlide();
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const goToNextSlide = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="w-full max-w-[1111px] mx-auto mt-20">
            <h1 className="text-maingray font-museo font-bold text-3xl">{title}</h1>
            <div className="w-full bg-lightwhite mt-8 p-5">
                <div className="flex items-center">
                    <div className="w-[55%]">
                        <p className="font-light text-xl font-museo leading-normal text-justify">{description}</p>
                    </div>
                    <div className="slider-container">
                        <div className="slider">
                            {photos.length > 0 && (
                                <img
                                    src={`${API_URL}${photos[currentIndex].attributes.url}`}
                                    alt={photos[currentIndex].attributes.name}
                                    className="w-[350px]"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer  arrow-container">
                  <a href="/" className="text-orange uppercase text-sm font-medium tracking-wider">Подробнее </a>
                    <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon" /> 
                  </div>
            </div>
                          
        </div>
    );
};

export default Mortgage;
