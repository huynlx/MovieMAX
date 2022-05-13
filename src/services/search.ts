import axios from "@/utils/axios";

export const searchKeywords = async (keyword: string): Promise<string[]> =>
  (
    await axios.post(`search/searchLenovo`, {
      searchKeyWord: keyword,
      size: 10,
    })
  ).data.data.searchResults;