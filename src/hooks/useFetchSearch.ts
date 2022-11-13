import useSWR from "swr";
import fetcher from "@/core/fetcher";

const useFetchSearch = (keyword: string) => {
  console.log(keyword);


  const getKey = () => `search-${keyword}`;
  const getValue = () => fetcher.getSearch(keyword);

  const { data, error } = useSWR(
    getKey,
    getValue
  );

  return {
    data,
    error,
  };
};

export default useFetchSearch;