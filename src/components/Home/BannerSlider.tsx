import Link from 'next/link';
import React from 'react';
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { resizeImage } from '@/constants';

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
}

const BannerSlider: React.FC<SliderProps> = ({ images }) => {

  return (
    <Swiper
      className="rounded-2xl overflow-hidden"
      modules={[Navigation]}
      navigation
      loop
      slidesPerView={1}
    >
      {images.map((item) => (
        <SwiperSlide key={item.image}>
          <Link href={item.link}>
            <a>
              <div className="w-full h-0 pb-[42%] relative">
                <LazyLoadImage
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-75"
                  src={resizeImage(item.image, "800", "540")}
                  alt="Thumbnail"
                  effect="opacity"
                />
                <h1 className="scale-100 font-semibold absolute left-[7%] bottom-[10%] text-xl md:text-3xl max-w-[86%] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h1>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;