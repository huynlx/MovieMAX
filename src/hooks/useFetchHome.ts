import { getHome } from "@/services/home";
import useSWRInfinite from "swr/infinite";

const useFetchHome = () => {
  const getKey = (index: number) => `home-${index || 0}`; // => initial must always is 0
  const { data: dataCSR, error, setSize, ...rest } = useSWRInfinite(
    getKey,
    (key) => getHome(Number(key.split("-").slice(-1)[0]) + 1), //key = "home-?"
    { revalidateFirstPage: false }
  );

  const hasNextPage = !error && dataCSR?.slice(-1)?.[0]?.length !== 0;

  return {
    dataCSR: dataCSR?.reduce((acc, current) => [...acc, ...current], []),
    error,
    setSize,
    hasNextPage,
    ...rest
  }
};

export default useFetchHome;