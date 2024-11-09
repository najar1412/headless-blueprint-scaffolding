import { gql, useLazyQuery, query } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Title,
  Badge,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Header from "../components/header";
import Footer from "../components/footer";
import { Box } from "../components/Box";

import styles from "./front-page.module.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

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
      server: false,
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
    }
  );

  useEffect(() => {
    if (data) {
      console.log(error);
      console.log(data);
    }
  }, [data]);

  const testDataFetching = () => {
    getPublications();
  };

  useGSAP(() => {
    // gsap code here...
    gsap.to('[class*="front-page_section-content"]', {
      x: 260,
      scrollTrigger: {
        trigger: '[class*="front-page_black"]',
        start: () => "top top",
        end: () => "bottom top",
        scrub: true,
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
        markers: true,
        pin: true,
      },
    }); // <-- automatically reverted
  }); // <-- scope is for selector text (optional)

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"} maw={"unset"} w="100%" p={0}>
        <Container
          component={"section"}
          h="100dvh"
          py={"8rem"}
          px={"5rem"}
          w="100%"
          maw={"unset"}
          className={styles.section}
        >
          <Container
            maw={"unset"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Stack>
              <Title maw={"20rem"}>Shaping the future of Market Access</Title>
              <Text maw={"15rem"}>
                Lorem ipsum dolor sit amet con sectetur adipiscing elit sed do
                eiusm od tempor incididunt.
              </Text>
              <Button maw="fit">Discover more</Button>
              <Button maw="fit" onClick={() => testDataFetching()}>
                Test data fetching
              </Button>
            </Stack>

            <Box />
          </Container>
        </Container>
        <Container
          id="services"
          component={"section"}
          py={"8rem"}
          px={"5rem"}
          w="100%"
          maw={"unset"}
          bg={"#D0EBE8"}
          className={styles.section}
        >
          <Container
            maw={"unset"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Stack>
              <Badge>
                <Text>services</Text>
              </Badge>
              <Title order={2} maw={"32rem"}>
                Lorem ipsum dolor sit amet consectetur sed interdum semper sed
                gravida urna.
              </Title>
            </Stack>
          </Container>
        </Container>
        <Container
          id="who-we-are"
          component={"section"}
          py={"8rem"}
          px={"5rem"}
          w="100%"
          maw={"unset"}
          mih={"100vh"}
          bg={"#0A404A"}
          className={`${styles.section} ${styles.black}`}
        >
          <Container
            maw={"unset"}
            w="100%"
            h={"100%"}
            p={0}
            className={styles["section-content"]}
          >
            <Stack>
              <Badge>
                <Text>who are we</Text>
              </Badge>
              <Title order={3} maw={"16rem"}>
                Meeting the needs of today and tomorrow
              </Title>
              <Text maw={"21rem"}>
                With the growing complexity of the healthcare system and a shift
                toward value-based care, there is increasing pressure to
                demonstrate the impact of a product in more innovative ways.
              </Text>
            </Stack>
          </Container>
        </Container>
        <Container
          id="the-nexus-advantage"
          component={"section"}
          py={"8rem"}
          px={"5rem"}
          w="100%"
          maw={"unset"}
          bg={"#FAFAFA"}
          className={styles.section}
        >
          <Container
            maw={"unset"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <SimpleGrid cols={2}>
              <Container maw={"unset"} p={0} w={"100%"}>
                <Text>carousel</Text>
              </Container>
              <Container maw={"unset"} p={0} w={"100%"}>
                <Grid>
                  <Grid.Col span={6}>
                    <Text size={"xl"}>50+</Text>
                    <Text>Lorem ipsum dolor sit amet consecte</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size={"xl"}>50+</Text>
                    <Text>Lorem ipsum dolor sit amet consecte</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size={"xl"}>50+</Text>
                    <Text>Lorem ipsum dolor sit amet consecte</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size={"xl"}>50+</Text>
                    <Text>Lorem ipsum dolor sit amet consecte</Text>
                  </Grid.Col>
                </Grid>
              </Container>
            </SimpleGrid>
          </Container>
        </Container>
        <Container
          id="thought-leadership"
          component={"section"}
          py={"8rem"}
          px={"5rem"}
          w="100%"
          maw={"unset"}
          className={styles.section}
        >
          <Container
            maw={"unset"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Grid>
              <Grid.Col span={4}>
                <Stack>
                  <Badge>
                    <Text>thought leadership</Text>
                  </Badge>
                  <Title order={2}>What’s Happening at Nexus Health</Title>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur. Nulla ultrices
                    feugiat et nullam. Dolor libero commodo lectus aliquet.
                    Nulla venenatis at nulla mi at.
                  </Text>
                  <Link href={"publications"}>
                    <Text fw="bold">explore</Text>
                  </Link>
                </Stack>
              </Grid.Col>
              <Grid.Col span={4}>2</Grid.Col>
              <Grid.Col span={4}>3</Grid.Col>
            </Grid>
            <Grid>
            <Grid.Col span={2}>1</Grid.Col>
              <Grid.Col span={4}>1</Grid.Col>
              <Grid.Col span={2}>2</Grid.Col>
              <Grid.Col span={4}>3</Grid.Col>
            </Grid>
            {/* <Stack mt={"xl"}>
              {publications.nodes.map((node) => (
                <Stack key={node.title} gap={0}>
                  <Link href={node.uri}>
                    <Text fw="bold">{node.title}</Text>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: node.content }} />
                </Stack>
              ))}
            </Stack> */}
          </Container>
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
