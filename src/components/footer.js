import { gql } from "@apollo/client";
import {
  Container,
  Title,
  SimpleGrid,
  Text,
  Stack,
  Divider,
} from "@mantine/core";

import { GetInTouchForm } from "./forms/GetInTouchForm";
import { NewsletterForm } from "./forms/NewsletterForm";

import styles from "./footer.module.css";

export default function Footer(props) {
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: props.node.content }} /> */}
      <Container
        pt={"8rem"}
        pb={"2rem"}
        px={"5rem"}
        maw={"unset"}
        w="100%"
        id="contact"
      >
        <SimpleGrid
          py="4rem"
          px="2.5rem"
          component={"section"}
          w="100%"
          maw={"unset"}
          cols={2}
          bg="var(--mantine-color-brand-0)"
          className={styles["contact-form-container"]}
        >
          <Container maw={"unset"} m={0}>
            <Title order={2} c='white'>Get in touch</Title>
            <Text c='white'>
              Lorem ipsum dolor sit amet consec tetur. Nulla ultrices feugiat et
              nullam.
            </Text>
          </Container>
          <Container maw={"unset"} m={0}>
            <GetInTouchForm />
          </Container>
        </SimpleGrid>
        <Container component={"section"} py={"5rem"} w="100%" maw={"unset"}>
          <Stack>
            <Title order={3}>Subscribe to our Newsletter</Title>
            <Text maw={"22rem"}>
              Join our email list to receive news and updates from Nexus Health
              Group.
            </Text>
          </Stack>
          <NewsletterForm />
        </Container>
        <Container w="100%" maw={"unset"}>
          <Divider />
          <Text size="xs" mt="1.5rem">
            Copyright (c) 2024, Nexus Health Group, All rights reserved.
          </Text>
        </Container>
      </Container>
    </>
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
