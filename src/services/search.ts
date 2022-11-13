import { SearchResultItem, TopSearch } from "@/types";
import axios from "@/utils/axios";

export const searchKeywords = async (keyword: string): Promise<string[]> => (
  await axios.post(`search/searchLenovo`, {
    searchKeyWord: keyword,
    size: 10,
  })
).data.data.searchResults;

export const getTopSearch = async (): Promise<TopSearch[]> => (
  await axios.get("search/v1/searchLeaderboards")
).data.data.list;

export const searchWithKeyWord = async (keyword: string): Promise<SearchResultItem[]> => {
  return (
    await axios.post("search/v1/searchWithKeyWord", {
      searchKeyword: keyword,
      size: 1000,
      sort: "",
      searchType: ""
    })
  ).data.data.searchResults;
};