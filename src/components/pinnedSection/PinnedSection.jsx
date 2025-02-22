import { useRef } from "react";

import { Container, Grid, Stack, Title, Text } from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Eyebrow } from "../Eyebrow";
import { NexusShape } from "../animated/NexusShape";

import styles from "../../wp-templates/front-page.module.css";

export const PinnedSection = ({ background }) => {
  const container = useRef();
  const shapeSvgRef = useRef();

  useGSAP(
    () => {
      // selectors
      gsap.set(shapeSvgRef.current, { x: container.current.offsetWidth / 4 });
      const logo = shapeSvgRef.current.querySelector("#Logo");
      gsap.set(logo, { opacity: 0 });

      const smallCircles =
        shapeSvgRef.current.querySelector("#small_x5F_circles");

      const text = shapeSvgRef.current.querySelector("#Text");
      gsap.set(text, { opacity: 0 });

      const textEvidence = shapeSvgRef.current.querySelector("#evidence");
      const textScience = shapeSvgRef.current.querySelector("#science");
      const textValue = shapeSvgRef.current.querySelector("#value");
      gsap.set([textEvidence, textScience, textValue], { opacity: 1 });

      const allPills = shapeSvgRef.current.querySelectorAll('[id^="pill"]');
      gsap.set(allPills, { opacity: 0 });
      const pill1 = shapeSvgRef.current.querySelector("#pill1"); // green
      gsap.set(pill1, {
        transformOrigin: "center",
        rotate: 75,
      });
      const pill2 = shapeSvgRef.current.querySelector("#pill2"); // white
      gsap.set(pill2, {
        transformOrigin: "center",
        rotate: -90,
      });
      const pill3 = shapeSvgRef.current.querySelector("#pill3"); // baby blue
      gsap.set(pill3, {
        transformOrigin: "center",
        rotate: -75,
      });
      const allCircles = shapeSvgRef.current.querySelectorAll('[id^="circle"]');
      gsap.set(allCircles, { opacity: 1 });

      const circle1 = shapeSvgRef.current.querySelector("#circle1"); // green
      const circle2 = shapeSvgRef.current.querySelector("#circle2"); // white
      const circle3 = shapeSvgRef.current.querySelector("#circle3"); // blue

      let blocks = gsap.utils.toArray('[class*="front-page_pinned-section"]');

      // nexus shape timeline
      const shapeTl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: container.current,
          start: () => `top bottom`,
          end: () => `bottom+=${window.innerHeight * 2} top`,
          scrub: true,
          toggleActions: "play reverse play reverse",
          /* markers: {
            startColor: "red",
            endColor: "red",
            fontSize: "16px",
          }, */
          invalidateOnRefresh: true,
        },
      });

      shapeTl
        .to(
          shapeSvgRef.current,
          {
            ease: "power1.inOut",
          },
          "section0"
        )
        .to(
          [allCircles, textEvidence, textScience, textValue, smallCircles],
          {
            duration: 0.2,
            opacity: 0,
            ease: "power1.inOut",
          },
          "section1"
        )
        .to(
          shapeSvgRef.current,
          {
            x: `-=${container.current.offsetWidth / 2}`,
            ease: "power1.inOut",
          },
          "section1"
        )
        .to(
          [logo, text, allPills],
          {
            duration: 0.2,
            opacity: 1,
            ease: "power1.inOut",
          },
          "section1"
        )
        .to(
          pill1,
          {
            rotation: -75,
            transformOrigin: "center",
            ease: "power1.inOut",
          },
          "section1"
        )
        .to(
          pill2,
          {
            rotation: 90,
            transformOrigin: "center",
            ease: "power1.inOut",
          },
          "section1"
        )
        .to(
          pill3,
          {
            rotation: 75,
            transformOrigin: "center",
            ease: "power1.inOut",
          },
          "section1"
        )
        .to(
          pill1,
          {
            rotation: 15,
            transformOrigin: "center",
            ease: "power1.inOut",
          },
          "section2"
        )
        .to(
          pill2,
          {
            rotation: 0,
            transformOrigin: "center",
            ease: "power1.inOut",
          },
          "section2"
        )
        .to(
          pill3,
          {
            rotation: -15,
            transformOrigin: "center",
            ease: "power1.inOut",
          },
          "section2"
        );

      blocks.forEach((block, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: () => `top+=${window.innerHeight * i} bottom`,
            end: () =>
              `bottom+=${window.innerHeight + (window.innerHeight / 4) * i} top+=75%`,
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
            /* markers: {
              indent: 150 * i,
              startColor: "yellow",
              endColor: "yellow",
              fontSize: "16px",
            }, */
            id: i,
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
    <Container
      ref={container}
      w="100%"
      maw={"unset"}
      h={"100%"}
      p={0}
      bg={"rgba(10, 64, 74, 1.0)"}
      className={`${styles["section-content"]} ${styles["section-content-trigger"]}`}
      style={{
        position: "relative",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 0,
          mixBlendMode: "color-burn",
          background: "red",
          opacity: 0.5,
        }}
      >
        <video
          src={background}
          autoPlay
          muted
          loop
          style={{ minHeight: "100dvh", width: "auto", minWidth: "100vw" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          zIndex: 100,
          width: "100%",
          maxWidth: "1440px!important",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NexusShape ref={shapeSvgRef} className={styles.hidden} />
      </div>

      <Container
        className={styles["pinned-section"]}
        w="100%"
        maw={"1440px!important"}
        px="4rem"
        mx="auto"
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
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack>
              <Eyebrow label={"who are we"} variant={2} />
              <Title c="white" size={"2.3rem"} maw={"25rem"}>
                Meeting the needs of today and tomorrow
              </Title>
              <Text c="white" size={"1.1rem"} lh={"1.5rem"} maw={"25rem"}>
                With the growing complexity of the healthcare system and a shift
                toward value-based care, there is increasing pressure to
                demonstrate the impact of a product in more innovative ways.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 0, md: 6 }}></Grid.Col>
        </Grid>
      </Container>

      <Container
        className={styles["pinned-section"]}
        w="100%"
        maw={"1440px!important"}
        px="4rem"
        mx="auto"
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
          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Container>

      <Container
        className={styles["pinned-section"]}
        maw={"1440px!important"}
        w="100%"
        h={"100%"}
        opacity={0}
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
          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
};
