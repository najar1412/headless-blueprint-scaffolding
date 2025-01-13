import { Box, Text, Stack } from "@mantine/core";
import Image from "next/image";

import styles from "./ServicesCard.module.css";

import arrowTrGreenIcon from "../assets/arrow-tr-green.svg";
import arrowBrBlueIcon from "../assets/arrow-bl-blue.svg";

export const ServicesCard = ({ icon, iconSize, title, items, gsapName }) => {
  return (
    <Box className={`${styles["service-card"]} ${gsapName ? gsapName : ""}`}>
      <Image alt="arrow" className={styles.arrow} src={arrowTrGreenIcon} />
      <Image alt="close" className={styles.close} src={arrowBrBlueIcon} style={{transform: 'rotate(180deg)'}} />
      <Box className={styles["content-1"]}>
        <Stack>
          <Image
            alt={`${title} icon`}
            src={icon}
            className={styles.icon}
            style={{ width: iconSize ? iconSize : "5rem" }}
          />
          <Text
            c="white"
            tt="capitalize"
            maw={"12rem"}
            className={styles.header}
          >
            {title}
          </Text>
        </Stack>
      </Box>
      <Box className={styles["content-2"]}>
        <ul>
          {items.map((item) => (
            <li
              key={item}
              style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}
            >
              <Text fw="500" size="sm">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
