import { gql } from "@apollo/client";

import {
  Title,
  Container,
  Grid,
  Image,
  Flex,
  Text,
  UnstyledButton,
  Stack,
  Group,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Header from "../components/header";
import Footer from "../components/footer";

import linkedInIcon from "../assets/linkedin-icon-2 3.svg";
import facebookIcon from "../assets/facebook.svg";
import xIcon from "../assets/X_logo_2023_original 1.svg";
import eastArrow from "../assets/east_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 (1).svg";
import westArrow from "../assets/west_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

export default function PagePublication(props) {
  const { footer, primaryMenuItems, nodeByUri } = props.data;

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
      <Header menuItems={primaryMenuItems.nodes} />

      <Container
        component={"main"}
        className={"main"}
        maw={"unset"}
        w="100%"
        p={"5rem"}
        pt={"12rem"}
      >
        <Container maw={"1440px!important"} w="100%">
          <Grid gutter="2rem">
            <Grid.Col visibleFrom="lg" span={{ base: 12, lg: 5 }}>
              <Stack gap={"xs"}>
                {nodeByUri.featuredImage ? (
                  <Image
                    width={"100%"}
                    mah={"15rem"}
                    src={nodeByUri.featuredImage.node.sourceUrl}
                    style={{ borderRadius: "1rem" }}
                  />
                ) : null}
                <Group px={"1rem"} gap={"1.5rem"}>
                  <Text fw={600}>Share this post</Text>
                  <Image
                    src={linkedInIcon.src}
                    alt="linkedIn Icon"
                    style={{ transform: "scale(1.5)" }}
                  />
                  <Image
                    src={xIcon.src}
                    alt="x Icon"
                    style={{ transform: "scale(1.5)" }}
                  />
                  <Image
                    src={facebookIcon.src}
                    alt="facebook Icon"
                    style={{ transform: "scale(1.5)" }}
                  />
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Stack>
                <Text tt="uppercase" fw={"600"}>
                  pub date
                </Text>
                <Title order={1} lh={"2.5rem"}>
                  {nodeByUri.title}
                </Title>
                <Text tt="capitalize" fw={"600"}>
                  by pub author
                </Text>
                <Group hiddenFrom="lg" gap={"1.5rem"}>
                  <Text fw={600}>Share this post</Text>
                  <Image
                    src={linkedInIcon.src}
                    alt="linkedIn Icon"
                    style={{ transform: "scale(1.5)" }}
                  />
                  <Image
                    src={xIcon.src}
                    alt="x Icon"
                    style={{ transform: "scale(1.5)" }}
                  />
                  <Image
                    src={facebookIcon.src}
                    alt="facebook Icon"
                    style={{ transform: "scale(1.5)" }}
                  />
                </Group>
                <div dangerouslySetInnerHTML={{ __html: nodeByUri.content }} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
        <Container maw={"1440px!important"} w="100%" p={0} py={"5rem"}>
          <Flex justify={"space-between"}>
            <UnstyledButton>
              <Group>
                <Image
                  src={westArrow.src}
                  alt="east arrow"
                  style={{ transform: "scale(1.5)" }}
                />
                <Text fw="500">Previous Post</Text>
              </Group>
            </UnstyledButton>
            <UnstyledButton>
              <Group>
                <Text fw="500">Next Post</Text>
                <Image
                  src={eastArrow.src}
                  alt="east arrow"
                  style={{ transform: "scale(1.5)" }}
                />
              </Group>
            </UnstyledButton>
          </Flex>
        </Container>
      </Container>

      <Footer node={footer} />
    </>
  );
}

PagePublication.variables = ({ databaseId, uri }, ctx) => {
  return {
    databaseId,
    uri,
    asPreview: ctx?.asPreview,
  };
};

PagePublication.query = gql`
  ${Header.fragments.entry}


    query GetPublication($uri: String!) {
      nodeByUri(uri: $uri) {
    ... on NodeWithTitle {
      title
    }
    ... on WithAcfPublicationMeta {
      publicationMeta {
        date
        author
      }
    }
    ... on NodeWithFeaturedImage {
      featuredImage {
        node {
          id
          sourceUrl
        }
      }
    }
    ... on NodeWithContentEditor {
      content
    }
  }
      ...HeaderFragment
      ...${Footer.fragments.entry}
    }
   

`;
