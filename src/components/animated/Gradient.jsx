import { useRef, useEffect, useState } from "react";

import styles from "./Gradient.module.css";

export const Gradient = () => {
  /* const interactiveElRef = useRef(); */
  /* const [cur, setCur] = useState({ x: 0, y: 0 });
  const [tar, setTar] = useState({ x: 0, y: 0 });
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    setCur({
      x: (cur.x += (tar.x - cur.x) / 20),
      y: (cur.y += (tar.y - cur.y) / 20),
    });
    console.log(cur.x);
    // cur[0] += (tgX - cur[0]) / 20;
    // curY += (tgY - curY) / 20;
    interactiveElRef.current.style.transform = `translate(${Math.round(
      cur.x
    )}px, ${Math.round(cur.y)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  } */

  /* const getMouse = (e) => {
    setTar({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    move();
  }, [cur]); */

  /* useEffect(() => {
    window.addEventListener("mousemove", getMouse);
    return () => window.removeEventListener("mousemove", getMouse);
  }, []); */

  return (
    <div className={styles["gradient-bg"]}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles["gradients-container"]}>
        <div className={styles["g1"]}></div>
        <div className={styles["g2"]}></div>
        <div className={styles["g3"]}></div>
        <div className={styles["g4"]}></div>
        <div className={styles["g5"]}></div>
        {/* <div ref={interactiveElRef} className={styles["interactive"]}></div> */}
      </div>
    </div>
  );
};
