import useLocalStorage from '@/hooks/useLocalStorage';
import { DetailType } from '@/types';
import dynamic from 'next/dynamic';
import React, { FC, useEffect } from 'react';
import Skeleton from '../Shared/Skeleton';
import MetaData from './MetaData';

const DesktopPlayer = dynamic(() => import('../Player/Desktop'), {
  ssr: false,
  loading: () => <div className="relative w-full h-0 pb-[56.25%] bg-black" />
});

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

  const [recentLocal, setRecentLocal] = useLocalStorage<object>('moviemax-recent', []);

  useEffect(() => {
    if (!data) return;

    let existing = recentLocal as {
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

    // localStorage.setItem("moviemax-recent", JSON.stringify(existing));
    setRecentLocal(existing);
  }, [data]);

  return (
    <div>
      {/* <h1 className='text-5xl'>{data?.name} - {data?.year}</h1>
      <img src={data?.coverHorizontalUrl} alt="hori" />
      <img src={data?.coverVerticalUrl} alt="verti" />
      cc */}

      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div key={episodeIndex} className="w-full">
                {
                  data && sources && subtitles ? (
                    <DesktopPlayer
                      playerKey={playerKey}
                      sources={sources}
                      subtitles={subtitles}
                      data={data}
                    />
                  ) : (
                    <div className="relative w-full h-0 pb-[56.25%] bg-black">
                      <Skeleton className="absolute top-0 left-0 w-full h-full" />
                    </div>
                  )
                }
              </div>

              <MetaData data={data} episodeIndex={episodeIndex} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;