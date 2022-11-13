import { IMAGE_CARD_SIZE, resizeImage } from '@/constants';
import useFetchSearch from '@/hooks/useFetchSearch';
import Link from 'next/link';
import React, { FC } from 'react';
import Error404 from '../Error/404';
import Image from '../Shared/Image';
import Skeleton from '../Shared/Skeleton';

interface SearchResultProps {
  query: string;
}

const SearchResults: FC<SearchResultProps> = ({ query }) => {
  const { data, error } = useFetchSearch(query);

  if (error) return <Error404 />;

  return (
    <div className='grid gap-6 grid-cols-sm md:grid-cols-lg'>
      {
        !data ? (
          <>
            {
              [...new Array(25)].map((_, index) => (
                <div key={index} className='relative h-0 pb-[163%]'>
                  <Skeleton className='absolute top-0 left-0 w-full h-full rounded' />
                </div>
              ))
            }
          </>
        ) : data.length === 0 ? (
          <div>No result found</div>
        ) : (
          <>
            {
              data.map((item) => (
                <Link
                  href={item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}`}
                  key={item.id}
                >
                  <a className='relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group'>
                    <div className='absolute top-0 left-0 w-full h-full flex flex-col items-stretch'>
                      <div className='relative w-full h-0 pb-[140%] flex-shrink-0 transition duration-300'>
                        <Image
                          className='absolute top-0 left-0 w-full h-full object-cover transition duration-300'
                          src={resizeImage(item.coverVerticalUrl, '380', '532')}
                          alt="Cover"
                          width={IMAGE_CARD_SIZE[1].width}
                          height={IMAGE_CARD_SIZE[1].height}
                        />
                      </div>

                      <div className='flex-grow flex items-center'>
                        <h1 className='w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300'>
                          {item.name}
                        </h1>
                      </div>
                    </div>
                  </a>
                </Link>
              ))
            }
          </>
        )
      }
    </div>
  );
};

export default SearchResults;