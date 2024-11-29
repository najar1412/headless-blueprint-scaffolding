import { useRef } from "react";

import {
  Container,
  Grid,
  Stack,
  Title,
  Text,
  Group,
  List,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Eyebrow } from "../Eyebrow";

import styles from "../../wp-templates/front-page.module.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const PinnedSection = () => {
  const container = useRef();

  useGSAP(
    () => {
      // pinned children animation
      let blocks = gsap.utils.toArray('[class*="front-page_pinned-section"]');
      console.log(blocks);
      const vh = (coef) => window.innerHeight * (coef / 100);

      blocks.forEach((block, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,

            start: `${!i ? "top" : `top+=${50 * i}%`} top`,
            end: `${!i ? "top+=50%" : `top+=${100 * i}%`}  bottom`,
            invalidateOnRefresh: true,
            markers: {
              indent: 150 * i,
              startColor: "yellow",
              endColor: "yellow",
            },
            id: i + 1,
            toggleActions: "play reverse play reverse",
          },
        });

        tl.to(block, {
          opacity: 1,
        });
      });
    },
    { scope: container }
  );

  return (
    <Container
      ref={container}
      maw={"unset"}
      w="100%"
      h={"100%"}
      p={0}
      className={`${styles["section-content"]} ${styles["section-content-trigger"]}`}
    >
      <Container
        className={styles["pinned-section"]}
        maw={"unset"}
        w="100%"
        h={"100%"}
        style={{
          position: "absolute",
          top: "0",
        }}
      >
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <Eyebrow label={"who are we"} variant={2} />
              <Title c="white" order={3} maw={"16rem"}>
                Meeting the needs of today and tomorrow
              </Title>
              <Text c="white" maw={"21rem"}>
                With the growing complexity of the healthcare system and a shift
                toward value-based care, there is increasing pressure to
                demonstrate the impact of a product in more innovative ways.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Container>
      <Container
        className={styles["pinned-section"]}
        maw={"unset"}
        w="100%"
        h={"100%"}
        style={{
          position: "absolute",
          top: "0",
        }}
      >
        <Grid
          style={{
            width: "100%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Title c="white" order={3} maw={"16rem"}>
                A strong foundation built in science
              </Title>
              <Text c="white" maw={"23rem"}>
                We noticed there was a blank spot in medical communications
                around the value narrative.
              </Text>
              <Text c="white" maw={"24rem"}>
                Joining with market access leaders, we sought to bring together
                a curated group of people to meet the needs of the evolving
                market access landscape.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
      <Container
        className={styles["pinned-section"]}
        maw={"unset"}
        w="100%"
        h={"100%"}
        style={{
          position: "absolute",
          top: "0",
        }}
      >
        <Grid
          style={{
            width: "100%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Title c="white" order={3} maw={"16rem"}>
                Ability to address all stakeholder types
              </Title>
              <Group wrap="no-wrap">
                <div>
                  <List c="white">
                    <List.Item>Payers</List.Item>
                    <List.Item>Employers</List.Item>
                    <List.Item>Physicians</List.Item>
                    <List.Item>Pharmacies</List.Item>
                    <List.Item>Patients</List.Item>
                    <List.Item>Caregivers</List.Item>
                    <List.Item>Hubs</List.Item>
                    <List.Item>Office Staff</List.Item>
                    <List.Item>GPOs</List.Item>
                  </List>
                </div>
                <div>
                  <List c="white">
                    <List.Item>Hospitals</List.Item>
                    <List.Item>IDNs</List.Item>
                    <List.Item>Specialty</List.Item>
                    <List.Item>Community Pharmacies</List.Item>
                    <List.Item>Physician Assistants</List.Item>
                    <List.Item>Distributors & 3PLs</List.Item>
                    <List.Item>Infusion Centers</List.Item>
                    <List.Item>Sites of Care</List.Item>
                    <List.Item>Nurse Practitioners</List.Item>
                  </List>
                </div>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
};
