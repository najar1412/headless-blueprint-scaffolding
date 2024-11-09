import { Container, Stack, Text, Title } from "@mantine/core";

import styles from "./Cta1.module.css";

export const Cta1 = ({ image, tag, title, copy }) => {
  return (
    <Container
      py="xl"
      className={styles.container}
      style={{ backgroundImage: `url(${image.node.sourceUrl})` }}
    >
      <Stack align="center">
        <Text fw="bold">{tag}</Text>
        <Title>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: copy }}></div>
      </Stack>
    </Container>
  );
};
 