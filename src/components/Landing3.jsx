import { useRef, useState, useMemo } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import vertexShader from "raw-loader!glslify-loader!./glsl/vertexShader3.glsl?raw";
import fragmentShader from "raw-loader!glslify-loader!./glsl/fragmentShader3.glsl?raw";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";

export const Landing = () => {
  const Blob = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const hover = useRef(false);

    const uniforms = useMemo(
      () => ({
        u_intensity: {
          value: 0.5,
        },
        u_time: {
          value: 10.0,
        },
        u_colorA: { value: new Color("#FFFFFF") },
        u_colorB: { value: new Color("#BCDC49") },
      }),
      []
    );

    useFrame((state) => {
      const { clock } = state;
      mesh.current.material.uniforms.u_time.value =
        10.0 + (clock.getElapsedTime() / 10);

      /* mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 0.5 : 0.5,
        0.02
      ); */
    });

    return (
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={10}
        /* scale={1.5} */
        // onPointerOver={() => (hover.current = true)}
        // onPointerOut={() => (hover.current = false)}
      >
        {/* <icosahedronGeometry args={[2, 20]} /> */}
        <planeGeometry args={[5, 5, 400, 400]} />
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
        position: [0, 10, 2],
        rotation: [MathUtils.degToRad(-85), 0, 0],
        zoom: 80,
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <Blob />
    </Canvas>
  );
};
