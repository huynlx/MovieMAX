import Error404 from '@/components/Error/404';
import Watch from '@/components/Watch';
import { getMovieDetail } from '@/services/movie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const Movie: NextPage<any> = ({ sources, subtitles }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`movie-${id}`, () =>
    getMovieDetail(id as string)
  );

  console.log(error);


  if (error) return <Error404 />;

  return (
    <Watch
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
    />
  );
};

export default Movie;