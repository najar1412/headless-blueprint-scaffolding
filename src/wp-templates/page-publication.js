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

export default function PagePublication(props) {
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content } = props.data.page;
  const { publications } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={menuItems} />

      <Container component={"main"} className="container">
        <Title>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: content }} />
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

      <Footer />
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
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    ...HeaderFragment
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
