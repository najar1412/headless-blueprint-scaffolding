import { gql, useLazyQuery, query } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { Container, Title, Badge, Text, Button, Stack } from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import { Box } from "../components/Box";

gsap.registerPlugin(useGSAP);

const GET_PUBLICATIONS = gql`
  query GetPublications {
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

export default function Component(props) {
  const { title: siteTitle } = props.data.generalSettings;
  const { publications, footer, primaryMenuItems } = props.data;
  const [getPublications, { loading, error, data }] = useLazyQuery(
    GET_PUBLICATIONS,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const testDataFetching = () => {
    getPublications();
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
          <Link href={"publications"}>
            <Text fw="bold">explore</Text>
          </Link>
          <Stack mt={"xl"}>
            {publications.nodes.map((node) => (
              <Stack key={node.title} gap={0}>
                <Link href={node.uri}>
                  <Text fw="bold">{node.title}</Text>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.content }} />
              </Stack>
            ))}
          </Stack>
        </Container>
      </Container>

      <Footer node={footer} />
    </>
  );
}

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
