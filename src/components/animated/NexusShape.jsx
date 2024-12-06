import { useRef } from "react";

export const NexusShape = () => {
  const circle = useRef();
  const pill = useRef();
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 551.17 331.03"
    >
      <path
        ref={circle}
        id="pill"
        fill="none"
        stroke="white"
        d="M.5,165.58c0,1.27.01,2.53.04,3.8,2.04,89.23,75.32,161.18,165.08,161.15l219.99-.05c91.03-.03,165.08-74.06,165.05-165.03,0-1.27-.01-2.53-.04-3.8C548.58,72.43,475.3.47,385.54.5l-219.99.05c-44.1.02-85.55,17.19-116.72,48.35C17.65,80.07.5,121.51.5,165.58Z"
      />
      <circle
        ref={pill}
        id="circle"
        fill="none"
        stroke="white"
        cx="275.58"
        cy="165.51"
        r="160.5"
      />
    </svg>
  );
};
