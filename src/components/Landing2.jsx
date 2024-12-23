import { useRef, useMemo } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Color, MathUtils } from "three";
import { useMediaQuery } from "@mantine/hooks";

import vertexShader from "raw-loader!glslify-loader!./glsl/vertexShader2.glsl?raw";
import fragmentShader from "raw-loader!glslify-loader!./glsl/fragmentShader2.glsl?raw";

export const Landing = () => {
  const matches = useMediaQuery("(min-width: 56.25em)");

  const Blob = () => {
    const mesh = useRef();

    // TODO: imp scale uniform
    const uniforms = useMemo(
      () => ({
        u_intensity: {
          value: 0.6,
        },
        u_time: {
          value: 0.0,
        },
        u_color_lime: {
          value: new Color("rgb(188, 220, 73)"),
        },
      }),
      []
    );

    useFrame((state) => {
      const { clock } = state;
      mesh.current.material.uniforms.u_time.value =
        0.04 * clock.getElapsedTime();
    });

    return (
      <mesh ref={mesh} position={[0, 0, 0]} scale={5} rotation={[0, 0, 0]}>
        <planeGeometry args={[15, 15, 150, 150]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    );
  };

  return (
    <Canvas
      orthographic
      camera={{
        rotation: [MathUtils.degToRad(60), 0, MathUtils.degToRad(-10)],
        position: [10, 1, 10],
        zoom: matches ? 80 : 150,
      }}
    >
      <Blob />
    </Canvas>
  );
};
