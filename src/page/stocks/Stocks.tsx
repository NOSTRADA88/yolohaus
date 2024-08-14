import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { API_URL } from "../../constants";
import { Modal } from "../../sections/modal";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { fetchStocksPage } from "../../api/stocks";
import { StockItem, StocksData } from "../../interfaces";

const Stocks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocksData, setStocksData] = useState<StocksData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    stocks: [] as StockItem[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const stocksPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStocksPage();
        setStocksData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          stocks: response.stock_list.data.map((stock: any) => ({
            promotionTime: stock.attributes.PromotionTime,
            shortTitle: stock.attributes.ShortTitle,
            longTitle: stock.attributes.LongTitle,
            price: stock.attributes.Price,
            description: stock.attributes.Description.map((desc: any) => ({
              children: desc.children.map((child: any) => ({
                text: child.text,
                type: child.type,
              })),
            })),
            photo: {
              name: stock.attributes.Photo.data.attributes.name,
              url: stock.attributes.Photo.data.attributes.url,
            },
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchData();
  }, []);

  const loadMoreStocks = useCallback(() => {
    if (isEndOfList) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    if (nextPage * stocksPerPage >= stocksData.stocks.length) {
      setIsEndOfList(true);
    }
  }, [currentPage, stocksData.stocks.length, stocksPerPage, isEndOfList]);

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

  const visibleStocks = stocksData.stocks.slice(0, currentPage * stocksPerPage);

  return (
    <div>
      <Helmet>
        <title>{stocksData.metaTitle}</title>
        <meta name="description" content={stocksData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs finalTitle={stocksData.title} />

        <div className="mt-10">
          {visibleStocks.map((stock) => (
            <div className="mb-8">
              <div className="flex justify-between bg-lightwhite p-5 mt-16 max-sm:flex-col max-sm:mt-10">
                <h2 className="text-xl font-medium font-museo text-maingray ">
                  {stock.shortTitle}
                </h2>
                <p className="text-orange font-medium font-museo text-sm ">
                  {stock.promotionTime}
                </p>
              </div>
              <div className="flex shadow-[0_0_20px_rgba(0,0,0,0.25)] mt-8 items-start max-lg:flex-col">
                <div className="relative w-[60%] overflow-hidden max-lg:w-full h-[300px]">
                  <img
                    src={`${API_URL}${stock.photo.url}`}
                    alt="Stock"
                    className="w-full h-[300px] object-cover object-center"
                  />
                  <div className="absolute top-0 left-[-10px] bg-maingray text-xs px-3 py-2 opacity-80 parallelogram">
                    <p className="ml-2 text-white noparallelogram text-base font-medium uppercase ">
                      yolo
                      <span className="text-orange">haus</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between p-3 mt-4">
                  <div>
                    <p className="text-orange font-bold font-museo text-xl max-sm:text-lg">
                      {stock.longTitle}
                    </p>
                    <div className="bg-lightwhite p-5 mt-5">
                      <p className="text-base font-light font-museo text-maingray text-justify">
                        {stock.description.map((desc, index) => (
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
                          {stock.price}
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

export { Stocks };
