import "@mantine/core/styles.css";
import "../faust.config";

import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import { createTheme, MantineProvider } from "@mantine/core";

import "../styles/globals.css";

const theme = createTheme({
  /** Put your mantine theme override here */
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
