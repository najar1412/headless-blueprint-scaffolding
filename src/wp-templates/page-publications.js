import { gql } from "@apollo/client";
import Link from "next/link";
import { Title, Container, Divider, Stack, Text } from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";
import { Cta1 } from "../components/Cta1";

export default function PagePublications(props) {
  const { publications, footer, page, primaryMenuItems } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"} className="container">
        <Stack my="5rem">
          <Title>Thought Leadership</Title>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
          <Cta1
            image={page.acf.cta1.image}
            title={page.acf.cta1.title}
            tag={page.acf.cta1.tag}
            copy={page.acf.cta1.copy}
          />
        </Stack>
        <Stack>
          {publications.nodes.map((node) => (
            <Stack key={node.title} gap={0}>
              <Link href={node.uri}>
                <Text fw="bold">{node.title}</Text>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.content }} />
              <Divider />
            </Stack>
          ))}
        </Stack>
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
        ... on NodeWithContentEditor {
          content
        }
      }
    }
  }
`;
