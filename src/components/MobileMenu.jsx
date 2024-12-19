import { Fragment } from "react";

import { Drawer, Stack, Badge, Text } from "@mantine/core";
import gsap from "gsap";

export const MobileMenu = ({ opened, close, menuItems, frontPage }) => {
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
            style={{ fontSize: "0.75rem" }}
          >
            {item.label}
          </Text>
        );
    }
  };

  return (
    <>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body>
            <Stack mt="5rem">
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
