import { gql } from "@apollo/client";
import {
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Group,
} from "@mantine/core";

import styles from "./footer.module.css";

export default function Footer(props) {
  return (
    <Container component={"footer"} className={styles.footer}>
      <div dangerouslySetInnerHTML={{ __html: props.node.content }} />
      {/* <SimpleGrid cols={2}>
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
      </SimpleGrid> */}
    </Container>
  );
}

/* Footer.variables = ({ databaseId }, ctx) => {
  return {
    id: 35,
  };
}; */

Footer.fragments = {
  entry: gql`
    {
      footer: page(id: 35, idType: DATABASE_ID) {
        title
        content
      }
    }
  `,
};
