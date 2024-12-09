import { Fragment, useRef } from "react";

import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import { Text, Container, Group, Burger, Badge, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import logo from "../assets/logo.svg?href";
import linkedinIcon from "../assets/linkedin.svg?href";

import styles from "./header.module.css";

export default function Header({ menuItems, page, frontPage }) {
  const [opened, { toggle }] = useDisclosure();
  const showBurger = useMediaQuery(`(max-width: 62em)`);

  const menuItem = (item) => {
    switch (item.label) {
      case "Contact":
        return (
          <Link
            href={`${frontPage ? "" : "/"}#${item.label
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
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
          <Link
            href={`${frontPage ? "" : "/"}#${item.label
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
            <Stack
              gap={0}
              className={styles.link}
              style={{ overflow: "hidden" }}
            >
              <div className={styles["link-bar"]} />
              <Text size="sm">{item.label}</Text>
            </Stack>
          </Link>
        );
    }
  };

  const container = useRef();

  useGSAP(
    () => {
      gsap.from(container.current, {
        backgroundColor: "rgba(255, 255, 255, 1)",
        duration: 0.3,
        ease: "power1.inOut",
        scrollTrigger: {
          start: () => `top bottom`,
          end: () => `bottom top`,
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <Container
      ref={container}
      component={"header"}
      maw={"unset"}
      w="100%"
      h="5rem"
      px={"5rem"}
      className={`${styles.header} ${
        !frontPage ? styles["opaque-header"] : ""
      }`}
    >
      <Group w={"100%"} h="100%" justify="space-between" my="auto">
        <Link href="/">
          <Image
            alt="nexus logo"
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
            {menuItems.map((item) => (
              <Fragment key={item.label}>{menuItem(item)}</Fragment>
            ))}
            <Link href="https://www.linkedin.com" target="_blank">
              <Image
                alt="linkedin logo"
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
