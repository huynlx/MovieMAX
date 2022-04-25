import { IMAGE_CARD_SIZE, resizeImage } from '@/constants';
import Link from 'next/link';
import React from 'react';
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyLoadImage } from "react-lazy-load-image-component";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
  coverType: number;
}

const SectionSlider: React.FC<SliderProps> = ({ images, coverType }) => {
  return (
    <Swiper
      modules={[FreeMode, Navigation]}
      navigation
      slidesPerView={'auto'}
      slidesPerGroupAuto
      spaceBetween={20}
      freeMode
    >
      {images.map((item) => (
        <SwiperSlide
          style={{ width: IMAGE_CARD_SIZE[coverType || 1].width }}
          key={item.image}
        >
          <Link href={item.link}>
            <a>
              <div className="overflow-hidden group">
                <LazyLoadImage
                  className="group-hover:brightness-75 transition duration-300 object-cover rounded-lg"
                  src={resizeImage(item.image, "200", "280")}
                  width={IMAGE_CARD_SIZE[coverType || 1].width}
                  height={IMAGE_CARD_SIZE[coverType || 1].height}
                  effect="opacity"
                  alt="Cover"
                />
                <h1 className="group-hover:text-primary font-semibold transition duration-300 pb-1 px-2 m-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
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

export default SectionSlider;