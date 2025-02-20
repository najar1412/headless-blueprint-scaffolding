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
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import Header from "../components/header";
import Footer from "../components/footer";
import { Loading } from "../components/animated/Loading";

import frontPageStyles from "./front-page.module.css";
import styles from "./page-publication.module.css";

import linkedInIcon from "../assets/linkedin-icon-2 3.svg";
import facebookIcon from "../assets/facebook.svg";
import xIcon from "../assets/X_logo_2023_original 1.svg";
import arrowUpIcon from "../assets/arrow-up.svg";
import arrowBlBlueIcon from "../assets/arrow-bl-blue.svg";

export default function PagePublication(props) {
  const { footer, primaryMenuItems, publication: post, page } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <Loading />;
  }

  useGSAP(() => {
    // TODO: imp timelines for sectional animation
    //https://gsap.com/community/forums/topic/36504-gsap-scrolltrigger-loop-through-array/
    // sectional animation
  });

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const result = `${dateObj.getDay()}.${dateObj.getMonth()}.${dateObj.getFullYear()}`;
    return result;
  };

  return (
    <>
      <Header
        menuItems={primaryMenuItems.nodes}
        page={{ title: "Thought Leadership" }}
      />

      <Container
        /* component={"main"} */
        className={`${styles.container}`}
        maw={"unset"}
        w="100%"
        pt={"8rem"}
        pb={0}
      >
        <Container maw={"1440px!important"} w="100%" p={0} mx={"auto"}>
          <Link href={"/thought-leadership"} style={{ width: "fit-content" }}>
            <Stack
              gap={"0.25rem"}
              className={`${frontPageStyles.link} gsap-fade`}
              mt="0.4rem"
              mb="1rem"
              w="fit-content"
              style={{ overflow: "hidden" }}
            >
              <Group>
                <Image
                  src={arrowBlBlueIcon.src}
                  style={{
                    transform:
                      "translateX(0.25rem) translateY(-0.1rem) rotate(225deg)",
                  }}
                />
                <Text fw="700" size="0.84rem" mb="0.25rem">
                  Back to All Posts
                </Text>
              </Group>

              <div className={`${frontPageStyles["bar-link"]}`} />
            </Stack>
          </Link>

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
                <Group px={"1rem"} gap={"1.25rem"}>
                  <Text size="xs" fw={600}>
                    Share this post
                  </Text>
                  <Image
                    src={linkedInIcon.src}
                    alt="linkedIn Icon"
                    style={{ transform: "scale(1.3)" }}
                  />
                  <Image
                    src={xIcon.src}
                    alt="x Icon"
                    style={{ transform: "scale(1.3)" }}
                  />
                  <Image
                    src={facebookIcon.src}
                    alt="facebook Icon"
                    style={{ transform: "scale(1.3)" }}
                  />
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Stack>
                <Text tt="uppercase" fw={"600"} size="sm">
                  {formatDate(post.publicationMeta.date)}
                </Text>
                <Title order={1} lh={"2.5rem"}>
                  {post.title}
                </Title>
                <Text size="sm" tt="capitalize" fw={"600"}>
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content.replaceAll("<p>", '<p class="what">'),
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Container maw={"1440px!important"} w="100%" p={0} py={"5rem"}>
          <Flex justify={"space-between"}>
            <Link href={"#"} style={{ width: "fit-content" }}>
              <Stack
                gap={"0.25rem"}
                className={`${frontPageStyles.link} gsap-fade`}
                mt="0.4rem"
                mb="1rem"
                w="fit-content"
                style={{ overflow: "hidden" }}
              >
                <Group>
                  <Image
                    src={arrowBlBlueIcon.src}
                    style={{
                      transform:
                        "translateX(0.25rem) translateY(-0.1rem) rotate(225deg)",
                    }}
                  />
                  <Text fw="700" size="0.84rem" mb="0.25rem">
                    Previous Post
                  </Text>
                </Group>

                <div className={`${frontPageStyles["bar-link"]}`} />
              </Stack>
            </Link>

            <Link href={"/thought-leadership"} style={{ width: "fit-content" }}>
              <Stack
                gap={"0.25rem"}
                className={`${frontPageStyles.link} gsap-fade`}
                mt="0.4rem"
                mb="1rem"
                w="fit-content"
                style={{ overflow: "hidden" }}
              >
                <Text fw="700" size="0.84rem" mb="0.25rem">
                  Back to All Posts
                </Text>

                <div className={`${frontPageStyles["bar-link"]}`} />
              </Stack>
            </Link>

            <Link href={"#"} style={{ width: "fit-content" }}>
              <Stack
                gap={"0.25rem"}
                className={`${frontPageStyles.link} gsap-fade`}
                mt="0.4rem"
                mb="1rem"
                w="fit-content"
                style={{ overflow: "hidden" }}
              >
                <Group>
                  <Text fw="700" size="0.84rem" mb="0.25rem">
                    Next Post
                  </Text>
                  <Image
                    src={arrowBlBlueIcon.src}
                    style={{
                      transform:
                        "translateX(-0.25rem) translateY(-0.1rem) rotate(44deg)",
                    }}
                  />
                </Group>

                <div className={`${frontPageStyles["bar-link"]}`} />
              </Stack>
            </Link>

            {/* <UnstyledButton>
              <Group>
                <Text fw="500">Next Post</Text>
                <Image
                  src={arrowUpIcon.src}
                  alt="east arrow"
                  style={{ transform: "rotate(90deg) scale(0.8)" }}
                />
              </Group>
            </UnstyledButton> */}
          </Flex>
          <UnstyledButton
            hiddenFrom="sm"
            mt="2rem"
            mx="auto"
            w="fit-content"
            style={{ display: "flex" }}
          >
            <Link href="/thought-leadership">
              <Text fw="500" ta={"center"}>
                Back to All Posts
              </Text>
            </Link>
          </UnstyledButton>
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
        postType
      }
    }
    ...HeaderFragment
    ...${Footer.fragments.entry}
  }
`;
