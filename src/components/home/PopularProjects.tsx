import { useEffect, useState } from "react";
import { fetchHomeData } from "../../api";

const PopularProjects = () => {
  const [title, setTitle] = useState<string>('');


  const fetchData = async () => {
      try {
          const mainData = await fetchHomeData();
          setTitle(mainData.PopularCottages.Title);
        
      } catch (error) {
          console.error('Ошибка запроса:', error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);
  return (
    <div className="w-full max-w-[1111px] mx-auto mt-20">            <h1 className="text-maingray font-museo font-bold text-3xl">{title}</h1></div>
  )
}

export default PopularProjects