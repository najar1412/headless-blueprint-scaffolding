import { gql } from "@apollo/client";
import { Container, Title, SimpleGrid, Text } from "@mantine/core";

import { GetInTouchForm } from "./forms/GetInTouchForm";
import { NewsletterForm } from "./forms/NewsletterForm";
import styles from "./footer.module.css";

export default function Footer(props) {
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: props.node.content }} /> */}

      <SimpleGrid
        id="contact"
        component={"section"}
        py={"5rem"}
        w="100%"
        maw={"unset"}
        cols={2}
      >
        <Container maw={"unset"} m={0}>
          <Title>Get in touch</Title>
          <Text>
            Lorem ipsum dolor sit amet consec tetur. Nulla ultrices feugiat et
            nullam.
          </Text>
        </Container>
        <Container maw={"unset"} m={0}>
          <GetInTouchForm />
        </Container>
      </SimpleGrid>
      <Container component={"section"} py={"5rem"} w="100%" maw={"unset"}>
        <Title order={3}>Subscribe to our Newsletter</Title>
        <Text>
          Join our email list to receive news and updates from Nexus Health
          Group.
        </Text>
        <NewsletterForm />
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
