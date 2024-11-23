import { useRef, useState, useMemo } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import vertexShader from "raw-loader!glslify-loader!./glsl/vertexShader2.glsl?raw";
import fragmentShader from "raw-loader!glslify-loader!./glsl/fragmentShader2.glsl?raw";

export const Landing = () => {
  const Blob = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const hover = useRef(false);

    const uniforms = useMemo(
      () => ({
        u_intensity: {
          value: 0.3,
        },
        u_time: {
          value: 0.0,
        },
      }),
      []
    );

    useFrame((state) => {
      const { clock } = state;
      mesh.current.material.uniforms.u_time.value =
        0.04 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 0.85 : 0.55,
        0.02
      );
    });

    return (
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
        /* scale={1.5} */
        scale={[2, 0.5, 2]}
        rotation= {[MathUtils.degToRad(35), 0, 0]}
        // onPointerOver={() => (hover.current = true)}
        // onPointerOut={() => (hover.current = false)}
      >
        <icosahedronGeometry args={[2, 20]} />
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
      camera={{
        position: [0.0, 0, 5.0],
        rotation: [MathUtils.degToRad(-15), 0, 0],
        zoom: 1.5
      }}
    >
      {/* <ambientLight intensity={Math.PI / 2} />
      <spotLight
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
