import { gql } from "@apollo/client";
import Head from "next/head";
import { Container, Title } from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";

export default function Component(props) {
  const { title: siteTitle } = props.data.generalSettings;
  const { footer, primaryMenuItems } = props.data;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"}>
        <Title tt="capitalize">home</Title>
      </Container>

      <Footer node={footer} />
    </>
  );
}

Component.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
    ...${Footer.fragments.entry}
  }
`;
