import Watch from '@/components/Watch';
import { getTVDetail } from '@/services/tv';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

const TV: NextPage<any> = ({ data, sources, subtitles }) => {

  return (
    <Watch
      data={data}
      sources={sources}
      subtitles={subtitles}
    />
  );
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default TV;