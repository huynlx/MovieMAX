import home from "@/pages/api/home";
import { getHome } from "@/services/home";
import { test } from "@/services/test";
import axios from "axios";
import useSWRInfinite from "swr/infinite";

const useFetchHome = () => {
  const getKey = (index: number) => `home-${index || 0}`; // if not setSize => go to 0, if setSize => go to 'index'
  const { data, error, setSize, ...rest } = useSWRInfinite(
    getKey,
    // (key) => test(Number(key.split("-").slice(-1)[0])), //key = "home-?"
    async (key) => (await axios.get('/api/home?page=' + Number(key.split("-").slice(-1)[0]))).data,
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