import { gql } from "@apollo/client";
import { Title, Container } from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";

export default function PageRequestMedicalInformation(props) {
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content } = props.data.page;
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

PageRequestMedicalInformation.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

PageRequestMedicalInformation.query = gql`
  ${Header.fragments.entry}
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    ...HeaderFragment
  }
`;