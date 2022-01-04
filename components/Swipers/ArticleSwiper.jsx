import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";

export default function ArticleSwiper({ articles }) {
  const { width } = useMediaQuery();
  const [slidesPerView, setSlidesPerView] = useState(2);

  useEffect(() => {
    if (width > 600) {
      setSlidesPerView(5);
    } else {
      setSlidesPerView(2);
    }
  }, [width]);

  return (
    <div className="h-[450px] relative mt-16 md:mt-0">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".prev-button", prevEl: ".next-button" }}
        spaceBetween={0}
        slidesPerView={slidesPerView}
      >
        {articles
          ?.filter((t) => t.status === "Published")
          .map((a, idx) => (
            <SwiperSlide key={idx}>
              <Link href={`/articles/${a._id}`}>
                <div className="md:w-full h-[350px] md:h-[450px] relative cursor-pointer group">
                  <Image
                    src={a.image}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 text-white flex justify-center items-center flex-col p-2">
                    <p className="text-center font-bold mb-3 text-xs md:text-base">
                      {a.title}
                    </p>
                    <p className="font-mono text-xs md:text-base text-center">
                      By: {a.writer}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      {articles.length !== 0 && (
        <>
          <ChevronLeftIcon className="absolute lg:top-[180px] sm:top-44 top-40 -left-4 cursor-pointer ring ring-yellow-200 bg-white rounded-full z-[9] next-button w-8 h-8" />
          <ChevronRightIcon className="absolute lg:top-[180px] sm:top-44 top-40 -right-4 cursor-pointer ring ring-yellow-200 bg-white rounded-full z-[9] prev-button w-8 h-8" />
        </>
      )}
    </div>
  );
}
