import { getHome } from "@/services/home";
import useSWRInfinite from "swr/infinite";

const useFetchHome = () => {
  const getKey = (index: number) => `home-${index || 0}`; // => initial must always is 0
  const { data, error, setSize, ...rest } = useSWRInfinite(
    getKey,
    (key) => getHome(Number(key.split("-").slice(-1)[0])), //key = "home-?"
    { revalidateFirstPage: false }
  );

  const hasNextPage = data && !error && data?.slice(-1)?.[0]?.length !== 0;

  return {
    data: data?.reduce((acc, current) => [...acc, ...current], []),
    error,
    setSize,
    hasNextPage,
    ...rest
  }
};

export default useFetchHome;