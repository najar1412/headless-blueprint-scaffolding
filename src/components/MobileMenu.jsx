import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Drawer, Stack, Badge, Text, Image } from "@mantine/core";
import gsap from "gsap";
import { useMediaQuery } from "@mantine/hooks";

import linkedinIcon from "../assets/linkedin.svg";

export const MobileMenu = ({ opened, close, menuItems, frontPage }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  // Helper function to determine menu item behavior based on WordPress menu type
  const getMenuItemBehavior = (item) => {
    // Check if URL starts with http/https (external link)
    const isExternal = item.uri?.startsWith('http://') || item.uri?.startsWith('https://');

    // Check for badge styling via CSS classes
    const useBadgeStyle = item.cssClasses?.includes('badge-style');

    // Determine if it's an internal page path (starts with / but not //)
    const isInternalPage = item.uri?.startsWith('/') && !item.uri?.startsWith('//') && !item.uri?.startsWith('/#');

    // Scroll anchor is anything that's not external or internal page (like #contact)
    const isScrollAnchor = !isExternal && !isInternalPage;

    return {
      isExternalLink: isExternal,
      isInternalPage,
      isScrollAnchor,
      useBadgeStyle,
    };
  };

  const menuItem = (item) => {
    const behavior = getMenuItemBehavior(item);

    // Handle internal pages (Page/Post in WordPress)
    if (behavior.isInternalPage) {
      return (
        <Link
          href={item.uri}
          onClick={close}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Text style={{ fontSize: "1.5rem" }}>
            {item.label}
          </Text>
        </Link>
      );
    }

    // Handle external links (target="_blank" or http/https URLs)
    if (behavior.isExternalLink) {
      return (
        <Link
          href={item.uri}
          onClick={close}
          target={item.target || "_blank"}
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Text style={{ fontSize: "1.5rem" }}>
            {item.label}
          </Text>
        </Link>
      );
    }

    // Handle scroll anchors (custom links with # or no http)
    // Get the scroll target - use uri if it starts with #, otherwise construct from label
    const scrollTarget = item.uri?.startsWith('#') ? item.uri : `#${item.label.toLowerCase().replace(/\s/g, "-")}`;

    // Badge style variant (check CSS classes for 'badge-style')
    if (behavior.useBadgeStyle) {
      return (
        <Badge
          onClick={() => {
            close();
            frontPage
              ? gsap.to(window, {
                  ease: "power1.in",
                  scrollTo: scrollTarget,
                  duration: 0.2,
                })
              : router.push(`/${scrollTarget}`);
          }}
          mt="0.2rem"
          px={"2rem"}
          py={"1.25rem"}
          color="brand.2"
          style={{ cursor: "pointer" }}
        >
          <Text
            c="brand.0"
            fw="600"
            tt={"capitalize"}
            style={{ fontSize: "1.5rem" }}
          >
            {item.label}
          </Text>
        </Badge>
      );
    }

    // Default scroll anchor behavior
    return (
      <Text
        onClick={() => {
          close();
          return frontPage
            ? gsap.to(window, {
                ease: "power1.in",
                scrollTo: scrollTarget,
                duration: 0.2,
              })
            : router.push(`/${scrollTarget}`);
        }}
        style={{ fontSize: "1.5rem", cursor: "pointer" }}
      >
        {item.label}
      </Text>
    );
  };

  return (
    <>
      <Drawer.Root
        opened={opened}
        onClose={close}
        size="100%"
        removeScrollProps={{ removeScrollBar: false }}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body px={0} pt="2rem">
            <Stack mt="5rem" ml={isMobile ? "1rem" : "4rem"}>
              {menuItems.map((item) => (
                <Fragment key={item.label}>{menuItem(item)}</Fragment>
              ))}
              <Link
                href="https://www.linkedin.com/company/nexus-health-grp"
                target="_blank"
              >
                <Image
                  alt="linkedin logo"
                  src={linkedinIcon.src}
                  style={{
                    cursor: "pointer",
                    transform: "translateY(.25rem)",
                    width: "2.5rem",
                  }}
                />
              </Link>
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
