import SearchBox from '@/components/Search/SearchBox';
import SearchResults from '@/components/Search/SearchResults';
import NavBar from '@/components/Shared/NavBar';
import useQueryParmams from '@/hooks/useQueryParmams';
import React, { FC } from 'react';

const Search: FC = () => {
  const query = useQueryParmams();
  const q = query.q as string;

  if (!q?.trim()) {
    return (
      <div className='mx-[7vw]'>
        <NavBar />
        <div className='flex justify-center my-[100px] mx-6'>
          <div className='w-full max-w-[400px] flex flex-col items-center gap-4'>
            <div className='flex flex-col items-stretch gap-3'>
              <h1 className='text-2xl'>Search for your favarite movies</h1>
              <SearchBox autoFocus />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-stretch mx-[7vw] mb-8'>
      <NavBar />
      <div>
        <h1 className='mb-6 text-3xl'>Search result for {q}</h1>
      </div>
      <SearchResults query={q as string} />
    </div>
  );
};

export default Search;