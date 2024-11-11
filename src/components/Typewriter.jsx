"use client"
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Typewriter.module.css'

/**
 * A typewriter effect component that types out and erases text in a loop
 * @param {Object} props
 * @param {string} props.text - The text to be typed out
 * @param {number} [props.delay=1000] - Delay in milliseconds before starting the typing animation again
 * @param {number} [props.eraseDelay=5000] - Delay in milliseconds before starting to erase the text
 * @param {number} [props.typingSpeed=50] - Speed of typing animation in milliseconds per character
 * @param {number} [props.erasingSpeed=30] - Speed of erasing animation in milliseconds per character
 * @returns {JSX.Element} A div containing the animated text with a cursor
 */
const Typewriter = ({
  text,
  delay = 1000,
  eraseDelay = 5000,
  typingSpeed = 120,
  erasingSpeed = 60,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({ repeat: -1 });
    tlRef.current = tl;
    
    // Create a proxy object to track progress
    const proxy = { progress: 0 };
    
    // Type out animation
    tl.to(proxy, {
      progress: text.length,
      duration: text.length * (typingSpeed / 1000),
      ease: "none",
      onUpdate: () => {
        const currentIndex = Math.floor(proxy.progress);
        setDisplayedText(text.slice(0, currentIndex));
      }
    })
    
    // Pause at the end
    .to(proxy, { duration: eraseDelay / 1000 })
    
    // Erase animation
    .to(proxy, {
      progress: 0,
      duration: text.length * (erasingSpeed / 1000),
      ease: "none",
      onUpdate: () => {
        const currentIndex = Math.floor(proxy.progress);
        setDisplayedText(text.slice(0, currentIndex));
      }
    })
    
    // Pause before repeating
    .to(proxy, { duration: delay / 1000 });

    return () => {
      tl.kill();
    };
  }, [text, delay, eraseDelay, typingSpeed, erasingSpeed]);

  // Add cursor animation
 

  return (
    <span>
      <span ref={textRef} >{displayedText}</span>
      <span ref={cursorRef} className={styles.cursor}>|</span>
    </span>
  );
};

export default Typewriter;