import { gql } from "@apollo/client";
import Link from "next/link";
/* import Image from "next/image"; */
import {
  Title,
  Container,
  Divider,
  Stack,
  Text,
  Avatar,
  Group,
  Image,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Header from "../components/header";
import Footer from "../components/footer";
import { FeatureCarousel } from "../components/carousels/FeatureCarousel";
import { Eyebrow } from "../components/Eyebrow";
import { Cta1 } from "../components/Cta1";

import placeholderThumbImage from "../assets/placeholder_thumb.jpg";

export default function PagePublications(props) {
  const { publications, footer, page, primaryMenuItems } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
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

      <Container component={"main"} p={0} className="container">
        <Container
          component={"section"}
          pt={"4rem"}
          pb={"0"}
          pr={0}
          pl={"5rem"}
          w="100%"
          maw={"1512px"}
        >
          <Stack my="5rem">
            <Title size="3rem" mb="1rem">
              Thought Leadership
            </Title>
            <Group justify="space-between">
              <Eyebrow label={"featured"} variant={3} />
              <Group pr="5rem">
                <Avatar />
                <Avatar />
              </Group>
            </Group>
            <Container p={0} maw={"100%"}>
              <FeatureCarousel items={publications.nodes} />
            </Container>

            {/* <Cta1
            image={page.acf.cta1.image}
            title={page.acf.cta1.title}
            tag={page.acf.cta1.tag}
            copy={page.acf.cta1.copy}
          /> */}
          </Stack>
        </Container>
        <Container
          component={"section"}
          pt={"0"}
          px={"8rem"}
          w="100%"
          maw={"1512px"}
        >
          <Stack gap={"lg"}>
            <Divider color={"#0A404A"} />
            {publications.nodes.map((node) => (
              <>
                <Group wrap="no-wrap" gap={"2rem"}>
                  <Image
                  visibleFrom="md"
                    alt="publication thumbnail"
                    src={node.featuredImage.node.sourceUrl}
                    w={"100%"}
                    maw={"10rem"}
                    style={{ borderRadius: "1rem" }}
                  />
                  <Stack key={node.title} gap="0.3rem">
                    <Link href={node.uri}>
                      <Text fw="bold">{node.title}</Text>
                    </Link>
                    <div
                      style={{ fontSize: "0.8rem" }}
                      dangerouslySetInnerHTML={{
                        __html: `${node.content
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .substring(0, 200)}...`,
                      }}
                    />
                  </Stack>
                </Group>

                <Divider color={"#0A404A"} />
              </>
            ))}
            <Text size="xs" ta="right">
              Pagination
            </Text>
          </Stack>
        </Container>
      </Container>

      <Footer node={footer} />
    </>
  );
}

PagePublications.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    uri: "/publications",
  };
};

PagePublications.query = gql`
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
