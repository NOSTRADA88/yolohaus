import { SortProps } from "../../interfaces";
import {memo} from "react";

const Sort = memo(({
  sortBy,
  sortDirection,
  toggleSortBy,
  resetSort,
}: SortProps) => {
  return (
    <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-4 mt-5">
      <h2 className="font-museo text-base text-maingray text-opacity-50">
        Сортировать по:
      </h2>
      <div className="flex gap-8 max-sm:gap-4 max-sm:items-start">
        <p
          className={`font-museo text-sm cursor-pointer underline decoration-dashed transition-all duration-300 ${
            sortBy === "popularity"
              ? "text-orange"
              : "text-maingray text-opacity-90"
          }`}
          onClick={() => toggleSortBy("popularity")}
        >
          Популярность
          {sortBy === "popularity" &&
            (sortDirection === "asc" ? (
              <span>&#9650;</span>
            ) : (
              <span>&#9660;</span>
            ))}
        </p>
        <p
          className={`font-museo text-sm cursor-pointer underline decoration-dashed transition-all duration-300 ${
            sortBy === "area" ? "text-orange" : "text-maingray text-opacity-90"
          }`}
          onClick={() => toggleSortBy("area")}
        >
          Площадь
          {sortBy === "area" &&
            (sortDirection === "asc" ? (
              <span>&#9650;</span>
            ) : (
              <span>&#9660;</span>
            ))}
        </p>
        <p
          className={`font-museo text-sm cursor-pointer underline decoration-dashed transition-all duration-300 ${
            sortBy === "price" ? "text-orange" : "text-maingray text-opacity-90"
          }`}
          onClick={() => toggleSortBy("price")}
        >
          Цена
          {sortBy === "price" &&
            (sortDirection === "asc" ? (
              <span>&#9650;</span>
            ) : (
              <span>&#9660;</span>
            ))}
        </p>
        {sortBy && (
          <p
            className="font-museo text-base  font-bold cursor-pointer text-maingray transition-all duration-300 hover:text-orange"
            onClick={resetSort}
          >
            &times;
          </p>
        )}
      </div>
    </div>
  );
});

export default Sort;
