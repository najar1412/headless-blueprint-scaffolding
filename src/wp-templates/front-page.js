// TODO: instead of returning all posts and filtering, just query for the first/latest of types featured, journal, announcement
// TODO: clean up pinned section
import { gql } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Title,
  Text,
  Stack,
  Grid,
  Group,
  Space,
  List,
  Flex,
} from "@mantine/core";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import Header from "../components/header";
import Footer from "../components/footer";
import { PostCard } from "../components/PostCard";
import { QuoteCarousel } from "../components/carousels/QuoteCarousel";
import { Eyebrow } from "../components/Eyebrow";
import { ServicesCard } from "../components/ServicesCard";
import { PinnedSection } from "../components/pinnedSection/PinnedSection";
import { TeamMemberCard } from "../components/TeamMemberCard";
import { Section } from "../components/layout/Section";
import CustomCursor from "../components/CustomCursor";

import styles from "./front-page.module.css";
import headerStyles from "../components/header.module.css";

import placeholderThumbImage from "../assets/placeholder_thumb.jpg";
import cardGrayImage from "../assets/card_gray.jpg";
import logoSymbolIcon from "../assets/Nexus_Logomark_4C.svg";
import arrowBrGreen from "../assets/arrow-br-green.svg";
import step1Image from "../assets/step1.png";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function Component(props) {
  const { title: siteTitle } = props.data.generalSettings;
  const { footer, primaryMenuItems, page, publications } = props.data;

  const featured = publications.nodes.filter((publication) =>
    publication.publicationMeta.postType.includes("featured")
  );
  const journal = publications.nodes.filter((publication) =>
    publication.publicationMeta.postType.includes("journal")
  );
  const announcement = publications.nodes.filter((publication) =>
    publication.publicationMeta.postType.includes("announcement")
  );

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // helpers
    const setActive = (section) => {
      headerLinks.forEach((link) => {
        if (`${link.id}`.endsWith(section.id)) {
          link.children[0].classList.add(headerStyles["bar-link-show"]);
        } else {
          link.children[0].classList.remove(headerStyles["bar-link-show"]);
        }
      });
    };

    // sectional animation
    const sections = gsap.utils.toArray('[class*="front-page_section-start"]');
    const sectionsFades = gsap.utils.toArray('[class*="front-page_fadeIn"]');
    const headerLinks = gsap.utils.toArray('[class*="header_link"]');

    mm.add(
      {
        small: "(max-width: 62em)",
        large: "(min-width: 62em)",
      },
      (ctx) => {
        const { large, small } = ctx.conditions;

        // landing section
        const initialAnimation = gsap.utils.toArray(
          document.querySelectorAll(".gsap-initial")
        );
        gsap.set(initialAnimation, {
          opacity: 0,
          translateY: 100,
          ease: "power4.inOut",
        });
        gsap.to(initialAnimation, {
          opacity: 1,
          translateY: 0,
          stagger: 0.3,
        });

        if (large) {
          sections.forEach((section, i) => {
            // header highlight
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: () =>
                  `top${i > 2 ? `+=${large ? window.innerHeight * 2 : ""}` : ""} bottom-=50%`,
                end: () =>
                  `bottom${i > 2 ? `+=${large ? window.innerHeight * 2 : ""}` : ""} top+=50%`,
                toggleActions: "play none reverse none",
                invalidateOnRefresh: true,
                onToggle: (self) => self.isActive && setActive(section),
                /* markers: {
                  indent: 150 * i,
                  startColor: "red",
                  endColor: "red",
                }, */
                id: i,
              },
            });

            if (section.id === "services") {
              // header
              const items = section.querySelectorAll(".gsap-fade");
              gsap.set(items, {
                opacity: 0,
                translateY: 100,
              });
              gsap.to(items, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section,
                  start: () =>
                    `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=25%`,
                  end: () =>
                    `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=75%`,
                  toggleActions: "play none none none",
                  /* markers: {
                    indent: 150 * i,
                    startColor: "red",
                    endColor: "red",
                  }, */
                  id: i,
                },
              });

              // desktop content
              const desktopComp = section.querySelector(
                `.${styles["service-grid-desktop"]}`
              );
              const desktopItems = desktopComp.querySelectorAll(".gsap-fade");
              gsap.set(desktopItems, {
                opacity: 0,
                duration: 2,
                translateY: 100,
                ease: "power1.inOut",
              });

              gsap.to(desktopItems, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: desktopComp,
                  start: () =>
                    `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=25%`,
                  end: () =>
                    `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=75%`,
                  /* markers: {
                    indent: 150 * i,
                    startColor: "red",
                    endColor: "red",
                  }, */
                  id: i,
                },
              });
            }

            if (section.id === "our-leadership-team") {
              const items = section.querySelectorAll(".gsap-fade");
              gsap.set(items, {
                opacity: 0,
                translateY: 100,
              });

              gsap.to(items, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section,
                  start: () =>
                    `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=50%`,
                  end: () =>
                    `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=50%`,
                  toggleActions: "play none none none",
                  /* markers: {
                    indent: 150 * i,
                    startColor: "red",
                    endColor: "red",
                  }, */
                  id: i,
                },
              });
            }

            if (section.id === "the-nexus-advantage") {
              const numberCountElements = gsap.utils.toArray(
                section.querySelectorAll('[class*="front-page_numbers"]')
              );

              if (numberCountElements) {
                gsap.from(numberCountElements, {
                  textContent: 0,
                  duration: 3,
                  ease: "none",
                  snap: { textContent: 1 },
                  scrollTrigger: {
                    trigger: section,
                    start: () =>
                      `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=50%`,
                    end: () =>
                      `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=50%`,
                    /* markers: {
                      indent: 150 * i,
                      startColor: "red",
                      endColor: "red",
                    }, */
                  },
                });
              }
            }

            if (section.id === "thought-leadership") {
              const cardElements = gsap.utils.toArray(
                section.querySelectorAll(".gsap-fade")
              );

              gsap.set(cardElements, {
                opacity: 0,
                duration: 2,
                translateY: 100,
                ease: "power1.inOut",
              });

              gsap.to(cardElements, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section,
                  start: () =>
                    `top${i > 2 ? `+=${large ? window.innerHeight * 2 : ""}` : ""} bottom-=25%`,
                  end: () =>
                    `bottom${i > 2 ? `+=${large ? window.innerHeight * 2 : ""}` : ""} top+=75%`,
                  toggleActions: "play none none none",
                  id: i,
                  /* markers: {
                    indent: 150 * i,
                    startColor: "red",
                    endColor: "red",
                  }, */
                },
              });
            }
          });

          // pinned section
          gsap.to('[class*="front-page_section-content-trigger"]', {
            scrollTrigger: {
              trigger: '[class*="front-page_black"]',
              start: () => "top top",
              end: () => `bottom+=${window.innerHeight} top`,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
              pin: true,
              pinSpacer: true,
            },
          });

          // pinned section fades
          sectionsFades.forEach((section, i) => {
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: () => `top+=50% bottom-=20%`,
                end: () => `bottom-=50% top+=20%`,
                scrub: true,
                toggleClass: styles.enable,
                id: i,
                // markers: true,
              },
            });

            const fadeStart = (index, section) => {
              if (index > 3) {
                return `+=${section.offsetHeight + window.innerHeight}`;
              }
              return `top`;
            };

            const fadeUp = gsap.utils.toArray(
              section.querySelectorAll(".gsap-fade")
            );
            gsap.set(fadeUp, {
              opacity: 0,
              translateY: 100,
              ease: "power1.inOut",
            });

            gsap.to(fadeUp, {
              opacity: 1,
              translateY: 0,
              stagger: 0.3,
              scrollTrigger: {
                trigger: section,
                start: () => `${fadeStart(i, section)} top+=50%`,
                end: () => `+=bottom`,
                toggleActions: "play none none none",
                id: i,
              },
            });
          });
        }
        if (small) {
          sections.forEach((section, i) => {
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: () =>
                  `top${i > 2 ? `+=${small ? window.innerHeight * 2 : ""}` : ""} bottom-=50%`,
                end: () => `bottom bottom`,
                toggleActions: "play none reverse none",
                invalidateOnRefresh: true,
                onToggle: (self) => self.isActive && setActive(section),
                /* markers: {
                  indent: 150 * i,
                  startColor: "green",
                  endColor: "green",
                }, */
                id: i,
              },
            });
            if (section.id === "services") {
              // header
              /* const items = section.querySelectorAll(".gsap-fade");
              gsap.set(items, {
                opacity: 0,
                translateY: 100,
              });
              gsap.to(items, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section,
                  start: () =>
                    `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=25%`,
                  end: () =>
                    `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=75%`,
                  toggleActions: "play none none none",

                  id: i,
                },
              }); */

              // mobile content
              const mobileComp = section.querySelector(
                `.${styles["service-grid-mobile"]}`
              );
              const groups = gsap.utils.toArray(
                mobileComp.querySelectorAll(".gsap-group-fade")
              );

              groups.forEach((group) => {
                const items = gsap.utils.toArray(
                  group.querySelectorAll(".gsap-fade")
                );
                gsap.set(items, {
                  opacity: 0,
                  duration: 2,
                  translateY: 100,
                  ease: "power1.inOut",
                });

                gsap.to(items, {
                  opacity: 1,
                  translateY: 0,
                  stagger: 0.2,
                  scrollTrigger: {
                    trigger: group,
                    start: () =>
                      `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=25%`,
                    end: () =>
                      `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=75%`,
                    toggleActions: "play none none none",
                    id: i,
                    markers: {
                      indent: 150 * i,
                      startColor: "red",
                      endColor: "red",
                    },
                  },
                });
              });
            } else if (section.id === "the-nexus-advantage") {
              // the nexus advantage section
              const numberCountElements = gsap.utils.toArray(
                section.querySelectorAll('[class*="front-page_numbers"]')
              );

              gsap.from(numberCountElements, {
                textContent: 0,
                duration: 3,
                ease: "none",
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: section,
                  start: () => `top bottom-=50%`,
                  end: () => `bottom top+=50%`,
                  /* markers: true, */
                },
              });
            } else if (section.id === "our-leadership-team") {
              const items = section.querySelectorAll(".gsap-fade");
              gsap.set(items, {
                opacity: 0,
                duration: 2,
                translateY: 100,
                ease: "power1.inOut",
              });

              gsap.to(items, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section,
                  start: () => `top bottom-=25%`,
                  end: () => `bottom top+=75%`,
                  toggleActions: "play none none none",
                  id: i,
                },
              });
            } else if (section.id === "thought-leadership") {
              const items = section.querySelectorAll(".gsap-fade");
              gsap.set(items, {
                opacity: 0,
                duration: 2,
                translateY: 100,
                ease: "power1.inOut",
              });

              gsap.to(items, {
                opacity: 1,
                translateY: 0,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section,
                  start: () => `top bottom-=25%`,
                  end: () => `bottom top+=75%`,
                  toggleActions: "play none none none",
                  id: i,
                },
              });
            } else {
              if (section.id === "who-we-are-mobile") {
                const groups = gsap.utils.toArray(
                  section.querySelectorAll(".gsap-group-fade")
                );

                groups.forEach((group) => {
                  const items = gsap.utils.toArray(
                    group.querySelectorAll(".gsap-fade")
                  );
                  gsap.set(items, {
                    opacity: 0,
                    duration: 2,
                    translateY: 100,
                    ease: "power1.inOut",
                  });

                  gsap.to(items, {
                    opacity: 1,
                    translateY: 0,
                    stagger: 0.2,
                    scrollTrigger: {
                      trigger: group,
                      start: () =>
                        `top${i > 2 ? `+=${window.innerHeight * 2}` : ""} bottom-=25%`,
                      end: () =>
                        `bottom${i > 2 ? `+=${window.innerHeight * 2}` : ""} top+=75%`,
                      toggleActions: "play none none none",
                      id: i,
                      markers: {
                        indent: 150 * i,
                        startColor: "red",
                        endColor: "red",
                      },
                    },
                  });
                });
              }
            }
          });
        }
      }
    );
  });

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <CustomCursor />

      <Header menuItems={primaryMenuItems.nodes} page={page} frontPage />

      <Container
        component={"main"}
        className={"main"}
        maw={"unset"}
        w="100%"
        p={0}
      >
        <Section
          label="landing"
          fullHeight
          backgroundElement={
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                zIndex: 0,
              }}
            >
              <video
                src={page.s1.background.node.mediaItemUrl}
                autoPlay
                muted
                loop
                className={styles["background-video"]}
              />
              <div className={styles["splotch-2"]}></div>
              <div className={styles["splotch-1"]}></div>
              <div className={styles["splotch-3"]}></div>
            </div>
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Stack>
              <Stack gap={0}>
                <Title
                  maw={"40rem"}
                  fw={600}
                  className={`${styles.title} gsap-initial`}
                >
                  Shaping the future
                </Title>
                <Title
                  maw={"40rem"}
                  fw={600}
                  mb={"lg"}
                  className={`${styles.title} gsap-initial`}
                >
                  of market access
                </Title>
              </Stack>

              <Text
                maw={"28rem"}
                size="1.2rem"
                lh={"1.7rem"}
                fw="500"
                className={"gsap-initial"}
              >
                {page.s1.body}
              </Text>
              <Link
                className={"gsap-initial"}
                href={"#services"}
                onClick={() =>
                  gsap.to(window, {
                    ease: "power1.in",
                    scrollTo: `#services`,
                    duration: 0.2,
                  })
                }
                style={{ width: "fit-content" }}
              >
                <Stack
                  gap={0}
                  className={styles.link}
                  style={{ overflow: "hidden" }}
                >
                  <Group>
                    <Text fw="500" size="1.25rem" lh="2rem">
                      Discover more
                    </Text>
                    <Image alt="arrow" src={arrowBrGreen} />
                  </Group>
                  <div className={styles["bar-link"]} />
                </Stack>
              </Link>
            </Stack>
          </div>
        </Section>

        <Section label="services" bgColor="var(--mantine-color-brand-1)">
          <Stack px={{ base: "0rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Eyebrow gsapName={"gsap-fade"} label={"services"} variant={1} />
              <Title
                order={2}
                mb="2rem"
                className={`${styles["title-3"]} gsap-fade`}
                ta={"center"}
              >
                Science-powered access with future-proof solutions.
              </Title>
            </div>

            <Grid hiddenFrom="lg" className={styles["service-grid-mobile"]}>
              {page.s2.serviceCards.map((card) => (
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Flex
                    className="gsap-group-fade"
                    direction={"column"}
                    px={"1.5rem"}
                    py={"2.5rem"}
                    style={{
                      borderRadius: "2rem",
                      backgroundColor: "#093c46",
                    }}
                  >
                    <Image
                      className="gsap-fade"
                      src={card.icon.node.sourceUrl}
                      width="75"
                      height="75"
                      style={{
                        marginBottom: "1rem",
                      }}
                    />
                    <Title
                      className="gsap-fade"
                      size="1.25rem"
                      c="white"
                      mb="xl"
                      tt={"capitalize"}
                    >
                      {card.label}
                    </Title>
                    <Stack gap="xs">
                      {card.list
                        .map((item) => item.item)
                        .map((item) => (
                          <Text className="gsap-fade" c="white" key={item}>
                            {item}
                          </Text>
                        ))}
                    </Stack>
                  </Flex>
                </Grid.Col>
              ))}
            </Grid>

            <Grid visibleFrom="lg" className={styles["service-grid-desktop"]}>
              {page.s2.serviceCards.map((card) => (
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <ServicesCard
                    gsapName={"gsap-fade"}
                    icon={card.icon.node.sourceUrl}
                    iconSize={
                      card.label === "Market Access Consulting"
                        ? "4.5rem"
                        : "6.5rem"
                    }
                    title={card.label}
                    items={card.list.map((item) => item.item)}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Section>

        <div id="who-we-are"></div>
        {/* mobile */}
        <Container
          id="who-we-are-mobile"
          component={"section"}
          w="100%"
          maw={"unset"}
          bg={"var(--mantine-color-brand-0)"}
          className={`${styles.section} ${styles["section-start"]}`}
          hiddenFrom="md"
          style={{ position: "relative" }}
        >
          <Container
            maw={"1440px"}
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
            }}
          >
            <Stack gap={"4rem"}>
              <Stack align="center" className="gsap-group-fade">
                <Eyebrow
                  label={"who are we"}
                  variant={2}
                  gsapName={"gsap-fade"}
                />
                <img
                  className="gsap-fade"
                  src={step1Image.src}
                  style={{
                    maxWidth: "16rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                />
                <Title
                  ta="center"
                  c="white"
                  size="2rem"
                  fw="400"
                  mb={{ base: "0", md: "1.5rem" }}
                  className="gsap-fade"
                >
                  Meeting the needs of today and tomorrow
                </Title>
                <Text
                  ta="center"
                  c="white"
                  size={"1rem"}
                  lh={"1.5rem"}
                  className="gsap-fade"
                >
                  With the growing complexity of the healthcare system and a
                  shift toward value-based care, there is increasing pressure to
                  demonstrate the impact of a product in more innovative ways.
                </Text>
              </Stack>

              <Stack className="gsap-group-fade">
                <Title
                  ta={"center"}
                  c="white"
                  size="2rem"
                  fw="400"
                  mb={{ base: "0", md: "1.5rem" }}
                  className="gsap-fade"
                >
                  A strong foundation built in science
                </Title>
                <Text
                  ta={"center"}
                  c="white"
                  size={"1rem"}
                  lh={"1.5rem"}
                  className="gsap-fade"
                >
                  We noticed there was a blank spot in medical communications
                  around the value narrative.
                </Text>
                <Text
                  ta={"center"}
                  c="white"
                  size={"1rem"}
                  lh={"1.5rem"}
                  className="gsap-fade"
                >
                  Joining with market access leaders, we sought to bring
                  together a curated group of people to meet the needs of the
                  evolving market access landscape.
                </Text>
              </Stack>

              <Stack className="gsap-group-fade">
                <Title
                  className="gsap-fade"
                  ta={"center"}
                  c="white"
                  size="2rem"
                  fw="400"
                  mb={{ base: "0", md: "1.5rem" }}
                >
                  Ability to address all stakeholder types
                </Title>
                <Text
                  ta={"center"}
                  c="white"
                  size={"1.1rem"}
                  lh={"1.5rem"}
                  maw={"27rem"}
                  mb="1rem"
                  className="gsap-fade"
                >
                  As market access evolves, the list of stakeholders has grown.
                  We ensure communication is tailored to each stakeholder.
                </Text>
                <Group wrap="no-wrap" align="flex-start" className="gsap-fade">
                  <div>
                    <List c="white" size="1rem" spacing="xs">
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
                    <List c="white" size="1rem" spacing="xs">
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
            </Stack>
          </Container>
        </Container>

        {/* desktop */}
        <Container
          component={"section"}
          w="100%"
          maw={"unset"}
          mih={"100vh"}
          bg={"rgba(10, 64, 74, 1)"}
          p={0}
          m={0}
          className={`${styles.section}`}
          visibleFrom="md"
          style={{ position: "relative", overflowX: "hidden" }}
        >
          <Container
            p={0}
            m={0}
            maw={"1440px"}
            style={{
              position: "absolute",
              width: "100%",
              height: "300vh",
              left: "50%",
              transform: "translateX(-50%)",
              overflowX: "hidden",
              zIndex: 10,
            }}
          >
            <Container maw={"unset"} w="100%" h={"100vh"}>
              <Grid
                style={{
                  width: "100%",
                }}
              >
                <Grid.Col span={6}></Grid.Col>
                <Grid.Col span={6}></Grid.Col>
              </Grid>
            </Container>

            <Container
              maw={"unset"}
              w="100%"
              h={"100vh"}
              className={`${styles.fadeIn}`}
              style={{ display: "flex", alignItems: "center" }}
              p={0}
            >
              <Grid
                gutter={"6rem"}
                style={{
                  width: "100%",
                }}
              >
                <Grid.Col span={{ base: 0, md: 6 }}></Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack>
                    <Title c="white" size="2.3rem" maw={"25rem"}>
                      A strong foundation built in science
                    </Title>
                    <Text c="white" size={"1.1rem"} lh={"1.5rem"} maw={"25rem"}>
                      We noticed there was a blank spot in medical
                      communications around the value narrative.
                    </Text>
                    <Text c="white" size={"1.1rem"} lh={"1.5rem"} maw={"25rem"}>
                      Joining with market access leaders, we sought to bring
                      together a curated group of people to meet the needs of
                      the evolving market access landscape.
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Container>

            <Container
              maw={"unset"}
              w="100%"
              h={"100vh"}
              className={`${styles.fadeIn}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid
                gutter={"6rem"}
                style={{
                  width: "100%",
                }}
              >
                <Grid.Col span={{ base: 0, md: 6 }}></Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack>
                    <Title c="white" size="2.3rem" maw={"25rem"}>
                      Ability to address all stakeholder types
                    </Title>
                    <Text c="white" size={"1.1rem"} lh={"1.5rem"} maw={"27rem"}>
                      As market access evolves, the list of stakeholders has
                      grown. We ensure communication is tailored to each
                      stakeholder.
                    </Text>
                    <Group wrap="no-wrap" gap={"6rem"}>
                      <div>
                        <List c="white" fs={"1.1rem"}>
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
                        <List c="white" fs={"1.1rem"}>
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

          <Container
            w="100%"
            maw={"unset"}
            mih={"100vh"}
            p={0}
            m={0}
            className={`${styles["section-start"]} ${styles.black}`}
          >
            <PinnedSection background={page.s1.background.node.mediaItemUrl} />
          </Container>
        </Container>

        <Section
          label="our-leadership-team"
          bgColor="var(--mantine-color-brand-5)"
        >
          <Stack
            px={{
              base: "0rem",
              md: "4.5rem",
            }}
            align="center"
          >
            <Eyebrow
              gsapName={"gsap-fade"}
              label={page.s4.eyeBrow}
              variant={3}
            />
            <Title
              order={2}
              ta="center"
              size="2.25rem"
              mb={{ base: "2rem", md: "4rem" }}
              className={"gsap-fade"}
            >
              {page.s4.title}
            </Title>
            <Grid w={"100%"}>
              {page.s4.leaders.map((leader) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <TeamMemberCard data={leader} />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Section>

        <Section label="the-nexus-advantage" bgColor={"#EFF6D9"}>
          <Grid cols={2} justify="center" align="center">
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Container maw={"unset"} p={0} w={"100%"}>
                <QuoteCarousel quotes={page.s5.quotes} />
              </Container>
              <Space hiddenFrom="lg" h="1.5rem" />
            </Grid.Col>
            <Grid.Col visibleFrom="lg" span={2}>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "1px",
                  height: "20rem",
                  backgroundColor: "var(--mantine-color-brand-2)",
                }}
              ></div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Container maw={"unset"} p={0} w={"100%"}>
                <Grid gutter={{ base: "3rem", md: "3rem" }}>
                  {page.s5.stats.map((stat) => (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack
                        gap={"0.5rem"}
                        className={styles["stat-container"]}
                      >
                        <Text
                          size={"2.5rem"}
                          fw="700"
                          c="brand.2"
                          className={styles["stat-number"]}
                        >
                          <span className={styles.numbers}>{stat.number}</span>
                          <sup
                            style={{
                              fontSize: "2rem",
                              paddingLeft: "0.25rem",
                            }}
                          >
                            {stat.unit}
                          </sup>
                        </Text>
                        <Text
                          lh={"1.25rem"}
                          fw={500}
                          className={styles["stat-copy"]}
                        >
                          {stat.copy}
                        </Text>
                      </Stack>
                    </Grid.Col>
                  ))}
                </Grid>
              </Container>
            </Grid.Col>
          </Grid>
        </Section>

        <Section label="thought-leadership">
          <Eyebrow
            gsapName={"gsap-fade"}
            label={"thought leadership"}
            variant={3}
          />
          <Grid gutter={"xs"}>
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Stack>
                <Title className={`${styles["title-2"]} gsap-fade`}>
                  What’s Happening at Nexus Health
                </Title>
                <Text fw="500" className={`${styles["copy-2"]} gsap-fade`}>
                  The future of market access starts here—news, insights, and
                  expert perspectives.
                </Text>
                <Link
                  href={"thought-leadership"}
                  style={{ width: "fit-content" }}
                >
                  <Stack
                    gap={0}
                    className={`${styles.link} gsap-fade`}
                    mt="0.4rem"
                    mb="1rem"
                    style={{ overflow: "hidden" }}
                  >
                    <Text
                      fw="700"
                      size="0.84rem"
                      mb="0.25rem"
                      className={styles["button-2"]}
                    >
                      Discover More
                    </Text>
                    <div className={`${styles["bar-link"]}`} />
                  </Stack>
                </Link>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              {announcement.length ? (
                <PostCard
                  gsapName={"gsap-fade"}
                  category={"announcement"}
                  title={announcement[0].title}
                  footer={announcement[0].publicationMeta.announcementLocation}
                  link={announcement[0].uri}
                  colour={"var(--mantine-color-brand-3)"}
                />
              ) : null}
            </Grid.Col>
            <Grid.Col visibleFrom="lg" span={{ base: 12, lg: 3 }}>
              <PostCard gsapName={"gsap-fade"} gradient />
            </Grid.Col>
          </Grid>
          <Grid gutter={"xs"}>
            <Grid.Col visibleFrom="lg" span={1}>
              <div className={styles["box-element-1"]}>
                <Image alt="nexus logo" src={logoSymbolIcon} />
              </div>
              <div className={styles["box-element-2"]}></div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              {journal.length ? (
                <PostCard
                  gsapName={"gsap-fade"}
                  category={"journal"}
                  title={journal[0].title}
                  link={journal[0].uri}
                  colour={"var(--mantine-color-brand-4)"}
                />
              ) : null}
            </Grid.Col>
            <Grid.Col visibleFrom="lg" span={{ base: 12, lg: 3 }}>
              <PostCard gsapName={"gsap-fade"} image={cardGrayImage} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              {featured ? (
                <PostCard
                  gsapName={"gsap-fade"}
                  category={"featured"}
                  title={featured[0].title}
                  image={placeholderThumbImage}
                  link={featured[0].uri}
                />
              ) : null}
            </Grid.Col>
          </Grid>
        </Section>
      </Container>

      <Footer node={footer} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    uri: "/publications",
  };
};

Component.query = gql`
  ${Header.fragments.entry}

  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    ...HeaderFragment
    ...${Footer.fragments.entry}
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
    title
    s1 {
      title
      body
      background {
        node {
          mediaItemUrl
        }
      }
    }
    s2 {
      eyeBrow
      title
      serviceCards {
        label
        list {
          item
        }
        icon {
          node {
            sourceUrl
          }
        }
      }
    }
    s4 {
      title
      eyeBrow
      leaders {
        bio
        linkedin
        name
        title
        headshot {
          node {
            sourceUrl(size: MEDIUM)
          }
        }
      }
    }
    s5 {
      quotes {
        quote
        quoter
      }
      stats {
        copy
        number
        unit
      }
    }
  }
    
    publications {
      nodes {
        databaseId
        uri
        ... on NodeWithTitle {
          title
        }
        ... on NodeWithContentEditor {
          content
        }
        publicationMeta: publicationMeta {
          date
          author
          postType
          announcementLocation
        }
      }
        
    }
  }
`;
