import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function ArticleSwiper() {
  return (
    <div className="h-[400px] relative">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".prev-button", prevEl: ".next-button" }}
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

      <ChevronLeftIcon className="absolute lg:top-[180px] sm:top-44 top-40 -left-4 cursor-pointer ring ring-yellow-200 bg-white rounded-full z-[9] next-button w-8 h-8" />
      <ChevronRightIcon className="absolute lg:top-[180px] sm:top-44 top-40 -right-4 cursor-pointer ring ring-yellow-200 bg-white rounded-full z-[9] prev-button w-8 h-8" />
    </div>
  );
}
