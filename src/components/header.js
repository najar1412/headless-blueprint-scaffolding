import { gql } from "@apollo/client";
import Link from "next/link";
import { Text, Container, Group } from "@mantine/core";

import style from "./header.module.css";

export default function Header({ menuItems }) {
  return (
    <Container
      component={"header"}
      maw={"unset"}
      w="100%"
      className={style.header}
    >
      <Group w={"100%"} justify="between">
        <Link href="/">home</Link>

        <Group>
          {menuItems.map((item) => (
            <Link href={`#${item.label.toLowerCase().replace(/\s/g, "-")}`}>
              <Text>{item.label}</Text>
            </Link>
          ))}
        </Group>
      </Group>
    </Container>
  );
}

Header.fragments = {
  entry: gql`
    fragment HeaderFragment on RootQuery {
      generalSettings {
        title
        description
      }
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          uri
          path
          label
          parentId
          cssClasses
          menu {
            node {
              name
            }
          }
        }
      }
    }
  `,
};
