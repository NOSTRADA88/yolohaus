import { API_URL } from "../../constants";
import { ReviewsIcon } from "../../assets";
import { Link } from "react-router-dom";
import { RecommendationProps } from "../../interfaces";

const Recommendation = ({ title, recommendations, slugs }: RecommendationProps) => {
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16">
      <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl max-md:leading-normal max-sm:pr-10">
        {title}
      </h1>

      <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 mt-16">
        {recommendations?.map((rec, index) => (
          <div key={index} className="relative p-20  border transition-all bg-white hover:bg-cover group"
            style={{
              backgroundImage: `url(${API_URL}${rec.bgPhoto.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-all duration-500"></div>
              <img
                src={`${API_URL}${rec.icon.url}`}
                alt={rec.icon.name}
                width={rec.icon.width}
                height={rec.icon.height}
                className="mx-auto relative z-10 transition-opacity duration-500 group-hover:opacity-0"
              />
            <div className="flex justify-center items-center">
              <h2 className="text-center text-maingray font-museo font-light text-lg mt-4 relative z-10 transition-opacity duration-500 group-hover:opacity-0 md:text-base">
                {rec.title}
              </h2>
            </div>
            <div className="absolute inset-0 bg-gray-800 bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 z-10">
              {rec.description.map((desc, index) => (
                  <p key={index} className="mb-1 text-white text-center font-museo font-medium text-xs">
                    {desc.children[0].text}
                  </p>
              ))}
            </div>
          </div>
        ))}
        <Link to={`/${slugs.reviews}`} className="relative p-20 border bg-orange overflow-hidden ">
          <div className="relative w-full h-full overflow-hidden group hover:scale-150 hover:transition-all hover:duration-500 cursor-pointer ">
            <div className="flex justify-center items-center ">
              <img src={ReviewsIcon} alt="Icon representing reviews" className="w-full h-full object-contain max-xl:w-[100px] max-xl:h-[100px]  "/>
            </div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <h2 className="text-center text-white font-museo font-light text-2xl md:text-[24px]">
              Отзывы
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recommendation;
