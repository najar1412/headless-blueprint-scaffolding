import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import {
  Text,
  Container,
  Group,
  Burger,
  Badge,
  Stack,
  Divider,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import style from "./header.module.css";
import logo from "../assets/logo.svg?href";
import linkedinIcon from "../assets/linkedin.svg?href";

export default function Header({ menuItems }) {
  const [opened, { toggle }] = useDisclosure();
  const showBurger = useMediaQuery(`(max-width: 62em)`);

  const menuItem = (item) => {
    switch (item.label) {
      case "Contact":
        return (
          <Link href={`#${item.label.toLowerCase().replace(/\s/g, "-")}`}>
            <Badge
              pt="xs"
              pb="sm"
              px="md"
              color="brand.2"
              style={{ cursor: "pointer" }}
            >
              <Text size="sm" c="brand.0" fw="600" tt={"capitalize"}>
                Contact
              </Text>
            </Badge>
          </Link>
        );
      default:
        return (
          <Link href={`#${item.label.toLowerCase().replace(/\s/g, "-")}`}>
            <Stack gap={0}>
              <Divider size={"sm"} color="brand.2" />
              <Text size="sm">{item.label}</Text>
            </Stack>
          </Link>
        );
    }
  };

  return (
    <Container
      component={"header"}
      maw={"unset"}
      w="100%"
      h="5rem"
      px={"5rem"}
      bg={"white"}
      className={style.header}
    >
      <Group w={"100%"} h="100%" justify="space-between" my="auto">
        <Link href="/">
          <Image
            width={200}
            src={logo}
            style={{ transform: "translateY(0.25rem)" }}
          />
        </Link>
        {showBurger ? (
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
        ) : (
          <Group>
            {menuItems.map((item) => menuItem(item))}
            <Link href="https://www.linkedin.com" target="_blank">
              <Image
                src={linkedinIcon}
                style={{ cursor: "pointer", transform: "translateY(.25rem)" }}
              />
            </Link>
          </Group>
        )}
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
