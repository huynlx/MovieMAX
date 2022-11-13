import Link from 'next/link';
import React, { FC } from 'react';
import SearchBox from '../Search/SearchBox';

const NavBar: FC = () => {
  return (
    <div className='flex justify-between items-center my-7'>
      <Link href='/'>
        <a className='flex items-center gap-2'>
          <img className="h-12" src="/static/images/logo.png" alt="Logo" />
          <span className=' text-xl font-medium'></span>
        </a>
      </Link>


      <Link href='/search'>
        <a className='block md:hidden'>
          <i className='fas fa-search text-2xl'></i>
        </a>
      </Link>


      <div className='max-w-[500px] hidden md:block'>
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;