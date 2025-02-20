import { useState } from "react";

import { Group, Image } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";

import { PostCard } from "../PostCard";

import placeholderImage from "../../assets/card_gray.jpg";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./FeatureCarousel.module.css";

import arrowUpIcon from "../../assets/arrow-up.svg";

export const FeatureCarousel = ({ items }) => {
  const [swiper, setSwiper] = useState();

  return (
    <>
      <Group gap={"0.5rem"} className={styles["swiper-controls"]}>
        <div className={styles.arrow} onClick={() => swiper.slidePrev()}>
          <Image
            src={arrowUpIcon.src}
            w={"1rem"}
            style={{ transform: "rotate(-90deg)" }}
          />
        </div>
        <div className={styles.arrow} onClick={() => swiper.slideNext()}>
          <Image
            src={arrowUpIcon.src}
            w={"1rem"}
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      </Group>
      <Swiper
      className={styles["swiper"]}
        onSwiper={setSwiper}
        breakpoints={{
          700: {
            spaceBetween: 10,
            slidesPerView: 2,
          },
          900: {
            spaceBetween: 10,
            slidesPerView: 2.5,
          },
        }}
      >
        {items
          ? items.map((item) => (
              <SwiperSlide className={styles["swiper"]}>
                <PostCard
                  category={"featured"}
                  title={item.title}
                  image={{
                    src: item.featuredImage
                      ? item.featuredImage.node.sourceUrl
                      : placeholderImage.src,
                  }}
                  link={item.uri}
                  featureCarousel
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </>
  );
};
