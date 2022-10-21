import { DetailType } from '@/types';
import React, { FC, useEffect } from 'react';

interface WatchProps {
  data?: DetailType,
  sources?: {
    quality: number,
    url: string;
  }[],
  subtitles?: {
    language: string,
    langCode: string,
    url: string;
  }[],
  episodeIndex?: number;
}

const Watch: FC<WatchProps> = ({
  data,
  sources,
  subtitles,
  episodeIndex
}) => {
  const mediaType = typeof episodeIndex === 'undefined' ? 'movie' : 'tv';
  const playerKey = `${mediaType}-${data?.id}${episodeIndex ? `-${episodeIndex}` : ''}`;

  useEffect(() => {
    if (!data) return;

    let existing = JSON.parse(
      localStorage.getItem("moviemax-recent") || "[]"
    ) as {
      id: string,
      category: number,
      coverVerticalUrl: string,
      name: string;
    }[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data.id);

    existing.unshift({
      id: data.id,
      category: data.category,
      coverVerticalUrl: data.coverVerticalUrl,
      name: data.name
    });

    localStorage.setItem("moviemax-recent", JSON.stringify(existing));
  }, [data]);

  return (
    <div>
      <h1 className='text-5xl'>{data?.name} - {data?.year}</h1>
      <img src={data?.coverHorizontalUrl} alt="hori" />
      <img src={data?.coverVerticalUrl} alt="verti" />
      cc
    </div>
  );
};

export default Watch;