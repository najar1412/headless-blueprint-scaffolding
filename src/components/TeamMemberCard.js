import { useRef } from "react";

import { Box, Text, Stack, ScrollArea, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import styles from "./TeamMemberCard.module.css";

import leaderCloseIcon from "../assets/leader_close_icon.svg";
import linkedinIcon from "../assets/linkedin.svg";

export const TeamMemberCard = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const container = useRef();
  const newCursor = useRef();

  useGSAP(() => {
    console.log(container);

    const xTo = gsap.quickTo(newCursor.current, "x", {
      duration: 0.3,
      ease: "power3",
    });
    const yTo = gsap.quickTo(newCursor.current, "y", {
      duration: 0.3,
      ease: "power3",
    });
    gsap.set(newCursor.current, { autoAlpha: 1, scale: 0 });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    container.current.addEventListener("mouseenter", () => {
      gsap.to(newCursor.current, {
        scale: 1,
        duration: 0.2,
        overwrite: "auto",
        // delay: 0.2,
      });
    });
    container.current.addEventListener("mouseleave", () => {
      gsap.to(newCursor.current, {
        scale: 0,
        duration: 0.01,
        overwrite: "auto",
      });
    });

    // TODO: imp timelines for sectional animation
    //https://gsap.com/community/forums/topic/36504-gsap-scrolltrigger-loop-through-array/
    // sectional animation
  });

  return (
    <>
      <div ref={newCursor} className={styles.mycircleicon}>
        <Text c={"#0A404A"} ta="center" fw="bold" size="1.05rem">
          READ
          <br />
          BIO
        </Text>
      </div>
      <Stack gap={"0.4rem"}>
        <Box
          ref={container}
          bg={"rgba(235, 235, 235, 1)"}
          style={{
            borderRadius: "2.5rem 0 2.5rem 2.5rem",
            cursor: "pointer",
            overflow: "hidden",
          }}
          mb="sm"
          onClick={open}
          h={"16rem"}
          mih={"16rem"}
        >
          <div
            style={{
              padding: "1rem",
              height: "100%",
              width: "100%",
              backgroundImage: data.headshot
                ? `url('${data.headshot.node.sourceUrl}')`
                : "none",
              backgroundSize: "cover",
            }}
          ></div>
        </Box>
        <Text size="1.1rem" fw="bold">
          {data.name}
        </Text>
        <Text size="0.9rem">{data.title}</Text>
      </Stack>

      <Modal.Root
        opened={opened}
        onClose={close}
        centered
        h={"100%"}
        mah={"960px"}
      >
        <Modal.Overlay bg={"rgba(250, 250, 250, 0.9)"} />
        <Modal.Content
          pl={"3rem"}
          pr={"1rem"}
          pb={"2rem"}
          style={{
            borderRadius: "4rem 0 3.5rem 3.5rem",
          }}
        >
          <Modal.Header>
            <Modal.CloseButton size={0} mr={"0.5rem"}>
              <Image width={25} height={25} src={leaderCloseIcon} />
            </Modal.CloseButton>
          </Modal.Header>
          <Modal.Body>
            <Flex>
              <Stack gap={"md"} mr={"1.5rem"}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(235, 235, 235, 1)",
                    height: "100%",
                    width: "100%",
                    borderRadius: "2.5rem 0 2.5rem 2.5rem",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "270px",
                      backgroundImage: data.headshot
                        ? `url('${data.headshot.node.sourceUrl}')`
                        : "none",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>

                {data.linkedin ? (
                  <Link href={data.linkedin} target='_blank'>
                    <Image
                      width={25}
                      height={25}
                      src={linkedinIcon}
                      style={{ marginLeft: "2rem" }}
                    />
                  </Link>
                ) : null}
              </Stack>
              <ScrollArea
                h={"300px"}
                type="always"
                offsetScrollbars
                scrollbarSize={6}
                pr={"2rem"}
                classNames={styles}
              >
                <Text size="1.1rem" fw="bold" mb="xs">
                  {data.name}
                </Text>
                <Text size="0.9rem" mb="1.5rem">
                  {data.title}
                </Text>
                <Text size={"0.9rem"} lh={"1.25rem"} fw="300" mb="1rem">
                  {data.bio}
                </Text>
              </ScrollArea>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
