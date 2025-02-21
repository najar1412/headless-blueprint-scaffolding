import { Box, Text, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import styles from "./PostCard.module.css";

import arrow from "../assets/arrow-br.svg";
import arrowGreen from "../assets/arrow-br-lg-green.svg";
import arrowGreenLight from "../assets/arrow-br-lg-light-green.svg";

export const PostCard = ({
  gsapName,
  category,
  title,
  footer,
  link,
  colour,
  image,
  gradient,
  featureCarousel,
}) => {
  const cardLayout = (category) => {
    switch (category) {
      case "announcement":
        return {
          shell: styles["shell-1"],
          inner: styles["inner-3"],
          fontColour: "var(--mantine-color-brand-0)",
          arrow: styles["arrow-absolute-2"],
          arrowIcon: arrowGreen,
        };
      case "journal":
        return {
          shell: styles["shell-3"],
          inner: styles["inner-2"],
          fontColour: "var(--mantine-color-brand-0)",
          arrow: styles.arrow,
          arrowIcon: arrow,
        };
      case "featured":
        return {
          shell: featureCarousel ? styles["shell-5"] : styles["shell-4"],
          inner: featureCarousel ? styles["inner-4"] : styles["inner-1"],
          fontColour: "white",
          arrow: featureCarousel
            ? styles["arrow-absolute-top"]
            : styles["arrow-absolute"],
          arrowIcon: arrowGreenLight,
        };
      default:
        return {
          shell: styles["shell-2"],
          inner: styles["inner-2"],
          fontColour: "var(--mantine-color-brand-0)",
          arrow: styles.arrow,
          arrowIcon: arrow,
        };
    }
  };

  const layout = cardLayout(category);

  return (
    <Box
      component="div"
      w="100%"
      h="100%"
      mih={{ base: "1rem", md: "15rem" }}
      className={`${layout.shell} ${styles["bg-image"]} ${
        gradient ? styles.gradient : ""
      } ${gsapName ? gsapName : ""}`}
      style={{
        backgroundImage: image ? `url(${image.src})` : "",
        backgroundColor: colour && !image ? colour : "transparent",
      }}
    >
      <Box className={`${layout.inner}`}>
        <Stack
          gap={"0.25rem"}
          style={{
            position: category === "announcement" ? "static" : "relative",
          }}
        >
          {category ? (
            <Text
              tt="uppercase"
              fw="700"
              c={layout.fontColour}
              className={styles["category"]}
            >
              {category}
            </Text>
          ) : null}
          {title ? (
            <Link href={link}>
              <Text
                fw={700}
                c={layout.fontColour}
                lineClamp={3}
                className={
                  category === "featured"
                    ? styles["title-feature"]
                    : styles["title"]
                }
              >
                {title}
              </Text>
            </Link>
          ) : null}
          {footer ? (
            <Text mt="1rem" size="0.6rem" c={layout.fontColour}>
              {footer}
            </Text>
          ) : null}
          {category ? (
            <div className={layout.arrow}>
              <Image alt="arrow" src={layout.arrowIcon} />
            </div>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
};
