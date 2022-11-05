import Watch from '@/components/Watch';
import { getTVDetail } from '@/services/tv';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const TV: NextPage<any> = ({ data, sources, subtitles }) => {
  const router = useRouter();

  console.log(router);


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
  const tvId = params?.id as string;

  try {
    const response = await getTVDetail(tvId, 0);

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

export default TV;