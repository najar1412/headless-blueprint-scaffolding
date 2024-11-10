import "@mantine/core/styles.css";
import "../../faust.config";

import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import { createTheme, MantineProvider } from "@mantine/core";

import { Plus_Jakarta_Sans } from "next/font/google";

import "../styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

const theme = createTheme({
  fontFamily: plusJakartaSans.style.fontFamily,
  black: "#0A404A",
  /** Put your mantine theme override here */
  headings: {
    fontFamily: `${plusJakartaSans.style.fontFamily}`,
  },
  colors: {
    brand: [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
  },
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <MantineProvider theme={theme}>
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </MantineProvider>
  );
}
