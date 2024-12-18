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

export default function PageThoughtLeadership(props) {
  const { publications, footer, page, primaryMenuItems } = props.data;

  console.log(page);

  // Loading state for previews
  if (props.loading) {
    return <Loading />;
  }

  useGSAP(() => {
    // TODO: imp timelines for sectional animation
    //https://gsap.com/community/forums/topic/36504-gsap-scrolltrigger-loop-through-array/
    const sections = gsap.utils.toArray('[class*="front-page_section"]');

    // initial page animation
    gsap.set(['[class*="main"]', '[class*="header"]'], { opacity: 1 });

    // sectional animation
    sections.forEach((section, i) => {
      gsap.set('[class*="front-page_section-content"]', { autoAlpha: 0 });
      if (!i) {
        gsap.to('[class*="front-page_section-content"]', {
          filter: "blur(0px)",
          y: "-2%",
          autoAlpha: 1,
          delay: 2,
          scale: 1,
        });
      }
      if (i !== 2) {
        gsap.to(section, {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: () => "top bottom",
            end: () => "bottom-=30% bottom",
            scrub: true,
            toggleActions: "play none reverse none",
            invalidateOnRefresh: true,
            /* markers: true, */
          },
        });
      }
    });
  });

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} page={props.data.page} />

      <Container component={"main"} px={"5rem"} p={0} className="container">
        <Container
          component={"section"}
          pt={"4rem"}
          pb={"0"}
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
            <Container p={0} maw={"100%"}>
              <FeatureCarousel items={publications.nodes} />
            </Container>
          </Stack>
        </Container>
        <Container
          component={"section"}
          pt={"0"}
          px={"4rem"}
          w="100%"
          maw={"1440px!important"}
        >
          <Stack gap={0}>
            <Divider color={"#0A404A"} />
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
      }
    }
  }
`;
