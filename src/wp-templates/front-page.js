import { gql, useLazyQuery, query } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Grid,
  Divider,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Header from "../components/header";
import Footer from "../components/footer";
import { PostCard } from "../components/PostCard";
import { Landing } from "../components/Landing";
import { QuoteCarousel } from "../components/carousels/QuoteCarousel";
import { Eyebrow } from "../components/Eyebrow";

import styles from "./front-page.module.css";

import placeholderThumbImage from "../assets/placeholder_thumb.jpg";
import cardGrayImage from "../assets/card_gray.jpg";

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
      console.log(data);
    }
  }, [data]);

  const testDataFetching = () => {
    getPublications();
  };

  useGSAP(() => {
    // gsap code here...
    gsap.to('[class*="front-page_section-content-trigger"]', {
      x: 260,
      scrollTrigger: {
        trigger: '[class*="front-page_black"]',
        start: () => "top top",
        end: () => "bottom top",
        scrub: true,
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
        /* markers: true, */
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
          style={{ position: "relative" }}
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
              <Stack w={"fit-content"} gap={"0.25rem"}>
                <Text tt={"capitalize"} fw="500">
                  discover more
                </Text>
                <Divider size={"md"} color="brand.2" />
              </Stack>
              <Button maw="fit-content" onClick={() => testDataFetching()}>
                Test data fetching
              </Button>
            </Stack>
          </Container>
          <div className={styles.landing}>
            <Landing />
          </div>
        </Container>
        <Container
          id="services"
          component={"section"}
          py={"8rem"}
          px={"5rem"}
          w="100%"
          maw={"unset"}
          bg={"var(--mantine-color-brand-1)"}
          className={styles.section}
        >
          <Container
            maw={"unset"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Stack>
              <Eyebrow label={"services"} variant={1} />
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
          bg={"var(--mantine-color-brand-0)"}
          className={`${styles.section} ${styles.black}`}
        >
          <Container
            maw={"unset"}
            w="100%"
            h={"100%"}
            p={0}
            className={`${styles["section-content"]} ${styles["section-content-trigger"]}`}
          >
            <Stack>
              <Eyebrow label={"who are we"} variant={2} />
              <Title c="white" order={3} maw={"16rem"}>
                Meeting the needs of today and tomorrow
              </Title>
              <Text c="white" maw={"21rem"}>
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
          bg={"brand.5"}
          className={styles.section}
        >
          <Container
            maw={"unset"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Grid cols={2} justify="center" align="center">
              <Grid.Col span={5}>
                <Container maw={"unset"} p={0} w={"100%"}>
                  <QuoteCarousel />
                </Container>
              </Grid.Col>
              <Grid.Col span={2}>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "1px",
                    height: "20rem",
                    backgroundColor: "brand.2",
                  }}
                ></div>
              </Grid.Col>
              <Grid.Col span={5}>
                <Container maw={"unset"} p={0} w={"100%"}>
                  <Grid>
                    <Grid.Col span={6}>
                      <Text size={"2.5rem"} fw="500" c="brand.2">
                        50+
                      </Text>
                      <Text>Lorem ipsum dolor sit amet consecte</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size={"2.5rem"} fw="500" c="brand.2">
                        25
                      </Text>
                      <Text>Lorem ipsum dolor sit amet consecte</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size={"2.5rem"} fw="500" c="brand.2">
                        57%
                      </Text>
                      <Text>Lorem ipsum dolor sit amet consecte</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size={"2.5rem"} fw="500" c="brand.2">
                        11+
                      </Text>
                      <Text>Lorem ipsum dolor sit amet consecte</Text>
                    </Grid.Col>
                  </Grid>
                </Container>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        <Container
          id="thought-leadership"
          component={"section"}
          pt={"8rem"}
          pb={0}
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
            <Stack gap={"xs"}>
              <Eyebrow label={"thought leadership"} variant={3} />
              <Grid gutter={"xs"}>
                <Grid.Col span={5}>
                  <Stack>
                    <Title order={2} maw={"20rem"}>
                      What’s Happening at Nexus Health
                    </Title>
                    <Text size="sm">
                      Lorem ipsum dolor sit amet consectetur. Nulla ultrices
                      feugiat et nullam. Dolor libero commodo lectus aliquet.
                      Nulla venenatis at nulla mi at.
                    </Text>
                    <Link
                      href={"publications"}
                      style={{ width: "fit-content" }}
                    >
                      <Stack w={"fit-content"} gap={"0.25rem"}>
                        <Text tt={"capitalize"} fw="500">
                          discover more
                        </Text>
                        <Divider size={"md"} color="brand.2" />
                      </Stack>
                    </Link>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                  <PostCard
                    category={"announcement"}
                    title={"Catch Nexus Health at NGPX 2024"}
                    footer={"December 2-4 | Palm Springs, CA"}
                    link={"/"}
                    colour={"var(--mantine-color-brand-3)"}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <PostCard gradient />
                </Grid.Col>
              </Grid>
              <Grid gutter={"xs"}>
                <Grid.Col span={1}>1</Grid.Col>
                <Grid.Col span={4}>
                  <PostCard
                    category={"journal"}
                    title={"Read a Letter from our CEO Andrew Gottfried"}
                    link={"/"}
                    colour={"var(--mantine-color-brand-4)"}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <PostCard image={cardGrayImage} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <PostCard
                    category={"featured"}
                    title={"Navigating Market Access in Emerging Markets"}
                    image={placeholderThumbImage}
                    link={"/"}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
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
