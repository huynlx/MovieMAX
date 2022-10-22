import useSWRInfinite from "swr/infinite";
import fetcher from '@/core/fetcher';

const useFetchHome = () => {
  const getKey = (index: number) => `home-${index || 0}`; // if not setSize => go to 0, if setSize => go to 'index'
  const { data, error, setSize, ...rest } = useSWRInfinite(
    getKey,
    (key) => fetcher.getHome(key), // key = "home-?"
    { revalidateFirstPage: false }
  );

  const hasNextPage = data && !error && data?.slice(-1)?.[0]?.length !== 0;

  return {
    data: data?.reduce((acc, current) => [...acc, ...current], []) || [],
    error,
    setSize,
    hasNextPage,
    ...rest
  };
};

export default useFetchHome;