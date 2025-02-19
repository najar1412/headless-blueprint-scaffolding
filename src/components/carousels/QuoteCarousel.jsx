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
          delay: 5000,
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
                When we were tasked with throwing together a payer advisory
                board meeting so quickly, your team delivered in a pinch and
                executed it flawlessly. Thank you for your strategic
                partnership, for anticipating our needs, for knowing the market
                and how payers respond, and for doing it all with such a great
                attitude!”
              </Text>
              <Text fw={300} size="sm">
                —Director, Payer Marketing at a midsize biotech company
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
                The quality of work your team provides is so much higher than
                any other agency. You understand what I need much better, and we
                don’t have the same amount of time-consuming back and forth.”
              </Text>
              <Text fw={300} size="sm">
                —Director Market Access at a large pharmaceutical company
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
                The Nexus team was instrumental in ensuring care was delivered
                and reimbursed for a patient who otherwise would have faced
                premature death and significant disability. You helped save a
                child’s life.”
              </Text>
              <Text fw={300} size="sm">
                —General Manager at a gene therapy company
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
                Your team is always so prepared. You’re efficient and great to
                work with.”
              </Text>
              <Text fw={300} size="sm">
                —Senior Medical Reviewer at a large pharmaceutical company
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
                You delivered the exact type of strategic support our team needs
                to expand thinking and identify options to how our payer story
                evolves.”
              </Text>
              <Text fw={300} size="sm">
                —Executive Director, Access Strategy at a midsize biotech
                company
              </Text>
            </Flex>
          </Group>
        </SwiperSlide>
        <div className="swiper-custom-pagination" />
      </Swiper>
    </>
  );
};
