import { Box, Text, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import styles from "./PostCard.module.css";

import arrow from "../assets/arrow-br.svg";

export const PostCard = ({
  category,
  title,
  footer,
  link,
  colour,
  image,
  gradient,
}) => {
  const cardLayout = (category) => {
    switch (category) {
      case "announcement":
        return {
          shell: styles["shell-1"],
          inner: styles["inner-2"],
          fontColour: "var(--mantine-color-brand-0)",
          arrow: styles.arrow,
        };
      case "journal":
        return {
          shell: styles["shell-3"],
          inner: styles["inner-2"],
          fontColour: "var(--mantine-color-brand-0)",
          arrow: styles.arrow,
        };
      case "featured":
        return {
          shell: styles["shell-4"],
          inner: styles["inner-1"],
          fontColour: "white",
          arrow: styles["arrow-absolute"],
        };
      default:
        return {
          shell: styles["shell-2"],
          inner: styles["inner-2"],
          fontColour: "var(--mantine-color-brand-0)",
          arrow: styles.arrow,
        };
    }
  };

  const layout = cardLayout(category);

  return (
    <Box
      component="div"
      w="100%"
      h="100%"
      mih={"15rem"}
      className={`${layout.shell} ${styles["bg-image"]} ${
        gradient ? styles.gradient : ""
      }`}
      style={{
        backgroundImage: image ? `url(${image.src})` : "",
        backgroundColor: colour && !image ? colour : "transparent",
      }}
    >
      <Box className={`${layout.inner}`}>
        <Stack gap={"0.25rem"} style={{ position: "relative" }}>
          {category ? (
            <Text size="0.6rem" tt="uppercase" fw="500" c={layout.fontColour}>
              {category}
            </Text>
          ) : null}
          {title ? (
            <Link href={link}>
              <Text size="md" fw={500} lh={"1.25rem"} c={layout.fontColour}>
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
              <Image alt="arrow" src={arrow} />
            </div>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
};
