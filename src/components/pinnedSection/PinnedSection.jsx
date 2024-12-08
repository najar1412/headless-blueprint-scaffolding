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

import { Eyebrow } from "../Eyebrow";
import { NexusShape } from "../animated/NexusShape";

import styles from "../../wp-templates/front-page.module.css";

export const PinnedSection = () => {
  const container = useRef();
  const shapeSvgRef = useRef();

  useGSAP(
    () => {
      // pinned children animation
      let blocks = gsap.utils.toArray('[class*="front-page_pinned-section"]');
      const vh = (coef) => window.innerHeight * (coef / 100);
      const vw = (coef) => window.innerWidth * (coef / 100);

      const calcPosition = (num, index, start) => {
        if (start) {
          if (index) {
            return vh(num) * index;
          }
          return 0;
        } else {
          if (index) {
            return vh(num) * index;
          }
          return vh(50);
        }
      };

      const shapeTl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          start: () => `top+=${calcPosition(60, 3, true)}px top`,
          end: () => `bottom+=360% bottom`,
          scrub: true,
          toggleActions: "play reverse play reverse",
          /* markers: {
            startColor: "yellow",
            endColor: "yellow",
            fontSize: "12px",
          }, */
          invalidateOnRefresh: true,
        },
      });

      shapeTl
        .to(shapeSvgRef.current, {
          opacity: 1,
          x: `+=${container.current.offsetWidth / 4}`,
        })
        .to(shapeSvgRef.current, {
          rotation: 0,
        })
        .to(shapeSvgRef.current, {
          x: `-=${container.current.offsetWidth / 2}`,
        })
        .to(shapeSvgRef.current, {
          rotation: -360,
        })
        .to(shapeSvgRef.current, {
          rotation: -720,
        });

      blocks.forEach((block, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: () => `top+=${calcPosition(60, i, true)}px top`,
            end: () => `bottom+=${calcPosition(120, i)}px  bottom`,
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
            /* markers: true, */
          },
        });

        tl.to(block, {
          duration: 0.2,
          opacity: 1,
        });
      });
    },
    { scope: container }
  );

  return (
    <>
      <Container
        ref={container}
        maw={"1512px"}
        /* bg={"red"} */
        w="100%"
        h={"100%"}
        p={0}
        className={`${styles["section-content"]} ${styles["section-content-trigger"]}`}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            zIndex: 9999999,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NexusShape ref={shapeSvgRef} />
        </div>
        <Container
          className={styles["pinned-section"]}
          maw={"unset"}
          w="100%"
          h={"100%"}
        >
          <Grid
            style={{
              width: "100%",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Grid.Col span={6}>
              <Stack>
                <Eyebrow label={"who are we"} variant={2} />
                <Title c="white" order={3} maw={"16rem"}>
                  Meeting the needs of today and tomorrow
                </Title>
                <Text c="white" maw={"23rem"}>
                  With the growing complexity of the healthcare system and a
                  shift toward value-based care, there is increasing pressure to
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
                  Joining with market access leaders, we sought to bring
                  together a curated group of people to meet the needs of the
                  evolving market access landscape.
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
    </>
  );
};
