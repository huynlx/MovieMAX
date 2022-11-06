import Watch from '@/components/Watch';
import { getTVDetail } from '@/services/tv';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const TV: NextPage<any> = ({ data, sources, subtitles, episodeIndex }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Watch
      data={data}
      sources={sources}
      subtitles={subtitles}
      episodeIndex={episodeIndex}
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

  const [id, episodeIndex = 0] = tvId.split('-');

  try {
    const response = await getTVDetail(id, Number(episodeIndex));

    return {
      props: {
        ...response,
        episodeIndex: Number(episodeIndex)
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export default TV;