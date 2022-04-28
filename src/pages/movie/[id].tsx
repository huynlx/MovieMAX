import Watch from '@/components/Watch';
import { getMovieDetail } from '@/services/movie';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

const Movie: NextPage<any> = ({ data, sources, subtitles }) => {

  return (
    <Watch
      data={data}
      sources={sources}
      subtitles={subtitles}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;

  try {
    const response = await getMovieDetail(movieId);

    return {
      props: {
        ...response
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Movie;