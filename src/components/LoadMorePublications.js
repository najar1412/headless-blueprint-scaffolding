import { Fragment } from "react";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { Group, Stack, Text, Divider, Button } from "@mantine/core";

import { Loading } from "./animated/Loading";

import styles from "./LoadMorePublications.module.css";

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

  const posts = data.publications.edges.map((edge) => edge.node);

  const haveMorePosts = Boolean(data?.publications?.pageInfo?.hasNextPage);

  return (
    <>
      <Stack>
        {posts.map((post) => {
          const { databaseId, title, slug, featuredImage, content } = post;
          return (
            <Fragment key={databaseId}>
              <Group wrap="no-wrap" gap={"2rem"} mb={"1rem"}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${featuredImage.node.sourceUrl})`,
                  }}
                ></div>

                <Stack key={title} gap="0.3rem">
                  <Link href={`/thought-leadership/${slug}`}>
                    <Text fw="bold">{title}</Text>
                  </Link>
                  <div
                    style={{ fontSize: "0.8rem" }}
                    dangerouslySetInnerHTML={{
                      __html: `${content
                        .replace(/<\/?[^>]+(>|$)/g, "")
                        .substring(0, 200)}...`,
                    }}
                  />
                </Stack>
              </Group>

              <Divider color={"#0A404A"} mb="1rem" />
            </Fragment>
          );
        })}
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
