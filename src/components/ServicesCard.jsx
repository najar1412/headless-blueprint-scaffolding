import { Box, Text, List, Stack } from "@mantine/core";
import Image from "next/image";

import styles from "./ServicesCard.module.css";

import arrowTrGreenIcon from "../assets/arrow-tr-green.svg";

export const ServicesCard = ({ icon, title, items }) => {
  return (
    <Box className={styles["service-card"]}>
      <Image className={styles.arrow} src={arrowTrGreenIcon} />
      <Box p="2rem" className={styles["content-1"]}>
        <Stack>
          <Image src={icon} style={{ width: "6rem" }} />
          <Text size="1.8rem" c="white" tt="capitalize">
            {title}
          </Text>
        </Stack>
      </Box>
      <Box p="2rem" pr="4rem" pt={"4rem"} className={styles["content-2"]}>
        <List>
          {items.map((item) => (
            <List.Item my="0.5rem">
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
