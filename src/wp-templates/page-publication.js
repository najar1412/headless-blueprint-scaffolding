import { gql } from "@apollo/client";
import {
  Title,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";
import { Cta1 } from "../components/Cta1";

export default function PagePublication(props) {
  const { publications, footer, page, primaryMenuItems } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} />

      <Cta1
        image={page.acf.cta1.image}
        title={page.acf.cta1.title}
        tag={page.acf.cta1.tag}
        copy={page.acf.cta1.copy}
      />

      <Container component={"main"} className="container">
        <Title>{page.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
        <Stack>
          {publications.nodes.map((node) => (
            <>
              <SimpleGrid key={node.title} cols={2}>
                <Text fw="bold">{node.title}</Text>
                <div dangerouslySetInnerHTML={{ __html: node.content }} />
              </SimpleGrid>
              <Divider />
            </>
          ))}
        </Stack>
      </Container>

      <Footer node={footer} />
    </>
  );
}

PagePublication.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    uri: "/publications",
  };
};

PagePublication.query = gql`
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
