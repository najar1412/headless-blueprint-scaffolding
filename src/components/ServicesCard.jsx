import { Box, Text, List, Stack } from "@mantine/core";
import Image from "next/image";

import styles from "./ServicesCard.module.css";

import arrowTrGreenIcon from "../assets/arrow-tr-green.svg";
import closeIcon from "../assets/close_24dp_5F6368_FILL0_wght200_GRAD0_opsz24.svg";

export const ServicesCard = ({ icon, title, items }) => {
  return (
    <Box className={styles["service-card"]}>
      <Image alt="arrow" className={styles.arrow} src={arrowTrGreenIcon} />
      <Image alt="close" className={styles.close} src={closeIcon} />
      <Box className={styles["content-1"]}>
        <Stack>
          <Image alt={`${title} icon`} src={icon} className={styles.icon} />
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
        <List>
          {items.map((item) => (
            <List.Item key={item} my="0.5rem">
              <Text fw="500" size="sm">
                {item}
              </Text>
            </List.Item>
          ))}
        </List>
      </Box>
    </Box>
  );
};
