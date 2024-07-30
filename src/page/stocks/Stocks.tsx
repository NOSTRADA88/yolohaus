import { useCallback, useEffect, useState } from "react";
import { fetchStocksData } from "../../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { Modal } from "../../sections/modal";
import LazyLoad from "react-lazyload";

interface StockItem {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    PromotionTime: string;
    ShortTitle: string;
    LongTitle: string;
    Price: string;
    Description: { type: string; children: { text: string; type: string }[] }[];
    Photo: {
      data: {
        id: number;
        attributes: {
          name: string;
          formats: {
            large: {
              url: string;
            };
          };
        };
      };
    };
  };
}

interface StocksData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  stock_list: { data: StockItem[] };
}

const Stocks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocksData, setStocksData] = useState<StocksData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    stock_list: { data: [] },
  });
  const [visibleStocks, setVisibleStocks] = useState<StockItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const stocksPerPage = 7;

  const fetchData = async () => {
    try {
      const stocksDataResponse = await fetchStocksData();
      setStocksData({
        metaTitle: stocksDataResponse.Metadata.MetaTitle,
        metaDescription: stocksDataResponse.Metadata.MetaDescription,
        title: stocksDataResponse.Title,
        stock_list: stocksDataResponse.stock_list,
      });
      setVisibleStocks(
        stocksDataResponse.stock_list.data.slice(0, stocksPerPage)
      );
      if (stocksDataResponse.stock_list.data.length <= stocksPerPage) {
        setIsEndOfList(true);
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreStocks = useCallback(() => {
    if (isEndOfList) return;

    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * stocksPerPage;
    const endIndex = startIndex + stocksPerPage;
    const newStocks = stocksData.stock_list.data.slice(startIndex, endIndex);

    if (newStocks.length > 0) {
      setVisibleStocks((prevStocks) => [...prevStocks, ...newStocks]);
      setCurrentPage(nextPage);
      if (endIndex >= stocksData.stock_list.data.length) {
        setIsEndOfList(true);
      }
    } else {
      setIsEndOfList(true);
    }
  }, [currentPage, stocksData.stock_list.data, stocksPerPage, isEndOfList]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !isLoading &&
      !isEndOfList
    ) {
      setIsLoading(true);
      setTimeout(() => {
        loadMoreStocks();
        setIsLoading(false);
      }, 500);
    }
  }, [isLoading, isEndOfList, loadMoreStocks]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>{stocksData.metaTitle}</title>
        <meta name="description" content={stocksData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {stocksData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {stocksData.title}
            </p>
          </div>
        </div>
        <div className="mt-10">
          {visibleStocks.map((stock) => (
            <div key={stock.id} className="mb-8">
              <div className="flex justify-between bg-lightwhite p-5 mt-16 max-sm:flex-col max-sm:mt-10">
                <h2 className="text-xl font-medium font-museo text-maingray ">
                  {stock.attributes.ShortTitle}
                </h2>
                <p className="text-orange font-medium font-museo text-sm ">
                  {stock.attributes.PromotionTime}
                </p>
              </div>
              <div className="flex shadow-[0_0_20px_rgba(0,0,0,0.25)] mt-8 items-start max-lg:flex-col">
                <div className="relative w-[60%] overflow-hidden max-lg:w-full h-[300px]">
                  <LazyLoad offset={300} once>
                    <img
                      src={`${API_URL}${stock.attributes.Photo.data.attributes.formats.large.url}`}
                      alt="Stock"
                      className="w-full h-[300px] object-cover object-center"
                    />
                  </LazyLoad>
                  <div className="absolute top-0 left-[-10px] bg-maingray text-xs px-3 py-2 opacity-80 parallelogram">
                    <p className="ml-2 text-white noparallelogram text-base font-medium uppercase ">
                      yolo
                      <span className="text-orange">haus</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between p-4 mt-4">
                  <div>
                    <p className="text-orange font-bold font-museo text-xl max-sm:text-lg">
                      {stock.attributes.LongTitle}
                    </p>
                    <div className="bg-lightwhite p-5 mt-5">
                      <p className="text-base font-light font-museo text-maingray text-justify">
                        {stock.attributes.Description.map((desc, index) => (
                          <span key={index}>{desc.children[0].text}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-end mt-4">
                    <div className="flex gap-[3.5px] items-center">
                      <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                      <div
                        className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange hover:bg-white hover:text-maingray text-white transform parallelogram w-[172px] h-10 border-[1px] border-orange"
                        onClick={openModal}
                      >
                        <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">
                          {stock.attributes.Price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isLoading && !isEndOfList && (
          <div className="flex justify-center items-center mt-8 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>
        )}
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export {Stocks};
