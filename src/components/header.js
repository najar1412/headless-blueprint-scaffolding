import { Fragment, useRef } from "react";

import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Text, Container, Group, Burger, Badge, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { MobileMenu } from "./MobileMenu";

import logo from "../assets/logo.svg?href";
import linkedinIcon from "../assets/linkedin.svg?href";

import styles from "./header.module.css";

export default function Header({ menuItems, page, frontPage }) {
  const [opened, { toggle, close }] = useDisclosure();
  const router = useRouter();
  const showBurger = useMediaQuery(`(max-width: 62em)`);
  const container = useRef();

  const menuItem = (item) => {
    switch (item.label) {
      case "Contact":
        return (
          <Badge
            id={`item-${item.label.toLowerCase().replace(/\s/g, "-")}`}
            onClick={() => {
              return frontPage
                ? gsap.to(window, {
                    ease: "power1.in",
                    scrollTo: `#${item.label
                      .toLowerCase()
                      .replace(/\s/g, "-")}`,
                    duration: 0.2,
                  })
                : router.push(
                    `/#${item.label.toLowerCase().replace(/\s/g, "-")}`
                  );
            }}
            mt="0.2rem"
            pt="0.5rem"
            pb="0.6rem"
            px="md"
            color="brand.2"
            style={{ cursor: "pointer" }}
          >
            <Text
              c="brand.0"
              fw="600"
              tt={"capitalize"}
              style={{ fontSize: "0.75rem" }}
            >
              Contact
            </Text>
          </Badge>
        );
      default:
        return (
          <Stack
            id={`item-${item.label.toLowerCase().replace(/\s/g, "-")}`}
            onClick={() => {
              return frontPage
                ? gsap.to(window, {
                    ease: "power1.in",
                    scrollTo: {
                      y: `#${item.label.toLowerCase().replace(/\s/g, "-")}`,
                      offsetY: item.label === "Thought Leadership" ? -100 : 0,
                    },
                    duration: 0.2,
                  })
                : router.push(
                    `/#${item.label.toLowerCase().replace(/\s/g, "-")}`
                  );
            }}
            gap={0}
            className={`${styles.link}`}
            style={{
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              className={`${styles["bar-link"]} ${
                page.title === item.label ? styles["bar-link-show"] : ""
              }`}
            />
            <Text style={{ fontSize: "0.75rem" }}>{item.label}</Text>
          </Stack>
        );
    }
  };

  useGSAP(
    () => {
      const toggleHeader = gsap
        .from(container.current, {
          yPercent: -100,
          paused: true,
          duration: 0.3,
          scrollTrigger: {
            start: "top top",
            end: "max",
            onUpdate: (self) => {
              self.direction === -1
                ? toggleHeader.play()
                : toggleHeader.reverse();
            },
          },
        })
        .progress(1);

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
    <>
      <Container
        ref={container}
        component={"header"}
        maw={"unset"}
        w="100%"
        h="4rem"
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
            onClick={() => {
              close();
              return frontPage
                ? gsap.to(window, {
                    ease: "power1.in",
                    scrollTo: `#landing`,
                    duration: 0.2,
                  })
                : router.push(`/`);
            }}
            alt="nexus logo"
            width={"280rem"}
            src={logo}
            className={styles.logo}
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
      <MobileMenu
        opened={opened}
        close={close}
        menuItems={menuItems}
        frontPage={frontPage}
      />
    </>
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
