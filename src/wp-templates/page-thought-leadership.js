import { gql } from "@apollo/client";
import { Title, Container, Divider, Stack, Group } from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Header from "../components/header";
import Footer from "../components/footer";
import { FeatureCarousel } from "../components/carousels/FeatureCarousel";
import { Eyebrow } from "../components/Eyebrow";
import LoadMorePublications from "../components/LoadMorePublications";
import { Loading } from "../components/animated/Loading";

import styles from "./page-thought-leadership.module.css";

export default function PageThoughtLeadership(props) {
  const { publications, footer, page, primaryMenuItems } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <Loading />;
  }

  useGSAP(() => {
    // TODO: imp timelines for sectional animation
    //https://gsap.com/community/forums/topic/36504-gsap-scrolltrigger-loop-through-array/
    // sectional animation
  });

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} page={page} />

      <Container
        component={"main"}
        maw={"unset"}
        w="100%"
        p={0}
        px={"4rem"}
        className={`main`}
      >
        <Container
          component={"section"}
          className={`${styles.container}`}
          pt={"4rem"}
          pb={0}
          px={0}
          w="100%"
          maw={"1440px!important"}
        >
          <Stack my="5rem">
            <Title size="3rem" mb="1rem">
              Thought Leadership
            </Title>
            <Group justify="space-between">
              <Eyebrow label={"featured"} variant={3} />
            </Group>
            <Container p={0} maw={"100%"} m={0}>
              <FeatureCarousel
                items={publications.nodes.filter((publication) =>
                  publication.publicationMeta.postType.includes("featured")
                )}
              />
            </Container>
          </Stack>
        </Container>
        <Container
          component={"section"}
          pt={"0"}
          className={`${styles["post-container"]}`}
          w="100%"
          maw={"1440px!important"}
        >
          <Stack>
            <Divider color={"#0A404A"} mb="1rem" />
            <LoadMorePublications />
          </Stack>
        </Container>
      </Container>

      <Footer node={footer} />
    </>
  );
}

PageThoughtLeadership.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    uri: "/publications",
  };
};

PageThoughtLeadership.query = gql`
  ${Header.fragments.entry}

  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    ...HeaderFragment
    ...${Footer.fragments.entry}

    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    
    publications {
      nodes {
        databaseId
        uri
        ... on NodeWithTitle {
          title
        }
        ... on NodeWithFeaturedImage {
        featuredImage {
          node {
            id
            sourceUrl
          }
        }}
        ... on NodeWithContentEditor {
          content
        }
        publicationMeta: publicationMeta {
          date
          author
          postType
        }
      }
    }
  }
`;
