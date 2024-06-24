import { useEffect, useState } from "react";
import { fetchHomeData } from "../../api";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Bedrooms, ConstructionPeriod, HouseArea, WidthHeight } from "../../assets";


interface Complectation {
  id: number;
  BasePrice: string;
  StandartPrice: string;
  ComfortPrice: string;
}

const PopularProjects = () => {
  const [title, setTitle] = useState<string>('');
  const [projects, setProjects] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const mainData = await fetchHomeData();
      setTitle(mainData.PopularCottages.Title);
      setProjects(mainData.PopularCottages.projects.data);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16">
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-6">
        <h1 className="text-maingray font-museo font-bold text-3xl  max-md:text-2xl">{title}</h1>
        <div className=" bg-lightwhite p-5 max-md:w-full">
          <div className="flex justify-start items-center gap-2 cursor-pointer  arrow-container ">
            <a href="/" className="text-orange uppercase text-sm font-medium tracking-wider  max-md:text-xs">Все проекты </a>
            <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-10">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white shadow-md overflow-hidden cursor-pointer border-[#E5E5E5] w-[350px] h-[360px]">
            <img
              src={`${API_URL}${project.attributes.Photos.data[0].attributes.formats.large.url}`}
              alt={project.attributes.Photos.data[0].attributes.name}
              className="object-cover  w-[350px] h-[180px]"
            />
            <div className="p-4">
              <h2 className="font-museo font-bold text-2xl text-maingray">{project.attributes.Title}</h2>
              <div className="flex gap-3 mt-4">
                <div className="flex gap-2">
                  <img src={HouseArea} alt="House Area" className="w-4 h-4" />
                  <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.HouseArea}</p>
                </div>
                <div className="flex gap-2">
                  <img src={WidthHeight} alt="Width and Height" className="w-4 h-4" />
                  <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.Width} x {project.attributes.Parameters.Height}</p>
                </div>
                <div className="flex gap-2">
                  <img src={ConstructionPeriod} alt="Construction Period" className="w-4 h-4" />
                  <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.ConstructionPeriod} дней</p>
                </div>
                <div className="flex gap-2">
                  <img src={Bedrooms} alt="Bedrooms" className="w-4 h-4" />
                  <p className="font-museo font-light text-sm text-maingray">{project.attributes.Parameters.Bedrooms}</p>
                </div>
              </div>
              <p className="font-museo mt-2 text-orange text-xl font-bold">Цена от {formatPrice(getMinPrice(project.attributes.Complectation))} ₽</p>
            </div>
            <div className="bg-lightwhite p-5 hover:bg-orange text-orange hover:text-white">
              <div className="flex justify-start items-center gap-2 cursor-pointer arrow-container">
                <a href="/" className="uppercase text-sm font-medium tracking-wider">Посмотреть проект</a>
                <FontAwesomeIcon icon={faArrowRightLong} className="arrow-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularProjects