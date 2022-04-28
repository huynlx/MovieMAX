import { DetailType } from "@/types";
import axios from "@/utils/axios";
import axios2 from 'axios';

export const getTVDetail = async (
  id: string,
  episodeIndex: number
): Promise<{
  data: DetailType;
  sources: { quality: number; url: string }[];
  subtitles: { language: string; url: string; lang: string }[];
}> => {
  const data = (
    await axios2.get("https://web-api.netpop.app/cms/web/pc/movieDrama/get", {
      params: {
        id,
        category: 1,
      },
      headers: {
        lang: 'en'
      }
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[episodeIndex].definitionList.map(
        async (quality: any) =>
          (
            await axios2.get("https://web-api.netpop.app/cms/web/pc/movieDrama/getPlayInfo", {
              params: {
                category: 1,
                contentId: id,
                episodeId: data.episodeVo[0].id,
                definition: quality.code,
              },
              headers: {
                lang: 'en',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrTmFtZSI6IlRpdHRpazAyNDIxMjc5IiwiY3VycmVudFRpbWVNaWxsaXMiOjE2NTE0OTk3NjkzNDgsImV4cCI6MTY1NDA5MTc2OSwiYXBwbGVJZCI6IjAwMjAxNy5jNDU3NGQ1ZGE4NGI0ZTllYmRjN2RiYTJkMTUxN2QzOC4xNjQ4IiwidXNlcklkIjozMzQ2MjY5fQ.hn6EP4jt6za5WWb_epeqg_DNP9MT--TTlK129SABKIk'
              }
            })
          ).data.data.mediaUrl
      )
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[episodeIndex].definitionList[index].description
          .toLowerCase()
          .replace("p", "")
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  const subtitles = data.episodeVo[episodeIndex].subtitlingList
    .map((sub: any) => ({
      language: `${sub.language}${sub.translateType ? " (Auto)" : ""}`,
      url: sub.subtitlingUrl,
      lang: sub.languageAbbr,
    }))
    .reduce((acc: any, element: any) => {
      if (element.lang === "en") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .reduce((acc: any, element: any) => {
      if (element.lang === "vi") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);

  return {
    data,
    sources,
    subtitles,
  };
};
