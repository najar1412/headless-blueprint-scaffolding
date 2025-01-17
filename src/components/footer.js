import { gql } from "@apollo/client";
import {
  Container,
  Title,
  SimpleGrid,
  Text,
  Stack,
  Divider,
  Image,
} from "@mantine/core";

import { GetInTouchForm } from "./forms/GetInTouchForm";
import { NewsletterForm } from "./forms/NewsletterForm";
import { Gradient } from "./animated/Gradient";

import styles from "../wp-templates/front-page.module.css";

import arrowUpIcon from "../assets/arrow-up.svg";

export default function Footer(props) {
  return (
    <>
      <Container
        className={styles["footer-margin"]}
        pt={"8rem"}
        pb={"2rem"}
        maw={"unset"}
        w="100%"
        id="contact"
        style={{
          position: "relative",
        }}
      >
        <Container
          maw={"1440px!important"}
          className={styles["section-content"]}
        >
          <SimpleGrid
            component={"section"}
            w="100%"
            maw={"unset"}
            bg="var(--mantine-color-brand-0)"
            cols={{ base: 1, md: 2 }}
            className={styles["contact-form-container"]}
          >
            <Container maw={"unset"} mx={"auto"}>
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
          maw={"1440px!important"}
          style={{ position: "relative" }}
        >
          <Stack>
            <Title order={3} size="1.25rem" lh="1.5rem">
              Subscribe to our Newsletter
            </Title>
            <Text maw={"18rem"} fw="500" size="0.78rem" lh={"1.25rem"}>
              Join our email list to receive news and updates from Nexus Health
              Group.
            </Text>
          </Stack>
          <div
            className={styles["return-to-top"]}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Image src={arrowUpIcon.src} w={"3rem"} />
          </div>
          <NewsletterForm />
        </Container>
        <Container w="100%" maw={"1440px!important"}>
          <Divider color="#5A5A5A" size="0.1" />
          <Text size="0.5rem" mt="1.5rem" c={"#5A5A5A"}>
            Copyright (c) 2024, Nexus Health Group, All rights reserved.
          </Text>
        </Container>
        <Gradient />
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
