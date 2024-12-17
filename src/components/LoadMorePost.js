import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

import { Group, Image, Stack, Text, Divider, Button } from "@mantine/core";
import { Fragment } from "react";

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

const BATCH_SIZE = 5;

export default function LoadMorePost() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: BATCH_SIZE, after: null },
  });

  if (error) {
    return <p>Sorry, an error happened. Reload Please</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.publications.edges.length) {
    return <p>no posts have been published</p>;
  }

  const posts = data.publications.edges.map((edge) => edge.node);

  const haveMorePosts = Boolean(data?.publications?.pageInfo?.hasNextPage);

  return (
    <>
      <ul style={{ padding: "0" }}>
        {posts.map((post) => {
          const { databaseId, title, slug, featuredImage, content } = post;
          return (
            <Fragment key={databaseId}>
              <Group wrap="no-wrap" gap={"2rem"} mb={"1rem"}>
                <div
                  style={{
                    width: "18rem",
                    height: "6rem",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    backgroundImage: `url(${featuredImage.node.sourceUrl})`,
                    backgroundSize: "cover",
                  }}
                ></div>

                <Stack key={title} gap="0.3rem">
                  <Link href={`/publications/${slug}`}>
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
      </ul>
      {haveMorePosts ? (
        <form
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            fetchMore({
              variables: { after: data.publications.pageInfo.endCursor },
            });
          }}
        >
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </Button>
        </form>
      ) : null}
    </>
  );
}
