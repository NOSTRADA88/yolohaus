import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { fetchHomeData } from "../../api";
import { API_URL } from "../../constants";
import { ReviewsIcon } from "../../assets";

interface Description {
  type: string;
  children: { text: string, type: string }[];
}

interface Icon {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

interface BgPhoto {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

interface RecommendationAttributes {
  Title: string;
  Description: Description[];
  Icon: Icon;
  BgPhoto: BgPhoto;
}

interface Recommendation {
  id: number;
  attributes: RecommendationAttributes;
}

const Recommendation = () => {
  const [title, setTitle] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const fetchData = async () => {
    try {
      const mainData = await fetchHomeData();
      setTitle(mainData.Recommendations.Title);
      setRecommendations(mainData.Recommendations.list.data);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16">
      <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl max-md:leading-normal max-sm:pr-10">
        {title}
      </h1>

      <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 mt-16">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="relative p-20  border transition-all bg-white hover:bg-cover group"
            style={{  
              backgroundImage: `url(${API_URL}${item.attributes.BgPhoto.data.attributes.url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-all duration-500"></div>
            <img
              src={`${API_URL}${item.attributes.Icon.data.attributes.url}`}
              alt={item.attributes.Title}
              className="mx-auto relative z-10 transition-opacity duration-500 group-hover:opacity-0"
            />
            <div className="flex justify-center items-center">
              <h2 className="text-center text-maingray font-museo font-light text-lg mt-4 relative z-10 transition-opacity duration-500 group-hover:opacity-0 md:text-base">
                {item.attributes.Title}
              </h2>
            </div>
            <div className="absolute inset-0 bg-gray-800 bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 z-10">
              {item.attributes.Description.map((desc, index) => (
                <p key={index} className="mb-1 text-white text-center font-museo font-medium text-xs">
                  {desc.children[0].text}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="relative p-20 border bg-orange overflow-hidden ">
          <div className="relative w-full h-full overflow-hidden group hover:scale-150 hover:transition-all hover:duration-500 cursor-pointer ">
            <div className="flex justify-center items-center ">
              <img
                src={ReviewsIcon}
                alt="Отзывы"
                className="w-full h-full object-contain max-xl:w-[100px] max-xl:h-[100px]  "
              />
            </div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <h2 className="text-center text-white font-museo font-light text-2xl md:text-[24px]">
              Отзывы
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;