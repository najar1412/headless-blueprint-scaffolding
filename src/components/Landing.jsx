import { useRef, useState, useMemo } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import vertexShader from "raw-loader!glslify-loader!./glsl/vertexShader.glsl?raw";
import fragmentShader from "raw-loader!glslify-loader!./glsl/fragmentShader.glsl?raw";

export const Landing = () => {

  const MovingPlane = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
  
    const uniforms = useMemo(
      () => ({
        u_time: {
          value: 0.0,
        },
        u_colorA: { value: new Color("#FFFFFF") },
        u_colorB: { value: new Color("#BCDC49") },
      }), []
    );
  
    useFrame((state) => {
      const { clock } = state;
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime() / 10.0;
    });
  
    return (
      <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={5}>
        <planeGeometry args={[1, 1, 64, 64]} />
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
    <Canvas camera={{ position: [0, .5, 1], rotation:[MathUtils.degToRad(-45), 0, 0] }}>
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <MovingPlane />
    </Canvas>
  );
};
