// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Group, Stack, Text } from "@mantine/core";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./QuoteCarousel.module.css";

export const QuoteCarousel = ({ quotes }) => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
        autoplay={{
          // delay: 50000000,
          disableOnInteraction: false,
        }}
      >
        {quotes.map((quote) => (
          <SwiperSlide className={styles["swiper-slide"]}>
            <Group wrap="no-wrap" align="flex-start" gap={"xs"}>
              <Text
                size="5rem"
                c="#BCDC49"
                style={{ transform: "translateY(-0.5rem)" }}
                visibleFrom="md"
              >
                “
              </Text>
              <Flex direction={"column"}>
                <Stack gap={0}>
                  <Text
                    size="5rem"
                    c="#BCDC49"
                    hiddenFrom="md"
                    style={{
                      lineHeight: "4rem",
                    }}
                  >
                    “
                  </Text>
                  <Text
                    size="md"
                    mb={"1rem"}
                    fw={500}
                    className={styles["quote-copy"]}
                  >
                    {quote.quote}
                  </Text>
                </Stack>

                <Text fw={300} size="sm" className={styles["quoter-copy"]}>
                  {quote.quoter}
                </Text>
              </Flex>
            </Group>
          </SwiperSlide>
        ))}
        <div className="swiper-custom-pagination" />
      </Swiper>
    </>
  );
};
