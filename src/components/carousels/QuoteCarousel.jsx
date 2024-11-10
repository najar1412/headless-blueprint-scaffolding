// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Text } from "@mantine/core";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./QuoteCarousel.module.css";

export const QuoteCarousel = () => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className={styles["swiper-slide"]}>
        <Text size="xl" lh={"1.5rem"} mb={"1rem"}>
          You delivered the exact type of  strategic support our team needs to
          expand thinking and identify options to how our payer story evolves.”
        </Text>
        <Text>-Jane Doe, Executive Director</Text>
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Text size="xl" lh={"1.5rem"} mb={"1rem"}>
          You delivered the exact type of  strategic support our team needs to
          expand thinking and identify options to how our payer story evolves.”
        </Text>
        <Text>-Jane Doe, Executive Director</Text>
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Text size="xl" lh={"1.5rem"} mb={"1rem"}>
          You delivered the exact type of  strategic support our team needs to
          expand thinking and identify options to how our payer story evolves.”
        </Text>
        <Text>-Jane Doe, Executive Director</Text>
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Text size="xl" lh={"1.5rem"} mb={"1rem"}>
          You delivered the exact type of  strategic support our team needs to
          expand thinking and identify options to how our payer story evolves.”
        </Text>
        <Text>-Jane Doe, Executive Director</Text>
      </SwiperSlide>
    </Swiper>
  );
};
