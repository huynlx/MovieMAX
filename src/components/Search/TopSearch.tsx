import { resizeImage } from '@/constants';
import { getTopSearch } from '@/services/search';
import Link from 'next/link';
import React, { FC } from 'react';
import useSWR from 'swr';
import Image from '../Shared/Image';
import Skeleton from '../Shared/Skeleton';

const TopSearch: FC = () => {
  const { data, error } = useSWR("home-top-searches", () => getTopSearch());

  if (!data || error) {
    return (
      <div className='flex flex-col gap-3'>
        {
          [...new Array(Math.round(window.innerHeight / 100))].map(
            (_, index) => (
              <div className='flex gap-2' key={index}>
                <Skeleton className='w-[100px] h-[60px] flex-shrink-0 rounded-lg' />

                <Skeleton className='flex-grow h-4 rounded-md' />
              </div>
            )
          )
        }
      </div >
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {
        data.map(top => (
          <Link
            href={top.domainType === 0 ? `/movie/${top.id}` : `/tv/${top.id}`}
            className="flex gap-2 transition duration-300"
            key={top.id}
          >
            <div className='w-[100px] h-[60px] flex-shrink-0'>
              <Image
                className='w-[100px] h-[60px] object-cover rounded-lg'
                src={resizeImage(top.cover, '380', '532')}
                width={100}
                height={60}
                alt='Cover'
              />
            </div>

            <div>
              <h1>{top.title}</h1>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default TopSearch;