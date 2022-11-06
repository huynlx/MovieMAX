import { DetailType } from '@/types';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from '../Shared/Skeleton';

interface MetaDataProps {
  data?: DetailType;
  episodeIndex: number | undefined;
}

const MetaData: React.FunctionComponent<MetaDataProps> = ({ data, episodeIndex }) => (
  <>
    {data ? (
      <div className="flex flex-col gap-[10px]">
        {
          data.episodeVo.length > 1 ? (
            <div className="flex gap-3 overflow-auto flex-wrap mt-3 max-h-72">
              {data.episodeVo.map((_, index) => {
                return (
                  <Link
                    href={`/tv/${data.id}-${index}`}
                    key={index}
                  >
                    <a className={`px-4 py-[8px] bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${index === episodeIndex ? "!bg-primary text-white" : ""}`}>
                      {index + 1}
                    </a>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex gap-3 overflow-auto flex-wrap mt-3">
              <span className={`px-4 py-[8px] cursor-pointer rounded hover:brightness-125 transition duration-300 !bg-primary text-white"}`}>
                Full
              </span>
            </div>
          )
        }

        <section id='infomation' className='flex gap-[20px] mt-1 items-center'>
          <img src={data?.coverVerticalUrl} alt="verti" width={210} height={294} />

          <div className="flex flex-col gap-[10px]">
            <h1 className="text-3xl">{data?.name}</h1>

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <img className="w-4 h-4" src={'/static/images/star.png'} alt="" />
                <p>{data?.score?.toFixed(1)}</p>
              </div>
              <div className="flex items-center gap-1">
                <img className="w-4 h-4" src="/static/images/calendar.png" alt="" />
                <p>{data?.year}</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {data.tagList.map((tag) => (
                <Link
                  href={`/category/${tag.id}`}
                  key={tag.id}
                >
                  <a className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300">
                    {tag.name}
                  </a>
                </Link>
              ))}
            </div>

            <p>{data.introduction}</p>
          </div>
        </section>
      </div>
    ) : (
      <>
        <Skeleton className="w-[70%] h-8 mt-6" />
        <Skeleton className="w-[60%] h-8 mt-6" />
      </>
    )}
  </>
);

export default MetaData;