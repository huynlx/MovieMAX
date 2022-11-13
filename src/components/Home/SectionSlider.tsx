import { IMAGE_CARD_SIZE, resizeImage } from '@/constants';
import Link from 'next/link';
import React, { memo } from 'react';
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from '../Shared/Image';

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
      navigation={false}
      slidesPerView={'auto'}
      slidesPerGroupAuto
      spaceBetween={20}
      freeMode
      className='swiper-section'
    >
      {images.map((item) => (
        <SwiperSlide
          style={{ width: IMAGE_CARD_SIZE[coverType || 1].width }}
          key={item.image}
        >
          <Link href={item.link}>
            <a>
              <div className="group">
                <Image
                  src={resizeImage(item.image, '380', '532')}
                  className="thumbnail group-hover:brightness-100 transition duration-300 object-cover rounded-lg"
                  alt="Cover"
                  width={IMAGE_CARD_SIZE[coverType || 1].width}
                  height={IMAGE_CARD_SIZE[coverType || 1].height}
                />
                <h1 className="group-hover:text-primary text-center font-semibold transition duration-300 mt-3 pb-1 px-2 m-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
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

export default memo(SectionSlider);