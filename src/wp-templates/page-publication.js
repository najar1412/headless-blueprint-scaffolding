import { gql } from "@apollo/client";
import { Title, Container } from "@mantine/core";
import { useQuery } from "@apollo/client";
// import { client } from 'client';

import Header from "../components/header";
import Footer from "../components/footer";
import ArchivePublications from "./archive-publications";

export default function PagePublication(props) {
  // const { data } = useQuery(Page.query);
  // console.log(props);
  const menuItems = props.data.primaryMenuItems.nodes;

  const { title, content } = props.data.page;
  console.log(content);
  const {data} = useQuery(gql`
    query GetArchives($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on ContentType {
          label
          description

          contentNodes {
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
      }
    }
  `);
  console.log(data);
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
  }
`;