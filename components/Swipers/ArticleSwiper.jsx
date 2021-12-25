import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";

export default function ArticleSwiper() {
  return (
    <div className="h-[400px]">
      <Swiper
        modules={[Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={5}
      >
        {[...Array(10)].map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-[400px] relative">
              <Image
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
