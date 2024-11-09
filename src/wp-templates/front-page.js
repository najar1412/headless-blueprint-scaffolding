import { gql } from "@apollo/client";
import Head from "next/head";
import { Container, Title, Badge, Text, Button } from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";

export default function Component(props) {
  const { title: siteTitle } = props.data.generalSettings;
  const { footer, primaryMenuItems } = props.data;

  const testDataFetching = () => {
    console.log("clicked");
  };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"} maw={"unset"} w="100%" p={0}>
        <Container
          component={"section"}
          h="100vh"
          py={"5rem"}
          w="100%"
          maw={"unset"}
        >
          <Title>Shaping the future of Market Access</Title>
          <Button onClick={() => testDataFetching()}>Test data fetching</Button>
        </Container>
        <Container
          id="services"
          component={"section"}
          py={"5rem"}
          w="100%"
          maw={"unset"}
          bg={"#D0EBE8"}
        >
          <Badge>
            <Text>services</Text>
          </Badge>
          <Title order={2}>
            Lorem ipsum dolor sit amet consectetur sed interdum semper sed
            gravida urna.
          </Title>
        </Container>
        <Container
          id="who-we-are"
          component={"section"}
          py={"5rem"}
          w="100%"
          maw={"unset"}
          bg={"#0A404A"}
        >
          <Badge>
            <Text>who are we</Text>
          </Badge>
          <Title order={2}>
            Lorem ipsum dolor sit amet consectetur sed interdum semper sed
            gravida urna.
          </Title>
        </Container>
        <Container
          id="the-nexus-advantage"
          component={"section"}
          py={"5rem"}
          w="100%"
          maw={"unset"}
          bg={"#FAFAFA"}
        >
          <Title order={2}>quote</Title>
        </Container>
        <Container
          id="thought-leadership"
          component={"section"}
          py={"5rem"}
          w="100%"
          maw={"unset"}
        >
          <Badge>
            <Text>thought leadership</Text>
          </Badge>
          <Title order={2}>What’s Happening at Nexus Health</Title>
        </Container>
        <Container
          id="contact"
          component={"section"}
          py={"5rem"}
          w="100%"
          maw={"unset"}
        >
          <Title>Get in touch</Title>
        </Container>
        <Container component={"section"} py={"5rem"} w="100%" maw={"unset"}>
          <Title order={3}>Subscribe to our Newsletter</Title>
        </Container>
      </Container>

      <Footer node={footer} />
    </>
  );
}

Component.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
    ...${Footer.fragments.entry}
  }
`;
