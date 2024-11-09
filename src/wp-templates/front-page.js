import { gql } from "@apollo/client";
import Head from "next/head";
import {
  Container,
  Title,
  Badge,
  Text,
  Button,
  SimpleGrid,
  Divider,
  Stack,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Header from "../components/header";
import Footer from "../components/footer";
import { Box } from "../components/Box";

gsap.registerPlugin(useGSAP);

export default function Component(props) {
  const { title: siteTitle } = props.data.generalSettings;
  const { publications, footer, primaryMenuItems } = props.data;

  const testDataFetching = () => {
    console.log("clicked");
    console.log(publications.nodes);
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
          <Box />
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
          <Stack mt={'xl'}>
            {publications.nodes.map((node) => (
              <>
                <Stack key={node.title} gap={0}>
                  <Text fw="bold">{node.title}</Text>
                  <div dangerouslySetInnerHTML={{ __html: node.content }} />
                </Stack>
              </>
            ))}
          </Stack>
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

/* Component.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
    ...${Footer.fragments.entry}
  }
`; */

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    uri: "/publications",
  };
};

Component.query = gql`
  ${Header.fragments.entry}

  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    ...HeaderFragment
    ...${Footer.fragments.entry}
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      acf: publicationPage {
        cta1{
        image {
          node {
            sourceUrl
          }
        }
        tag
        title
        copy
        }
      }
    }
    
    publications {
      nodes {
        databaseId
        uri
        ... on NodeWithTitle {
          title
        }
        ... on NodeWithContentEditor {
          content
        }
      }
    }
  }
`;
