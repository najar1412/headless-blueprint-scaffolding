import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./Box.module.css";

export const Box = () => {
  const container = useRef();

  useGSAP(() => {
    // gsap code here...
    gsap.to(container.current, { x: 260, yoyo: true, repeat: -1 }); // <-- automatically reverted
  }); // <-- scope is for selector text (optional)

  return <div ref={container} className={styles.box}></div>;
};
