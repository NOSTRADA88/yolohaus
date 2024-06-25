import { useEffect, useState } from "react";
import { fetchProjectsData } from "../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";


interface PhotoFormats {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

interface PhotoAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        large: PhotoFormats;
        small: PhotoFormats;
    };
}

interface Photo {
    id: number;
    attributes: PhotoAttributes;
}

interface ProjectAttributes {
    Title: string;
    isRecommended: boolean;
    slug: string;
    Photos: {
        data: Photo[];
    };
    Parameters: {
        id: number;
        HouseArea: string;
        BuiltUpArea: string;
        Floors: number;
        KitchenLivingRoomArea: string;
        Bedrooms: number;
        Toilets: number;
        TerraceAndPorchArea: string;
        Width: string;
        Height: string;
        ConstructionPeriod: string;
    };
    Complectation: {
        id: number;
        Description: {
            type: string;
            children: {
                text: string;
                type: string;
            }[];
        }[];
        BasePrice: string;
        StandartPrice: string;
        ComfortPrice: string;
    }[];
}

interface Project {
    id: number;
    attributes: ProjectAttributes;
}


interface Complectation {
    id: number;
    BasePrice: string;
    StandartPrice: string;
    ComfortPrice: string;
}

const Projects = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [HouseArea, setHouseArea] = useState<string>('');
    const [WidthHeight, setWidthHeight] = useState<string>('');
    const [ConstructionPeriod, setConstructionPeriod] = useState<string>('');
    const [Bedrooms, setBedrooms] = useState<string>('');
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [sortByArea, setSortByArea] = useState(false);
    const [sortByPrice, setSortByPrice] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const projectsPerPage = 6;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
        
    const renderPagination = () => {
        if (totalPages <= 1) {
            return null; 
        }
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    className={`cursor-pointer font-museo text-sm text-maingray  ${currentPage === i ? 'bg-orange text-white  px-2 py-1 font-bold' : 'hover:text-orange'}`}
                    onClick={() => paginate(i)}
                >
                    {i}
                </span>
            );
        }
        return (
            <div className="flex  justify-center items-center mt-20 gap-4">
                <span
                    className="cursor-pointer font-museo text-sm text-maingray hover:text-orange"
                    onClick={() => paginate(currentPage - 1)}
                >
                      <FontAwesomeIcon icon={faArrowLeftLong} className="arrow-icon" />     предыдущая страница
                </span>
                {pageNumbers}
                <span
                    className="cursor-pointer font-museo text-sm text-maingray hover:text-orange"
                    onClick={() => paginate(currentPage + 1)}
                >
                    следующая страница    <FontAwesomeIcon icon={faArrowRightLong} className="arrow-icon" />
                </span>
            </div>
        );
    };
    
    const fetchData = async () => {
        try {
            const projectsData = await fetchProjectsData();
            setMetaTitle(projectsData.Metadata.MetaTitle);
            setMetaDescription(projectsData.Metadata.MetaDescription);
            setTitle(projectsData.Title);
            setProjects(projectsData.spisok_proektovs.data);
            setHouseArea(projectsData.Icons.data[0].attributes.url);
            setConstructionPeriod(projectsData.Icons.data[1].attributes.url);
            setWidthHeight(projectsData.Icons.data[2].attributes.url);
            setBedrooms(projectsData.Icons.data[3].attributes.url);

        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleSortingByPopularity = () => {
        setSortByPopularity(!sortByPopularity);
        setSortByArea(false);
        setSortByPrice(false);
    };

    const toggleSortingByArea = () => {
        setSortByArea(!sortByArea);
        setSortByPopularity(false);
        setSortByPrice(false);
    };

    const toggleSortingByPrice = () => {
        setSortByPrice(!sortByPrice);
        setSortByArea(false);
        setSortByPopularity(false);
    };

    const getMinPrice = (complectation: Complectation[]): number => {
        const prices = complectation.map(item =>
            Math.min(
                parseInt(item.BasePrice, 10),
                parseInt(item.StandartPrice, 10),
                parseInt(item.ComfortPrice, 10)
            )
        );
        return Math.min(...prices);
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('ru-RU');
    };

    return (
        <div>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-20 max-md:mb-28">
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4 mb-10 max-sm:mb-5">
                    <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl ">{title}</h1>
                    <div className="flex items-center">
                        <a href="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 ">Главная / </a>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 max-sm:flex-col  max-sm:items-start max-sm:gap-4">
                    <h2 className="font-museo text-base text-maingray text-opacity-50">Сортировать по:</h2>
                    <div className="flex  gap-8 max-sm:gap-4   max-sm:items-start ">
                        <p className="font-museo text-sm text-maingray
                 text-opacity-90 cursor-pointer underline decoration-dashed transition-all duration-300 hover:text-orange"  onClick={toggleSortingByPopularity}> Популярности{' '}
                            {sortByPopularity ? (
                                <span>&#9650;</span>
                            ) : (
                                <span>&#9660;</span>
                            )}</p>
                        <p className="font-museo text-sm text-maingray
                 text-opacity-90 cursor-pointer underline decoration-dashed transition-all duration-300 hover:text-orange"  onClick={toggleSortingByArea}> Площади{' '}
                            {sortByArea ? (
                                <span>&#9650;</span>
                            ) : (
                                <span>&#9660;</span>
                            )}</p>
                        <p className="font-museo text-sm text-maingray
                 text-opacity-90 cursor-pointer underline decoration-dashed transition-all duration-300 hover:text-orange"  onClick={toggleSortingByPrice}> Цене{' '}
                            {sortByPrice ? (
                                <span>&#9650;</span>
                            ) : (
                                <span>&#9660;</span>
                            )}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 mt-10">
                    {currentProjects.map(project => (
                        <div
                            key={project.id}
                            className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5]
                             w-[350px] h-[360px] transition-all duration-300 hover:shadow-2xl max-[350px]:w-[280px] max-[350px]:h-[380px]">
                            <img
                                src={`${API_URL}${project.attributes.Photos.data[0].attributes.formats.large.url}`}
                                alt={project.attributes.Photos.data[0].attributes.name}
                                className="object-cover  w-[350px] h-[180px]"
                            />
                            <div className="p-4">
                                <h2 className="font-museo font-bold text-2xl text-maingray">{project.attributes.Title}</h2>
                                <div className="flex gap-3 mt-4">
                                    <div className="flex gap-2">
                                        <img src={`${API_URL}${HouseArea}`} alt="House Area" className="w-4 h-4" />
                                        <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.HouseArea}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <img src={`${API_URL}${WidthHeight}`} alt="Width and Height" className="w-4 h-4" />
                                        <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.Width} x {project.attributes.Parameters.Height}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <img src={`${API_URL}${ConstructionPeriod}`} alt="Construction Period" className="w-4 h-4" />
                                        <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.ConstructionPeriod} дней</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <img src={`${API_URL}${Bedrooms}`} alt="Bedrooms" className="w-4 h-4" />
                                        <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.Bedrooms}</p>
                                    </div>
                                </div>
                                <p className="font-museo mt-2 text-orange text-xl font-bold">Цена от {formatPrice(getMinPrice(project.attributes.Complectation))} ₽</p>
                            </div>
                            <div className="bg-lightwhite p-5 hover:bg-orange text-orange hover:text-white transition-all duration-300">
                                <div className="flex justify-start items-center gap-2 cursor-pointer arrow-container">
                                    <a href="/" className="uppercase text-sm font-medium tracking-wider">Посмотреть проект</a>
                                    <FontAwesomeIcon icon={faArrowRightLong} className="arrow-icon" />
                                </div>
                            </div>
                        </div>            
                    ))}
                </div>
                {renderPagination()}
            </div>
        </div>
    )
}

export default Projects