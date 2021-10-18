import { useState, useEffect, useRef } from 'react';

const useInfiniteLoading = props => {
  const { getItems } = props; /* 1 */
  const [items, setItems] = useState([]);
  const pageToLoad = useRef(
    new URLSearchParams(window.location.search).get('page') || 1,
  ); /* 2 */
  const initialPageLoaded = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  console.log(pageToLoad);
  console.log(initialPageLoaded);

  const loadItems = async () => {
    /* 3 */
    const data = await getItems({
      page: pageToLoad.current,
    });
    setHasMore(data.count > pageToLoad.current); /* 4 */
    setItems(prevItems => [...prevItems, ...data.data.data]);
  };

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(); /* 5 */
    initialPageLoaded.current = true;
  });

  return {
    items,
    hasMore,
    loadItems,
  };
};

export default useInfiniteLoading;
