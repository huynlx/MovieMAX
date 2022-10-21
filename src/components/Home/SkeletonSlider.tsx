import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";
import { Navigation } from "swiper";
import Skeleton from "../Shared/Skeleton";

const SkeletonSlider: FC = () => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView="auto"
      slidesPerGroupAuto
      spaceBetween={20}
    >
      {[...new Array(10)].map((_, index) => (
        <SwiperSlide className="!w-[170px] !h-[238px]" key={index}>
          <Skeleton className="w-full h-full rounded-xl" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonSlider;
