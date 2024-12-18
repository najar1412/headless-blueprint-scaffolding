import { Fragment, useRef } from "react";

import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Text, Container, Group, Burger, Badge, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import logo from "../assets/logo.svg?href";
import linkedinIcon from "../assets/linkedin.svg?href";

import styles from "./header.module.css";

export default function Header({ menuItems, page, frontPage }) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const showBurger = useMediaQuery(`(max-width: 62em)`);
  const container = useRef();

  console.log(page.title);

  const menuItem = (item) => {
    console.log(item);
    switch (item.label) {
      case "Contact":
        return (
          <Badge
            onClick={() =>
              frontPage
                ? gsap.to(window, {
                    ease: "power1.in",
                    scrollTo: `#${item.label
                      .toLowerCase()
                      .replace(/\s/g, "-")}`,
                    duration: 0.2,
                  })
                : router.push(
                    `/#${item.label.toLowerCase().replace(/\s/g, "-")}`
                  )
            }
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
        );
      default:
        return (
          <Stack
            onClick={() =>
              frontPage
                ? gsap.to(window, {
                    ease: "power1.in",
                    scrollTo: `#${item.label
                      .toLowerCase()
                      .replace(/\s/g, "-")}`,
                    duration: 0.2,
                  })
                : router.push(
                    `/#${item.label.toLowerCase().replace(/\s/g, "-")}`
                  )
            }
            gap={0}
            className={`${styles.link}`}
            style={{
              overflow: "hidden",
              cursor: "pointer",
              /* color: page.title === item.label ? "red" : "blue", */
            }}
          >
            <div
              className={`${styles["bar-link"]} ${
                page.title === item.label ? styles["bar-link-show"] : ""
              }`}
            />
            <Text size="sm">{item.label}</Text>
          </Stack>
        );
    }
  };

  useGSAP(
    () => {
      gsap.from(container.current, {
        backgroundColor: "rgba(255, 255, 255, 1)",
        duration: 0.3,
        ease: "power1.inOut",
        scrollTrigger: {
          start: () => `top bottom`,
          end: () => `bottom-=100px top`,
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
      <Group
        w={"100%"}
        maw={"1440px!important"}
        h="100%"
        justify="space-between"
        m="auto"
      >
        <Image
          onClick={() =>
            frontPage
              ? gsap.to(window, {
                  ease: "power1.in",
                  scrollTo: `#landing`,
                  duration: 0.2,
                })
              : router.push(`/`)
          }
          alt="nexus logo"
          width={200}
          src={logo}
          style={{ cursor: "pointer" }}
        />
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
