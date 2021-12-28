import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function ArticleSwiper({ articles }) {
  return (
    <div className="h-[450px] relative">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".prev-button", prevEl: ".next-button" }}
        spaceBetween={0}
        slidesPerView={5}
      >
        {articles
          ?.filter((t) => t.status === "Published")
          .map((a, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full h-[450px] relative">
                <Image src={a.image} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 text-white flex justify-center items-center flex-col">
                  <p className="text-center font-bold mb-3">{a.title}</p>
                  <p className="font-mono">By: {a.writer}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <ChevronLeftIcon className="absolute lg:top-[180px] sm:top-44 top-40 -left-4 cursor-pointer ring ring-yellow-200 bg-white rounded-full z-[9] next-button w-8 h-8" />
      <ChevronRightIcon className="absolute lg:top-[180px] sm:top-44 top-40 -right-4 cursor-pointer ring ring-yellow-200 bg-white rounded-full z-[9] prev-button w-8 h-8" />
    </div>
  );
}
