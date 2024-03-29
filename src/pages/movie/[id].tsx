// import Error404 from '@/components/Error/404';
// import Watch from '@/components/Watch';
// import { getMovieDetail } from '@/services/movie';
// import { NextPage } from 'next';
// import { useRouter } from 'next/router';
// import React from 'react';
// import useSWR from 'swr';

// const Movie: NextPage<any> = ({ sources, subtitles }) => {
//   const router = useRouter();
//   const { id } = router.query;

//   const { data, error } = useSWR(`movie-${id}`, () =>
//     getMovieDetail(id as string)
//   );

//   console.log(error);


//   if (error) return <Error404 />;

//   return (
//     <Watch
//       data={data?.data}
//       sources={data?.sources}
//       subtitles={data?.subtitles}
//     />
//   );
// };

// export default Movie;

import Error404 from '@/components/Error/404';
import Watch from '@/components/Watch';
import { getMovieDetail } from '@/services/movie';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const Movie: NextPage<any> = ({ data, sources, subtitles, id }) => {
  // if (!data) {
  //   const { data, error } = useSWR(`movie-${id}`, () =>
  //     getMovieDetail(id as string)
  //   );

  //   if (error) return <Error404 />;

  //   return (
  //     <Watch
  //       data={data?.data}
  //       sources={data?.sources}
  //       subtitles={data?.subtitles}
  //     />
  //   );
  // }

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Watch
      data={data}
      sources={sources}
      subtitles={subtitles}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;

  try {
    const response = await getMovieDetail(movieId);

    return {
      props: {
        ...response,
        id: movieId
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

export default Movie;