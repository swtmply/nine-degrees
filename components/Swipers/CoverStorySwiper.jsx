import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image from "next/image";

export default function CoverStory() {
  return (
    <div className="w-[55%] h-[400px] bg-stone-50 rounded-bl-[4rem]">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
      >
        {[...Array(3)].map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-[400px] relative">
              <Image
                className="rounded-b-[4rem]"
                src="/assets/samples/PUBMAT SAMPLE.jpg"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
