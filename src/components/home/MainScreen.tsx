import { useEffect, useState } from "react";
import { fetchHomeData } from "../../api";
import { API_URL } from "../../constants";
import { Modal } from "../../sections/modal";

type MainScreenProps = {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
};

const MainScreen = ({ isModalOpen, closeModal, openModal }: MainScreenProps) => {
    const [mainBanner, setMainBanner] = useState<string>('');
    const [titlePart1, setTitlePart1] = useState<string>('');
    const [titlePart2, setTitlePart2] = useState<string>('');

    const fetchData = async () => {
        try {
            const mainData = await fetchHomeData();
            setMainBanner(mainData.Greetings.Photo.data.attributes.url);
            const title = mainData.Greetings.Title;
            const splitIndex = title.indexOf('Дом вашей мечты');
            if (splitIndex !== -1) {
                setTitlePart1(title.substring(0, splitIndex + 15));
                setTitlePart2(title.substring(splitIndex + 15));
            } else {
                setTitlePart1(title);
                setTitlePart2('');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="relative">
            <div className="h-[472px] bg-cover bg-center relative max-xl:h-[350px] max-md:h-[300px] " style={{ backgroundImage: `url(${API_URL}${mainBanner})` }}>
                <div className="absolute inset-0 bg-[#2B2A29] opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <h1 className="text-white font-bold text-center ">
                        <span className="text-4xl font-museo max-xl:text-3xl max-xl:leading-normal ">{titlePart1}</span>
                        <br />
                        <span className="text-3xl font-museo max-xl:text-2xl max-md:text-xl">{titlePart2}</span>
                    </h1>
                    <div className="flex gap-[3.5px] items-center mt-24 max-xl:mt-10 max-md:mt-8" onClick={openModal}>
                        <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                        <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange text-white transform parallelogram w-[187px] h-10 border-[1px] border-orange">
                            <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">заказать проект</p>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal closeModal={closeModal} />
            )}
        </div>
    )
}

export default MainScreen

