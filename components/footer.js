import {
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Group,
} from "@mantine/core";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <Container component={"footer"} className={styles.footer}>
      <SimpleGrid cols={2}>
        <Stack>
          <Text>address</Text>
          <Text>contact</Text>
        </Stack>
        <Stack>
          <Text>link 1</Text>
          <Text>link 1</Text>
          <Text>link 1</Text>
          <Text>link 1</Text>
          <Text>link 1</Text>
          <Text>link 1</Text>
          <Text>link 1</Text>
        </Stack>
      </SimpleGrid>
      <Divider />
      <SimpleGrid cols={2}>
        <Text>copyright</Text>
        <Group>
          <Text>privary policy</Text>
          <Text>terms of service</Text>
        </Group>
      </SimpleGrid>
    </Container>
  );
}
