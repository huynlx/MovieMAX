import React, { FC } from 'react';

const Watch: FC<any> = ({
  data,
  sources,
  subtitles,
  episodeIndex
}) => {
  return (
    <div>
      <h1 className='text-5xl'>{data.name} - {data.year}</h1>
      <img src={data.coverHorizontalUrl} alt="hori" />
      <img src={data.coverVerticalUrl} alt="verti" />
    </div>
  );
};

export default Watch;