import { gql } from "@apollo/client";
import { Title, Container, Divider, Stack } from "@mantine/core";
import Head from "next/head";

import Header from "../components/header";
import Footer from "../components/footer";
import { FeatureCarousel } from "../components/carousels/FeatureCarousel";
import { Eyebrow } from "../components/Eyebrow";
import LoadMorePublications from "../components/LoadMorePublications";
import { Loading } from "../components/animated/Loading";
import CustomCursor from "../components/CustomCursor";

import styles from "./page-thought-leadership.module.css";

import favicon from "../favicon.png";

export default function PageThoughtLeadership(props) {
  const {
    publications,
    footer,
    page,
    primaryMenuItems,
    newsletterForm,
    getInTouchForm,
  } = props.data;
  const { title: siteTitle } = props.data.generalSettings;

  // Loading state for previews
  if (props.loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <meta
          name="description"
          content="Bringing together scientific expertise, strategic insights, and innovative solutions to navigate market access, optimize reimbursement, and accelerate patient access."
        />
      </Head>

      <CustomCursor />
      <Header menuItems={primaryMenuItems.nodes} page={page} />

      <Container
        maw={"unset"}
        p={0}
        className={styles.title}
        style={{ position: "relative", zIndex: -1 }}
      >
        <Container
          pt={"8rem"}
          pb={"1rem"}
          px={0}
          mx="auto"
          style={{ maxWidth: "1440px" }}
        >
          <Title size="3rem" mb="2rem" fw="600">
            Thought Leadership
          </Title>
          <Eyebrow label={"featured"} variant={3} />
        </Container>
      </Container>

      <div className={styles["carousel-grid"]}>
        <div></div>
        <div
          style={{
            gridColumnStart: 2,
            gridColumnEnd: 4,
          }}
        >
          <FeatureCarousel
            items={publications.nodes.filter((publication) =>
              publication.publicationMeta.postType.includes("featured")
            )}
          />
        </div>
        <div></div>
      </div>

      <Container maw={"unset"} w="100%" p={0} className={styles.main}>
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

      <Footer
        node={footer}
        globalOptions={page?.globalFields}
        newsletterForm={newsletterForm}
        getInTouchForm={getInTouchForm}
      />
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
      globalFields {
      linkedin
      getInTouchForm {
        title
        copy
      }
        newsletterForm {
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
