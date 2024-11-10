import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import {
  Title,
  Container,
  Divider,
  Stack,
  Text,
  Avatar,
  Group,
} from "@mantine/core";

import Header from "../components/header";
import Footer from "../components/footer";
import { FeatureCarousel } from "../components/carousels/FeatureCarousel";
import { Eyebrow } from "../components/Eyebrow";
import { Cta1 } from "../components/Cta1";

import placeholderThumbImage from "../assets/placeholder_thumb.jpg";

export default function PagePublications(props) {
  const { publications, footer, page, primaryMenuItems } = props.data;

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={primaryMenuItems.nodes} />

      <Container component={"main"} p={0} className="container">
        <Container
          component={"section"}
          pt={"4rem"}
          pb={"0"}
          pr={0}
          pl={"5rem"}
          w="100%"
          maw={"unset"}
        >
          <Stack my="5rem">
            <Title>Thought Leadership</Title>
            <Group justify="space-between">
              <Eyebrow label={"featured"} variant={3} />
              <Group pr="5rem">
                <Avatar />
                <Avatar />
              </Group>
            </Group>
            <Container p={0} maw={"100%"}>
              <FeatureCarousel />
            </Container>

            {/* <Cta1
            image={page.acf.cta1.image}
            title={page.acf.cta1.title}
            tag={page.acf.cta1.tag}
            copy={page.acf.cta1.copy}
          /> */}
          </Stack>
        </Container>
        <Container
          component={"section"}
          pt={"0"}
          px={"8rem"}
          w="100%"
          maw={"unset"}
        >
          <Stack>
            <Divider />
            {publications.nodes.map((node) => (
              <>
                <Group wrap="no-wrap">
                  <Image
                    src={placeholderThumbImage}
                    width={200}
                    style={{ borderRadius: "1rem" }}
                  />
                  <Stack key={node.title} gap={0}>
                    <Link href={node.uri}>
                      <Text fw="bold">{node.title}</Text>
                    </Link>
                    <div dangerouslySetInnerHTML={{ __html: node.content }} />
                  </Stack>
                </Group>

                <Divider />
              </>
            ))}
            <Text ta="right">Pagination</Text>
          </Stack>
        </Container>
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
