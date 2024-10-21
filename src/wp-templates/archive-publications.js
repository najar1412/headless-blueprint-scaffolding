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

export default function ArchivePublications(props) {
  const menuItems = props.data.primaryMenuItems.nodes;
  const { label, contentNodes } = props.data.nodeByUri;
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header menuItems={menuItems} />

      <Container>
        <Stack>
          <Title tt="capitalize">{label} Library</Title>
          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
          </Text>

          <Stack>
            {contentNodes.nodes.map((node) => (
              <>
                <SimpleGrid key={node.title} cols={2}>
                  <Text fw="bold">{node.title}</Text>
                  <div dangerouslySetInnerHTML={{ __html: node.content }} />
                </SimpleGrid>
                <Divider />
              </>
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

ArchivePublications.variables = ({ uri }) => {
  return { uri };
};

/* ArchivePublications.fragments = {
  entry: gql`
    fragment PublicationsFragment on Items {
      items {
        name
        description
      }
    }
  `,
}; */

ArchivePublications.query = gql`
  ${Header.fragments.entry}
  query PublicationsArchive($uri: String!) {
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
    ...HeaderFragment
  }
`;
