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

import styles from "../wp-templates/front-page.module.css";

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
        <Container maw={"unset"} m={0} className={styles["section-content"]}>
          <SimpleGrid
            component={"section"}
            py="4rem"
            px="4rem"
            w="100%"
            maw={"unset"}
            cols={2}
            bg="var(--mantine-color-brand-0)"
            className={styles["contact-form-container"]}
          >
            <Container maw={"unset"} m={0}>
              <Stack>
                <Title order={1} size="2.5rem" c="white">
                  Get in Touch
                </Title>
                <Text c="white">
                  Lorem ipsum dolor sit amet consec tetur. Nulla ultrices
                  feugiat et nullam.
                </Text>
              </Stack>
            </Container>
            <Container maw={"unset"} m={0}>
              <GetInTouchForm />
            </Container>
          </SimpleGrid>
        </Container>

        <Container
          className={styles["section-content"]}
          py={"5rem"}
          w="100%"
          maw={"unset"}
        >
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
          <Text size="0.5rem" mt="1.5rem" opacity={0.5}>
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
