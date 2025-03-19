import { gql } from "@apollo/client";
import {
  Container,
  Title,
  SimpleGrid,
  Text,
  Stack,
  Divider,
  Image,
  Space,
} from "@mantine/core";

import { GetInTouchForm } from "./forms/GetInTouchForm";
import { NewsletterForm } from "./forms/NewsletterForm";
import { Gradient } from "./animated/Gradient";

import styles from "../wp-templates/front-page.module.css";

import arrowUpIcon from "../assets/arrow-up.svg";

export default function Footer({ newsletterForm, getInTouchForm }) {
  return (
    <>
      <Container
        className={styles["footer-margin"]}
        pb={"2rem"}
        maw={"unset"}
        w="100%"
        id="contact"
        bg={"white"}
        style={{
          position: "relative",
        }}
      >
        <Container
          maw={"1440px!important"}
          className={styles["section-content"]}
          style={{ zIndex: 2, position: "relative" }}
        >
          <SimpleGrid
            component={"section"}
            w="100%"
            maw={"unset"}
            bg="var(--mantine-color-brand-0)"
            cols={{ base: 1, md: 2 }}
            className={styles["contact-form-container"]}
          >
            <Stack px={"lg"}>
              <Title order={1} size="3.05rem" c="white">
                Get in Touch
              </Title>
              <Text c="white" size="1.2rem" lh="1.5rem" maw={"20rem"}>
                Together, we can build smarter, more effective access solutions.
              </Text>
            </Stack>
            <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              <GetInTouchForm form={getInTouchForm} />
            </div>
          </SimpleGrid>
        </Container>

        <Container
          className={styles["section-content"]}
          py={"5rem"}
          w="100%"
          maw={"1440px!important"}
          style={{ zIndex: 2, position: "relative" }}
        >
          <Stack className={styles["footer-stack"]}>
            <Title order={3} size="1.25rem" lh="1.5rem">
              Subscribe to our Newsletter
            </Title>
            <Text maw={"18rem"} fw="500" size="0.78rem" lh={"1.25rem"}>
              Join our email list to receive news and updates from Nexus Health
              Group.
            </Text>
            <NewsletterForm form={newsletterForm} />
          </Stack>
          <div
            className={styles["return-to-top"]}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Image src={arrowUpIcon.src} w={"3rem"} />
          </div>

          <Space h={"1rem"} hiddenFrom="md" />
        </Container>

        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            maxWidth: "1440px",
            position: "relative",
            zIndex: 999999,
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <Divider color="#5A5A5A" w={"100%"} size="xs" />
          <Text size="0.5rem" mt="1.5rem" c={"#5A5A5A"}>
            Copyright (c) {new Date().getFullYear()}, Nexus Health Group, All
            rights reserved.
          </Text>
        </div>

        <Gradient />
      </Container>
    </>
  );
}

Footer.fragments = {
  entry: gql`
    {
      footer: page(id: 35, idType: DATABASE_ID) {
        title
        content
      }
      form: gfForm(id: 1) {
        title
      }
    }
  `,
};
