import { gql } from "@apollo/client";
import { Title, Container } from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";

export default function PageHcpResources(props) {
  const { footer, page, primaryMenuItems } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"} className="container">
        <Title>{page.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </Container>

      <Footer node={footer} />
    </>
  );
}

PageHcpResources.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

PageHcpResources.query = gql`
  ${Header.fragments.entry}
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    ...HeaderFragment
    ...${Footer.fragments.entry}
  }
`;
