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
  const { footer, page, primaryMenuItems } = props.data;
  console.log(props.data);

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"} className="container" py={"5rem"}>
        <Title>single post</Title>
      </Container>

      <Footer node={footer} />
    </>
  );
}

PagePublication.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

PagePublication.query = gql`
  ${Header.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
    }
    ...HeaderFragment
  }
`;
