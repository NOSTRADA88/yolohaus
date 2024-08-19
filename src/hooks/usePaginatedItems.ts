import { useState, useEffect, useCallback, useRef } from "react";

interface UsePaginatedItemsProps<T> {
  items: T[];
  itemsPerPage?: number;
}

const usePaginatedItems = <T>({
  items,
  itemsPerPage = 9,
}: UsePaginatedItemsProps<T>) => {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      const initialItems = items.slice(0, itemsPerPage);
      setVisibleItems(initialItems);
      setIsEndOfList(initialItems.length >= items.length);
      setCurrentPage(1);
    }
  }, [items, itemsPerPage]);

  const loadMoreItems = useCallback(() => {
    if (isEndOfList || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const newItems = items.slice(
      currentPage * itemsPerPage,
      nextPage * itemsPerPage
    );

    if (newItems.length > 0) {
      setVisibleItems((prevItems) => [...prevItems, ...newItems]);
      setCurrentPage(nextPage);
    }

    if (
      newItems.length < itemsPerPage ||
      visibleItems.length + newItems.length >= items.length
    ) {
      setIsEndOfList(true);
    }

    setIsLoadingMore(false);
  }, [
    currentPage,
    items,
    isEndOfList,
    isLoadingMore,
    visibleItems.length,
    itemsPerPage,
  ]);

  const handleScroll = useCallback(() => {
    if (!lastItemRef.current || isEndOfList || isLoadingMore) return;

    const lastItemRect = lastItemRef.current.getBoundingClientRect();
    if (lastItemRect.bottom <= window.innerHeight) {
      loadMoreItems();
    }
  }, [isEndOfList, loadMoreItems, isLoadingMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    visibleItems,
    isEndOfList,
    lastItemRef,
    loadMoreItems,
    isLoadingMore,
  };
};

export default usePaginatedItems;
