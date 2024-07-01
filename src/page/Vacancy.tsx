import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchHeaderFooterData, fetchVacancyData } from "../api";
import { Switch } from "../components/vacancy";
import { BgVacancy } from "../assets";
import { Modal } from "../sections/modal";
import { Link } from "react-router-dom";

type ListItem = {
    type: string;
    children: {
        text: string;
        type: string;
    }[];
};

type VacancyAttribute = {
    Title: string;
    Responsibilities: {
        type: string;
        format: string;
        children: ListItem[];
    }[];
    WorkingConditions: {
        type: string;
        format: string;
        children: ListItem[];
    }[];
    Requirements: {
        type: string;
        format: string;
        children: ListItem[];
    }[];
};

type Vacancy = {
    id: number;
    attributes: VacancyAttribute;
};


interface PhoneNumberLinkProps {
    phoneNumber: string;
}

const Vacancy = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleAbout, setTitleAbout] = useState<string>('');
    const [slugAbout, setSlugAbout] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('activeVacancies');
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [openVacancy, setOpenVacancy] = useState<number | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const vacancyData = await fetchVacancyData();
            const aboutData = await fetchAboutData();

            setMetaTitle(vacancyData.Metadata.MetaTitle);
            setMetaDescription(vacancyData.Metadata.MetaDescription);
            setTitle(vacancyData.Title);
            setTitleAbout(aboutData.Title);
            setSlugAbout(aboutData.slug);
            setVacancies(vacancyData.vacancies.data);

            const mainData = await fetchHeaderFooterData();
            setPhoneNumber(mainData.Header.PhoneNumber.PhoneNumber);
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function formatPhoneNumber(phoneNumber: string) {
        const countryCode = "+7";
        const areaCode = phoneNumber.slice(2, 5);
        const firstPart = phoneNumber.slice(5, 8);
        const secondPart = phoneNumber.slice(8, 10);
        const thirdPart = phoneNumber.slice(10, 12);

        return (
            <a href={`tel:${phoneNumber}`} className="text-white cursor-pointer transition-all duration-300 font-museo underline
           text-base font-light hover:text-orange max-sm:text-sm">
                {countryCode} ({areaCode}) <span> </span>
                {firstPart}-{secondPart}-{thirdPart}
            </a>
        );
    }

    const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = ({ phoneNumber }) => {
        return formatPhoneNumber(phoneNumber);
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>

            <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
                    <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">{title}</h1>
                    <div className="flex items-center">
                        <Link to="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 ">Главная / </Link>
                        <Link to={`/${slugAbout}`} className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "> {titleAbout} / </Link>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div>
                <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'activeVacancies' && (
                    <div>
                        {vacancies.map((vacancy) => (
                            <div key={vacancy.id} className="mt-4">
                                <div
                                    className="cursor-pointer bg-white border-lightwhite border-2 p-4 rounded"
                                    onClick={() => setOpenVacancy(openVacancy === vacancy.id ? null : vacancy.id)}
                                >
                                    <h2 className="font-museo text-base text-maingray font-bold ">{vacancy.attributes.Title}</h2>
                                </div>
                                {openVacancy === vacancy.id && (
                                    <div className="mt-2 bg-white p-4 rounded shadow">
                                        <h3 className="font-museo text-sm font-bold mb-2">Обязанности:</h3>
                                        <ul className="custom-list">
                                            {vacancy.attributes.Responsibilities[0].children.map((item, index) => (
                                                <li key={index} className="font-museo text-sm leading-relaxed font-light mb-2">{item.children[0].text}</li>
                                            ))}
                                        </ul>
                                        <h3 className="font-museo text-sm font-bold mb-2 mt-4">Условия работы:</h3>
                                        <ul className="custom-list">
                                            {vacancy.attributes.WorkingConditions[0].children.map((item, index) => (
                                                <li key={index} className="font-museo text-sm leading-relaxed font-light mb-2">{item.children[0].text}</li>
                                            ))}
                                        </ul>
                                        <h3 className="font-museo text-sm font-bold mb-2 mt-4">Требования:</h3>
                                        <ul className="custom-list">
                                            {vacancy.attributes.Requirements[0].children.map((item, index) => (
                                                <li key={index} className="font-museo text-sm leading-relaxed font-light mb-2">{item.children[0].text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'teams' && (
                    <div>
                        <p className="font-museo text-maingray font-light text-sm max-sm:text-xs">Наша компания открыта для талантливых специалистов и профессионалов, влюблённых в своё дело! Мы всегда рады новым бригадам и прорабам.</p>
                        <div className="relative">
                            <div className=" mt-4 bg-cover bg-center p-28 max-sm:p-32" style={{ backgroundImage: `url(${BgVacancy})` }}>
                                <div className="absolute inset-0 bg-maingray bg-opacity-50 flex items-center justify-center">
                                    <div className="flex flex-col justify-center items-center gap-5">
                                        <h2 className="text-white text-center text-base max-xl:px-10 max-sm:text-sm">
                                            Свяжитесь с нами по номеру  <PhoneNumberLink phoneNumber={phoneNumber} />, и специалисты «Yolo Haus» помогут вам выбрать дом вашей мечты. <br />
                                            Или оставьте заявку, и мы свяжемся с вами в кратчайшие сроки.
                                        </h2>
                                        <div className="flex gap-[3.5px] items-center mb-4" onClick={openModal}>
                                            <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                                            <div className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange text-white 
                                            hover:text-maingray transform parallelogram w-[172px] h-10 border-[1px] border-orange">
                                                <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram ">Напишите нам</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <Modal closeModal={closeModal} />
            )}
        </div>
    );
}

export default Vacancy;
