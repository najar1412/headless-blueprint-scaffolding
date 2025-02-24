import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    const speed = .15;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      cursorDotX += mouseX - cursorDotX;
      cursorDotY += mouseY - cursorDotY;

      gsap.set(cursorRef.current, { x: cursorX, y: cursorY });
      gsap.set(cursorDotRef.current, { x: cursorDotX, y: cursorDotY });
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* const buttons = document.querySelectorAll("button");
    const paragraphs = document.querySelectorAll("p");
    const anchors = document.querySelectorAll("a");

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(cursorRef.current, {
          scale: 3,
          duration: 0.1,
          ease: "bounce.in",
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.1,
          ease: "bounce.out",
        });
      });
    });

    paragraphs.forEach((p) => {
      p.addEventListener("mouseenter", () => {
        gsap.to(cursorRef.current, {
          scale: 2,
          duration: 0.1,
          ease: "bounce.in",
        });
      });
      p.addEventListener("mouseleave", () => {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.1,
          ease: "bounce.out",
        });
      });
    });

    anchors.forEach((a) => {
      a.addEventListener("mouseenter", () => {
        gsap.to(cursorRef.current, {
          scale: 4,
          duration: 0.1,
          ease: "bounce.in",
        });
      });
      a.addEventListener("mouseleave", () => {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.1,
          ease: "bounce.out",
        });
      });
    }); */

    return () => {
      // Clean up event listeners
      /* buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", null);
        btn.removeEventListener("mouseleave", null);
      });
      paragraphs.forEach((p) => {
        p.removeEventListener("mouseenter", null);
        p.removeEventListener("mouseleave", null);
      });
      anchors.forEach((a) => {
        a.removeEventListener("mouseenter", null);
        a.removeEventListener("mouseleave", null);
      }); */
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id={styles.cursor}>
        <div className={styles["cursor-bg"]}></div>
      </div>
      <div ref={cursorDotRef} className={styles["cursor-dot"]}></div>
    </>
  );
};

export default CustomCursor;
