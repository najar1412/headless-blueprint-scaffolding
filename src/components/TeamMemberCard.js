import { useRef } from "react";

import { Box, Text, Stack, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Grid } from "@mantine/core";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

import styles from "./TeamMemberCard.module.css";

import arrowTrGreenIcon from "../assets/arrow-tr-green.svg";
import arrowBrBlueIcon from "../assets/arrow-bl-blue.svg";

export const TeamMemberCard = ({ icon, iconSize, title, items, gsapName }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const container = useRef();
  const newCursor = useRef();

  const data = {
    name: "Andrew Gottfried",
    headshot: "",
    title: "CEO",
    copy: [
      "Andrew has been a trusted partner to life-science companies for decades, helping to propel market access into the essential function it is today. He created Nexus Health Group to provide market-leading strategic consulting, value communications, and patient access and affordability solutions that exceed expectations and drive commercial success by eliminating the barriers that may separate patients from their prescribed medications.",
    ],
  };

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
        delay: 0.2,
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
        <Text c={"#0A404A"} ta="center" fw="bold" size='1.05rem'>
          READ
          <br />
          BIO
        </Text>
      </div>
      <Stack gap={"0.4rem"}>
        <Box
          ref={container}
          bg={"yellow"}
          style={{ borderRadius: "2.5rem 0 2.5rem 2.5rem", cursor: "pointer" }}
          p={"xl"}
          mb="sm"
          onClick={open}
          mih={'16rem'}
        >
          leadership card
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
        <Modal.Overlay bg={"rgba(255, 255, 255, 0.9)"} />
        <Modal.Content
          pl={"3rem"}
          pr={"1rem"}
          py={"2rem"}
          style={{
            borderRadius: "4rem 0 3.5rem 3.5rem",
          }}
        >
          <Modal.Body>
            {/* <Modal.CloseButton /> */}
            <Grid>
              <Grid.Col></Grid.Col>
              <Grid.Col>
                <ScrollArea
                  h={"300px"}
                  type="always"
                  offsetScrollbars
                  scrollbarSize={6}
                  pr={"2rem"}
                >
                  <Text size="1.1rem" fw="bold" mb="xs">
                    {data.name}
                  </Text>
                  <Text size="0.9rem" mb="1.5rem">
                    {data.title}
                  </Text>
                  {data.copy.map((c) => (
                    <Text size={"0.9rem"} lh={"1.25rem"} fw="300" mb="1rem">
                      {c}
                    </Text>
                  ))}
                </ScrollArea>
              </Grid.Col>
            </Grid>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
