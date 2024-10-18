import { gql } from "@apollo/client";

export default function ArchivePublications(props) {
  const { label, contentNodes } = props.data.nodeByUri;

  console.log(contentNodes);

  return (
    <>
      <h1>{label} Library</h1>

      {contentNodes.nodes.map((node) => (
        <div key={node.title}>
          <p>{node.title}</p>
          <div dangerouslySetInnerHTML={{ __html: node.content }} />
        </div>
      ))}
    </>
  );
}

ArchivePublications.variables = ({ uri }) => {
  return { uri };
};

ArchivePublications.query = gql`
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
  }
`;
