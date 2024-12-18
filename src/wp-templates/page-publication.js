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
import arrowUpIcon from "../assets/arrow-up.svg";

export default function PagePublication(props) {
  const { footer, primaryMenuItems, publication: post, page } = props.data;

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
      <Header
        menuItems={primaryMenuItems.nodes}
        page={{ title: "Thought Leadership" }}
      />

      <Container
        component={"main"}
        className={"main"}
        maw={"unset"}
        w="100%"
        px={"5rem"}
        pt={"12rem"}
        pb={0}
      >
        <Container maw={"1440px!important"} w="100%">
          <Grid gutter="2rem">
            <Grid.Col visibleFrom="lg" span={{ base: 12, lg: 5 }}>
              <Stack gap={"xs"}>
                {post.featuredImage ? (
                  <Image
                    width={"100%"}
                    mah={"15rem"}
                    src={post.featuredImage.node.sourceUrl}
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
                  {post.publicationMeta.date}
                </Text>
                <Title order={1} lh={"2.5rem"}>
                  {post.title}
                </Title>
                <Text tt="capitalize" fw={"600"}>
                  by {post.publicationMeta.author}
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
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
        <Container maw={"1440px!important"} w="100%" p={0} py={"5rem"}>
          <Flex justify={"space-between"}>
            <UnstyledButton>
              <Group>
                <Image
                  src={arrowUpIcon.src}
                  alt="east arrow"
                  style={{ transform: "rotate(-90deg) scale(0.8)" }}
                />
                <Text fw="500">Previous Post</Text>
              </Group>
            </UnstyledButton>
            <UnstyledButton>
              <Group>
                <Text fw="500">Next Post</Text>
                <Image
                  src={arrowUpIcon.src}
                  alt="east arrow"
                  style={{ transform: "rotate(90deg) scale(0.8)" }}
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

  query getPost($databaseId: ID!) {
    publication(id: $databaseId, idType: DATABASE_ID) {
      databaseId
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      publicationMeta: publicationMeta {
        date
        author
      }
    }
    ...HeaderFragment
    ...${Footer.fragments.entry}
  }
`;
