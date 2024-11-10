// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PostCard } from "../PostCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./FeatureCarousel.module.css";

import placeholderThumbImage from "../../assets/placeholder_thumb.jpg";

export const FeatureCarousel = () => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={5}
      slidesPerView={2.5}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <PostCard
          category={"featured"}
          title={"Navigating Market Access in Emerging Markets"}
          image={placeholderThumbImage}
          link={"/"}
          colour={"red"}
        />
      </SwiperSlide>
    </Swiper>
  );
};
