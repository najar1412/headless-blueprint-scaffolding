import { Container } from "@mantine/core";

import styles from "../../wp-templates/front-page.module.css";

export const Section = ({
  children,
  label,
  bgColor,
  backgroundElement,
  fullHeight,
}) => {
  return (
    <Container
      id={label}
      component={"section"}
      w="100%"
      h={fullHeight ? "100dvh" : "fit-content"}
      maw={"unset"}
      bg={bgColor ? bgColor : "white"}
      className={`${styles.section} ${styles["section-start"]}`}
      style={{
        position: "relative",
      }}
    >
      <Container
        maw={"1440px!important"}
        w="100%"
        p={0}
        className={`${styles["section-content"]}`}
        style={{
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Container>
      {backgroundElement ? backgroundElement : null}
    </Container>
  );
};
