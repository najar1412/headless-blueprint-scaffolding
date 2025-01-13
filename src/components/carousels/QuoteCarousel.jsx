// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Group, Text } from "@mantine/core";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./QuoteCarousel.module.css";

export const QuoteCarousel = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
        autoplay={{
          delay: 30000000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className={styles["swiper-slide"]}>
          <Group wrap="no-wrap" align="flex-start" gap={0}>
            <Text
              size="5rem"
              c="brand.4"
              style={{ transform: "translate(-1rem)" }}
            >
              “
            </Text>
            <Flex direction={"column"}>
              <Text size="md" lh={"1.5rem"} mb={"1rem"} fw={500}>
                You delivered the exact type of  strategic support our team
                needs to expand thinking and identify options to how our payer
                story evolves.”
              </Text>
              <Text fw={300} size="sm">
                —Jane Doe, Executive Director
              </Text>
            </Flex>
          </Group>
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          <Group wrap="no-wrap" align="flex-start" my="auto">
            <Text
              size="5rem"
              c="brand.4"
              style={{ transform: "translateY(-1rem)" }}
            >
              “
            </Text>
            <Flex direction={"column"}>
              <Text size="md" lh={"1.5rem"} mb={"1rem"} fw={500}>
                You delivered the exact type of  strategic support our team
                needs to expand thinking and identify options to how our payer
                story evolves.”
              </Text>
              <Text fw={300} size="sm">
                —Jane Doe, Executive Director
              </Text>
            </Flex>
          </Group>
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          <Group wrap="no-wrap" align="flex-start">
            <Text
              size="5rem"
              c="brand.4"
              style={{ transform: "translateY(-1rem)" }}
            >
              “
            </Text>
            <Flex direction={"column"}>
              <Text size="md" lh={"1.5rem"} mb={"1rem"} fw={500}>
                You delivered the exact type of  strategic support our team
                needs to expand thinking and identify options to how our payer
                story evolves.”
              </Text>
              <Text fw={300} size="sm">
                —Jane Doe, Executive Director
              </Text>
            </Flex>
          </Group>
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          <Group wrap="no-wrap" align="flex-start">
            <Text
              size="5rem"
              c="brand.4"
              style={{ transform: "translateY(-1rem)" }}
            >
              “
            </Text>
            <Flex direction={"column"}>
              <Text size="md" lh={"1.5rem"} mb={"1rem"} fw={500}>
                You delivered the exact type of  strategic support our team
                needs to expand thinking and identify options to how our payer
                story evolves.”
              </Text>
              <Text fw={300} size="sm">
                —Jane Doe, Executive Director
              </Text>
            </Flex>
          </Group>
        </SwiperSlide>
        <div className="swiper-custom-pagination" />
      </Swiper>
    </>
  );
};
