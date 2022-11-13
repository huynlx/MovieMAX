import { resizeImage } from '@/constants';
import Link from 'next/link';
import React, { memo } from 'react';
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from '../Shared/Image';

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
      modules={[Navigation, Pagination, Autoplay]}
      navigation={false}
      pagination
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
    >
      {images.map((item) => (
        <SwiperSlide key={item.image}>
          <Link href={item.link}>
            <a>
              <div className="w-full h-0 pb-[42%] relative">
                <Image
                  src={resizeImage(item.image, "800", "540")}
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
                  alt="Thumbnail"
                />
                <h1 className="footer-shadow scale-100 font-semibold absolute text-xl md:text-6xl whitespace-nowrap overflow-hidden text-ellipsis flex items-center">
                  {/* {item.title} */}
                </h1>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(BannerSlider);