import { useRef } from "react";

import { Box, Text, Stack, ScrollArea, Flex, Space } from "@mantine/core";
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

  const handleOpen = () => {
    document.body.classList.add("show-cursor");
    open();
  };

  const handleClose = () => {
    document.body.classList.remove("show-cursor");
    close();
  };

  return (
    <>
      <div ref={newCursor} className={styles.mycircleicon}>
        <Text c={"#0A404A"} ta="center" fw="bold" size="1.05rem">
          READ
          <br />
          BIO
        </Text>
      </div>
      <div
        gap={"0.4rem"}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={"team-card gsap-fade"}
      >
        <Box
          ref={container}
          bg={"rgba(235, 235, 235, 1)"}
          style={{
            borderRadius: "2.5rem 0 2.5rem 2.5rem",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
            zIndex: 0,
            cursor: "none",
          }}
          mb="sm"
          onClick={() => handleOpen()}
          h={"16rem"}
          mih={"16rem"}
          maw={"20rem"}
          w="100%"
        >
          <div className={styles["mycircleicon-static"]}>
            <Text c={"#0A404A"} ta="center" fw="bold" size="1.05rem">
              READ
              <br />
              BIO
            </Text>
          </div>
          <div
            className={styles["member-image"]}
            style={{
              backgroundImage: data.headshot
                ? `url('${data.headshot.node.sourceUrl}')`
                : "none",
            }}
          ></div>
        </Box>
        <Text size="1.1rem" fw="bold">
          {data.name}
        </Text>
        <Text size="0.9rem">{data.title}</Text>
      </div>

      <Modal.Root
        className={styles.cardModal}
        opened={opened}
        onClose={() => handleClose()}
        size={"90vw"}
        centered
        h={"100%"}
        removeScrollProps={{ removeScrollBar: false }}
      >
        <Modal.Overlay bg={"rgba(250, 250, 250, 0.9)"} />
        <Modal.Content
          pl={{ base: "1rem", md: "3rem" }}
          pr={"1rem"}
          pb={{ base: "0.25rem", md: "2rem" }}
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
            <Flex direction={{ base: "column", md: "row" }}>
              <Stack gap={"md"} mr={"1.5rem"}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(235, 235, 235, 1)",
                    height: "100%",
                    maxHeight: "250px",
                    width: "100%",
                    borderRadius: "2.5rem 0 2.5rem 2.5rem",
                    overflow: "hidden",
                    maxWidth: "fit-content",
                  }}
                >
                  <div
                    className={styles.teamImage}
                    style={{
                      height: "100%",
                      width: "250px",
                      minHeight: "15rem",
                      backgroundImage: data.headshot
                        ? `url('${data.headshot.node.sourceUrl}')`
                        : "none",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>

                {data.linkedin ? (
                  <Link href={data.linkedin} target="_blank">
                    <Image
                      width={25}
                      height={25}
                      src={linkedinIcon}
                      style={{ marginLeft: "2rem" }}
                    />
                  </Link>
                ) : null}
              </Stack>
              <Space h={"2rem"} hiddenFrom="md" />
              <ScrollArea
                h={"100%"}
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
