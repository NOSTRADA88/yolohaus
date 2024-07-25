import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SortProps {
  sortBy: "popularity" | "area" | "price" | null;
  sortDirection: "asc" | "desc";
  toggleSortBy: (criteria: "popularity" | "area" | "price") => void;
  resetSort: () => void;
}

const Sort = ({
  sortBy,
  sortDirection,
  toggleSortBy,
  resetSort,
}: SortProps) => {
  return (
    <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
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
          <FontAwesomeIcon
            onClick={resetSort}
            icon={faTimes}
            size="2x"
            className="font-museo text-sm cursor-pointer mt-[3px] text-maingray transition-all duration-300 hover:text-orange"
          />
        )}
      </div>
    </div>
  );
};

export default Sort;
