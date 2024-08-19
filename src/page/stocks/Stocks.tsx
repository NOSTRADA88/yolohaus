import React from "react";
import { Helmet } from "react-helmet";
import { API_URL, slug } from "../../constants";
import { Modal } from "../../sections/modal";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import useStocksPage from "../../hooks/useStocksPage";
import { useModal } from "../../hooks/useModal";
import usePaginatedItems from "../../hooks/usePaginatedItems";
import { Link } from "react-router-dom";

const Stocks = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { stocksData, isLoading, error } = useStocksPage();
  const {
    visibleItems: visibleStocks,
    isEndOfList,
    lastItemRef,
  } = usePaginatedItems({
    items: stocksData ? stocksData.stocks : [],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!stocksData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{stocksData.metadata.title}</title>
        <meta name="description" content={stocksData.metadata.description} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs finalTitle={stocksData.title} />
        <div className="mt-10">
          {visibleStocks.map((stock, index) => (
            <div
              className="mb-8"
              key={stock.shortTitle}
              ref={index === visibleStocks.length - 1 ? lastItemRef : null}
            >
              <Link to={`${slug.stocks}/`}>
                <div className="flex justify-between bg-lightwhite p-5 mt-16 max-sm:flex-col max-sm:mt-10 ">
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
                      width={150}
                      height={300}
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
              </Link>
            </div>
          ))}
        </div>
        {!isEndOfList && (
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
