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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import Header from "../components/header";
import Footer from "../components/footer";
import { PostCard } from "../components/PostCard";
import { Landing as Landing2 } from "../components/Landing2";
import { QuoteCarousel } from "../components/carousels/QuoteCarousel";
import { Eyebrow } from "../components/Eyebrow";
import { ServicesCard } from "../components/ServicesCard";
import { PinnedSection } from "../components/pinnedSection/PinnedSection";

import styles from "./front-page.module.css";
import headerStyles from "../components/header.module.css";

import placeholderThumbImage from "../assets/placeholder_thumb.jpg";
import cardGrayImage from "../assets/card_gray.jpg";
import logoSymbolIcon from "../assets/Nexus_Logomark_4C.svg";
import arrowBrGreen from "../assets/arrow-br-green.svg";
import patientIcon from "../assets/icon_patient.svg";
import marketAccessIcon from "../assets/Market_Access_Consulting_Icon.svg";
import valueIcon from "../assets/icon_value_comm.svg";

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
    // TODO: imp timelines for sectional animation
    //https://gsap.com/community/forums/topic/36504-gsap-scrolltrigger-loop-through-array/

    const setActive = (section) => {
      headerLinks.forEach((link) => {
        if (`${link.id}`.endsWith(section.id)) {
          link.children[0].classList.add(headerStyles["bar-link-show"]);
        } else {
          link.children[0].classList.remove(headerStyles["bar-link-show"]);
        }
      });
    };
    const vh = (coef) => window.innerHeight * (coef / 100);

    // sectional animation
    const sections = gsap.utils.toArray('[class*="front-page_section-start"]');
    const sectionsFades = gsap.utils.toArray('[class*="front-page_fadeIn"]');
    const headerLinks = gsap.utils.toArray('[class*="header_link"]');

    const calcBottom = () => {
      return "+=bottom";
    };

    const calcTop = (index, section) => {
      const offset = (section) => {
        return section.offsetTop - section.offsetHeight * 2;
      };
      if (index < 3) {
        return "+" + section.offsetHeight;
      } else if (index === 2) {
        if (absoluteHeight === 0) {
          absoluteHeight = section.offsetTop;
        }
        const t = absoluteHeight * 4;
        return "+=" + t;
      } else {
        return "+=" + offset(section);
      }
    };

    let absoluteHeight = 0;

    sections.forEach((section, i) => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: () => `top${calcTop(i, section)} top`,
          end: () => `${calcBottom()}`,
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

      const fadeStart = (index, section) => {
        const fullHeight = vh(100);
        if (index > 3) {
          return `+=${section.offsetHeight + fullHeight}`;
        }
        return `top`;
      };

      const fadeUp = gsap.utils.toArray(section.querySelectorAll(".gsap-fade"));
      gsap.set(fadeUp, { opacity: 0, translateY: 100, ease: "power1.inOut" });

      gsap.to(fadeUp, {
        opacity: 1,
        translateY: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: () => `${fadeStart(i, section)} top+=50%`,
          end: () => `${calcBottom()}`,
          toggleActions: "play none none none",
          /* markers: {
            indent: 150 * i,
            startColor: "red",
            endColor: "red",
          },
          id: i, */
        },
      });

      // animate numbers
      // TODO: imp in scrolltrigger
      const numberCount = gsap.utils.toArray(
        section.querySelectorAll('[class*="front-page_numbers"]')
      );

      gsap.from(numberCount, {
        textContent: 0, // start from 0
        duration: 5,
        ease: "none",
        snap: { textContent: 1 }, // increment by 1,
        scrollTrigger: {
          trigger: section,
          start: () => `top${calcTop(i, section)} top`,
          end: () => `${calcBottom()}`,
          /* markers: true, */
        },
      });
    });

    sectionsFades.forEach((section, i) => {
      // gsap.set(section, { opacity: 0 });
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: () => `top+=50% bottom-=20%`,
          end: () => `bottom-=50% top+=20%`,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
          /* onToggle: (self) => self.isActive && setActive(section), */
          toggleClass: styles.enable,
          /* markers: {
            indent: 150 * i,
            startColor: "red",
            endColor: "red",
          }, */
          id: i,
        },
      });

      const fadeStart = (index, section) => {
        const fullHeight = vh(100);
        if (index > 3) {
          return `+=${section.offsetHeight + fullHeight}`;
        }
        return `top`;
      };

      const fadeUp = gsap.utils.toArray(section.querySelectorAll(".gsap-fade"));
      gsap.set(fadeUp, { opacity: 0, translateY: 100, ease: "power1.inOut" });

      gsap.to(fadeUp, {
        opacity: 1,
        translateY: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: () => `${fadeStart(i, section)} top+=50%`,
          end: () => `${calcBottom()}`,
          toggleActions: "play none none none",
          /* markers: {
            indent: 150 * i,
            startColor: "red",
            endColor: "red",
          },
          id: i, */
        },
      });

      // animate numbers
      // TODO: imp in scrolltrigger
      const numberCount = gsap.utils.toArray(
        section.querySelectorAll('[class*="front-page_numbers"]')
      );

      gsap.from(numberCount, {
        textContent: 0, // start from 0
        duration: 5,
        ease: "none",
        snap: { textContent: 1 }, // increment by 1,
        scrollTrigger: {
          trigger: section,
          start: () => `top${calcTop(i, section)} top`,
          end: () => `${calcBottom()}`,
        },
      });
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
        pinSpacer: false,
        /* markers: true, */
      },
    });

    // on load
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
  });

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header menuItems={primaryMenuItems.nodes} page={page} frontPage />

      <Container
        component={"main"}
        className={"main"}
        maw={"unset"}
        w="100%"
        p={0}
      >
        <Container
          id="landing"
          component={"section"}
          h="100dvh"
          w="100%"
          maw={"unset"}
          className={`${styles.section} ${styles["section-start"]}`}
          style={{
            position: "relative",
            backgroundSize: "cover",
            display: "flex",
          }}
        >
          <Container
            w="100%"
            p={0}
            position={"relative"}
            className={styles["section-content"]}
            style={{ zIndex: 10, marginTop: "auto" }}
          >
            <Stack>
              <Title
                maw={"40rem"}
                fw={600}
                className={`${styles.title} gsap-initial`}
              >
                Shaping the future of Market Access
              </Title>
              <Text
                maw={"18rem"}
                size="1.2rem"
                lh={"1.7rem"}
                fw="500"
                className={"gsap-initial"}
              >
                Lorem ipsum dolor sit amet con sectetur adipiscing elit sed do
                eiusm od tempor incididunt.
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
          </Container>
          <div className={styles.landing}>
            <Landing2 />
          </div>
        </Container>
        <Container
          id="services"
          component={"section"}
          w="100%"
          maw={"unset"}
          bg={"var(--mantine-color-brand-1)"}
          className={`${styles.section} ${styles["section-start"]}`}
        >
          <Container
            maw={"1440px!important"}
            w="100%"
            p={0}
            className={`${styles["section-content"]}`}
          >
            <Stack>
              <Eyebrow gsapName={"gsap-fade"} label={"services"} variant={1} />
              <Title order={2} mb="2rem" className={"gsap-fade"}>
                Lorem ipsum dolor sit amet consectetur sed interdum semper sed
                gravida urna.
              </Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <ServicesCard
                    gsapName={"gsap-fade"}
                    icon={marketAccessIcon}
                    iconSize={"3rem"}
                    title={"Market Access Consulting"}
                    items={[
                      "Commercial strategic planning",
                      "Market research & insights",
                      "Policy impact & forecasting",
                      "Reimbursement, pricing, & contracting",
                      "HEOR",
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <ServicesCard
                    gsapName={"gsap-fade"}
                    icon={valueIcon}
                    iconSize={"4.5rem"}
                    title={"value communications"}
                    items={[
                      "Payer marketing",
                      "Pull-through",
                      "HEOR",
                      "Hub communications",
                      "Market research",
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <ServicesCard
                    gsapName={"gsap-fade"}
                    icon={patientIcon}
                    iconSize={"4.5rem"}
                    title={"patient access & affordability"}
                    items={[
                      "Pricing, reimbursement, & policy strategy",
                      "Vendor selection & contracting",
                      "Access & reimbursement communications",
                      "Program & channel design",
                      "Market research & insights",
                    ]}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Container>

        <Container
          id="who-we-are"
          component={"section"}
          w="100%"
          maw={"unset"}
          mih={"100vh"}
          bg={"var(--mantine-color-brand-0)"}
          className={`${styles.section}`}
        >
          <Container
            maw={"1440px"}
            style={{
              position: "absolute",
              zIndex: 99999,
              bg: "red",
              width: "100%",
              height: "300vh",
              left: "50%",
              transform: "translateX(-50%)",
              overflowX: "hidden",
            }}
          >
            <Container maw={"unset"} w="100%" h={"100vh"}>
              <Grid
                style={{
                  width: "100%",
                }}
              >
                <Grid.Col span={6}></Grid.Col>
                <Grid.Col span={6}>
                  {/* <Stack>
                    <Title c="white" size="1.9rem" maw={"20rem"}>
                      A strong foundation built in science1
                    </Title>
                    <Text
                      c="white"
                      size={"1.1rem"}
                      lh={"1.5rem"}
                      maw={"23rem"}
                    >
                      We noticed there was a blank spot in medical
                      communications around the value narrative.
                    </Text>
                    <Text
                      c="white"
                      size={"1.1rem"}
                      lh={"1.5rem"}
                      maw={"24rem"}
                    >
                      Joining with market access leaders, we sought to bring
                      together a curated group of people to meet the needs of
                      the evolving market access landscape.
                    </Text>
                  </Stack> */}
                </Grid.Col>
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
                gutter={"10rem"}
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
                gutter={"10rem"}
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
            bg={"transparent"}
            className={`${styles["section-start"]} ${styles.black}`}
          >
            <PinnedSection />
          </Container>
        </Container>

        <Container
          id="the-nexus-advantage"
          component={"section"}
          w="100%"
          py={"4rem"}
          maw={"unset"}
          bg={"brand.5"}
          className={`${styles.section} ${styles["section-start"]}`}
        >
          <Container
            maw={"!important"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Grid cols={2} justify="center" align="center">
              <Grid.Col span={{ base: 12, lg: 5 }}>
                <Container maw={"unset"} p={0} w={"100%"}>
                  <QuoteCarousel />
                </Container>
                <Space hiddenFrom="lg" h="5rem" />
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
                  <Grid gutter={{ base: "1rem", md: "3rem" }}>
                    <Grid.Col span={6}>
                      <Stack gap="0.25rem">
                        <Text size={"2.5rem"} fw="700" c="brand.2">
                          <span className={styles.numbers}>50</span>
                          <sup
                            style={{
                              fontSize: "2rem",
                              paddingLeft: "0.25rem",
                            }}
                          >
                            +
                          </sup>
                        </Text>
                        <Text lh="1rem">
                          Lorem ipsum dolor sit amet consecte
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack gap="0.25rem">
                        <Text size={"2.5rem"} fw="700" c="brand.2">
                          <span className={styles.numbers}>25</span>
                        </Text>
                        <Text lh="1rem">
                          Lorem ipsum dolor sit amet consecte
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack gap="0.25rem">
                        <Text size={"2.5rem"} fw="700" c="brand.2">
                          <span className={styles.numbers}>57</span>
                          <span
                            style={{
                              fontSize: "1.5rem",
                              paddingLeft: "0.5rem",
                            }}
                          >
                            %
                          </span>
                        </Text>
                        <Text lh="1rem">
                          Lorem ipsum dolor sit amet consecte
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack gap="0.25rem">
                        <Text size={"2.5rem"} fw="700" c="brand.2">
                          <span className={styles.numbers}>11</span>
                          <sup
                            style={{
                              fontSize: "2rem",
                              paddingLeft: "0.25rem",
                            }}
                          >
                            +
                          </sup>
                        </Text>
                        <Text lh="1rem">
                          Lorem ipsum dolor sit amet consecte
                        </Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Container>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>

        <Container
          id="thought-leadership"
          component={"section"}
          pb={0}
          w="100%"
          maw={"unset"}
          className={`${styles.section} ${styles["section-start"]}`}
        >
          <Container
            maw={"1440px!important"}
            w="100%"
            p={0}
            className={styles["section-content"]}
          >
            <Stack gap={"xs"}>
              <Eyebrow
                gsapName={"gsap-fade"}
                label={"thought leadership"}
                variant={3}
              />
              <Grid gutter={"xs"}>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                  <Stack>
                    <Title size="1.9rem" maw={"20rem"} className={"gsap-fade"}>
                      What’s Happening at Nexus Health
                    </Title>
                    <Text
                      size="0.83rem"
                      lh={"1.25rem"}
                      fw="500"
                      maw={"20rem"}
                      className={"gsap-fade"}
                    >
                      Lorem ipsum dolor sit amet consectetur. Nulla ultrices
                      feugiat et nullam. Dolor libero commodo lectus aliquet.
                      Nulla venenatis at nulla mi at.
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
                        <Text fw="700" size="0.84rem" mb="0.25rem">
                          Discover More
                        </Text>
                        <div
                          className={`${styles["bar-link"]} ${styles["bar-link-active"]}`}
                        />
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
                      footer={
                        announcement[0].publicationMeta.announcementLocation
                      }
                      link={"/"}
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
                      link={"/"}
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
                      link={"/"}
                    />
                  ) : null}
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Container>
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
      content
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
