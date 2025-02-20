import { Box, Text, Stack, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Grid } from "@mantine/core";
import Image from "next/image";

// import styles from "./ServicesCard.module.css";

import arrowTrGreenIcon from "../assets/arrow-tr-green.svg";
import arrowBrBlueIcon from "../assets/arrow-bl-blue.svg";

export const TeamMemberCard = ({ icon, iconSize, title, items, gsapName }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const data = {
    name: "Andrew Gottfried",
    headshot: "",
    title: "CEO",
    copy: [
      "Andrew has been a trusted partner to life-science companies for decades, helping to propel market access into the essential function it is today. He created Nexus Health Group to provide market-leading strategic consulting, value communications, and patient access and affordability solutions that exceed expectations and drive commercial success by eliminating the barriers that may separate patients from their prescribed medications.",
    ],
  };
  return (
    <>
      <Stack gap={"0.4rem"}>
        <Box
          bg={"red"}
          style={{ borderRadius: "4rem 0 3.5rem 3.5rem", cursor: "pointer" }}
          p={"xl"}
          mb="sm"
          onClick={open}
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
                  <Text size="1.1rem" fw="bold" mb='xs'>
                    {data.name}
                  </Text>
                  <Text size="0.9rem" mb='1.5rem'>{data.title}</Text>
                  {data.copy.map((c) => (
                    <Text size={"0.9rem"} lh={"1.25rem"} fw="300" mb='1rem'>
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
