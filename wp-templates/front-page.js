import { gql } from "@apollo/client";
import Head from "next/head";
import { Container, Title } from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";

export default function Component(props) {
  const { title: siteTitle } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;

  console.log(props.data);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header menuItems={menuItems} />

      <Container component={"main"}>
        <Title tt="capitalize">home</Title>
      </Container>

      <Footer />
    </>
  );
}

Component.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
  }
`;
