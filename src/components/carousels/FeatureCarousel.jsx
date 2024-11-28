// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PostCard } from "../PostCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./FeatureCarousel.module.css";

import placeholderThumbImage from "../../assets/placeholder_thumb.jpg";

export const FeatureCarousel = ({ items }) => {
  console.log(items)
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={5}
      slidesPerView={2.5}
    >
      {items
        ? items.map((item) => (
            <SwiperSlide className={styles["swiper-slide"]}>
              <PostCard
                category={"featured"}
                title={item.title}
                image={{src: item.featuredImage.node.sourceUrl}}
                link={item.uri}
                colour={"red"}
              />
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};
