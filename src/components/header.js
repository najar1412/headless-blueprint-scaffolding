import { gql } from "@apollo/client";
import Link from "next/link";
import { Text } from "@mantine/core";

import style from "./header.module.css";

export default function Header({ menuItems }) {
  return (
    <header className={style.header}>
      <div className="container">
        <Link href="/">home</Link>

        <nav className={style.nav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.uri}>
                  <Text>{item.label}</Text>
                </Link>
              </li>
            ))}
            <li key={"publications"}>
              <Link href={"/publications"}>
                <Text>publications</Text>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
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
