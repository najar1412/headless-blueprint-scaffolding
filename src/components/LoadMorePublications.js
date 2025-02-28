import { Fragment } from "react";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { Group, Stack, Text, Divider, Button } from "@mantine/core";

import { Loading } from "./animated/Loading";

import styles from "./LoadMorePublications.module.css";

import placeholderImage from "../assets/card_gray.jpg";
import whiteArrowIcon from "../assets/white_arrow.svg";

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    publications(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
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
            postType
          }
        }
      }
    }
  }
`;

const BATCH_SIZE = 10;

export default function LoadMorePublications() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: BATCH_SIZE, after: null },
  });

  if (error) {
    return <p>Sorry, an error happened. Reload Please</p>;
  }

  if (!data && loading) {
    return <Loading />;
  }

  if (!data?.publications.edges.length) {
    return <p>no posts have been published</p>;
  }

  const posts = data.publications.edges
    .filter(
      (edge) => !edge.node.publicationMeta.postType.includes("announcement")
    )
    .map((edge) => edge.node);

  const haveMorePosts = Boolean(data?.publications?.pageInfo?.hasNextPage);

  return (
    <>
      <Stack>
        {posts.map((post) => (
          <Fragment key={post.databaseId}>
            <Link href={`/thought-leadership/${post.slug}`}>
              <Group
                wrap="no-wrap"
                gap={"2rem"}
                mb={"1rem"}
                className={styles["card"]}
              >
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${post.featuredImage ? post.featuredImage.node.sourceUrl : placeholderImage.src})`,
                    maxWidth: "7.5rem",
                  }}
                >
                  <div className={styles["thumb"]}>
                    <img
                      style={{
                        width: "3rem",
                        height: "3rem",
                      }}
                      src={whiteArrowIcon.src}
                    />
                  </div>
                </div>

                <Stack key={post.title} gap="0.3rem">
                  <Text fw="bold" className={styles["title"]}>
                    {post.title}
                  </Text>
                  {post.content ? (
                    <div
                      style={{ fontSize: "0.8rem" }}
                      dangerouslySetInnerHTML={{
                        __html: `${post.content
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .substring(0, 200)}...`,
                      }}
                    />
                  ) : null}
                </Stack>
              </Group>
            </Link>

            <Divider color={"#0A404A"} mb="1rem" />
          </Fragment>
        ))}
      </Stack>
      {haveMorePosts ? (
        <form
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            fetchMore({
              variables: {
                after: data.publications.pageInfo.endCursor,
              },
              updateQuery(
                previousData,
                { fetchMoreResult, variables: { first } }
              ) {
                // Slicing is necessary because the existing data is
                // immutable, and frozen in development.
                const updatedFeed = previousData.publications.edges.slice(0);
                for (
                  let i = 0;
                  i < fetchMoreResult.publications.edges.length;
                  ++i
                ) {
                  updatedFeed[first + i] =
                    fetchMoreResult.publications.edges[i];
                }
                return {
                  publications: {
                    edges: updatedFeed,
                    pageInfo: fetchMoreResult.publications.pageInfo,
                    __typename: "RootQueryToPublicationConnection",
                    id: 999,
                  },
                };
              },
            });
          }}
        >
          {loading ? null : (
            <Button
              disabled={loading}
              radius={"2rem"}
              color="#bcdc49"
              type="submit"
              c="#0a404a"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 50,
              }}
            >
              Load more posts
            </Button>
          )}
        </form>
      ) : (
        <Text size="xs" c="#0A404A" ta="center" opacity={0.5}>
          Showing all posts
        </Text>
      )}
    </>
  );
}
