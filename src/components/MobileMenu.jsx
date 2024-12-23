import { Fragment } from "react";

import { Drawer, Stack, Badge, Text } from "@mantine/core";
import gsap from "gsap";
import { useMediaQuery } from "@mantine/hooks";

export const MobileMenu = ({ opened, close, menuItems, frontPage }) => {
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  const menuItem = (item) => {
    switch (item.label) {
      case "Contact":
        return (
          <Badge
            onClick={() => {
              close();
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
                  );
            }}
            mt="0.2rem"
            p={'1rem'}
            color="brand.2"
            style={{ cursor: "pointer" }}
          >
            <Text
              c="brand.0"
              fw="600"
              tt={"capitalize"}
              style={{ fontSize: "1.5rem" }}
            >
              Contact
            </Text>
          </Badge>
        );
      default:
        return (
          <Text
            onClick={() => {
              close();
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
            style={{ fontSize: "1.5rem" }}
          >
            {item.label}
          </Text>
        );
    }
  };

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} size="100%">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body px={0} pt="2rem">
            <Stack mt="5rem" ml={isMobile ? "1rem" : "4rem"}>
              {menuItems.map((item) => (
                <Fragment key={item.label}>{menuItem(item)}</Fragment>
              ))}
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};