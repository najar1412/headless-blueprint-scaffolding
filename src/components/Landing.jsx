
import { Canvas,  useFrame, useThree , extend} from '@react-three/fiber'
import { shaderMaterial} from '@react-three/drei'
import { useMemo, useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'



const PlaneShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    
    void main() {
        // Define colors
      vec3 darkForest = vec3(0.024, 0.169, 0.031);  // #062b08
      vec3 paleLeaf = vec3(0.807, 0.863, 0.792);    // #cedcca
      vec3 oliveDrab = vec3(0.255, 0.376, 0.078);   // #416014
      vec3 mossGreen = vec3(0.451, 0.549, 0.208);   // #738c35
      vec3 emeraldGreen = vec3(0.118, 0.263, 0.027); // #1e4307

      // Adjust UV coordinates to cover the entire screen
      vec2 adjustedUv = vUv * 2.0 - 1.0;

      // Create multiple wavy distortions
      float wave1 = sin(adjustedUv.y * 15.0 + uTime * 1.5) * 0.1;
      float wave2 = cos(adjustedUv.x * 10.0 + uTime * 0.8) * 0.05;
      float wave3 = sin((adjustedUv.x + adjustedUv.y) * 8.0 + uTime * 1.2) * 0.075;
      vec2 distortedUv = adjustedUv + vec2(wave1 + wave2, wave3);
      
      // Time-based color pulsing
      float pulse = (sin(uTime * 0.5) + 1.0) * 0.5;
      
      // Smooth the color gradient with time-based variation
      float gradient = smoothstep(-0.8 + pulse * 0.2, 0.8 - pulse * 0.2, distortedUv.y);
      vec3 color = mix(paleLeaf, mossGreen, gradient);
      color = mix(color, emeraldGreen, gradient * (0.5 + pulse * 0.2));
      
      // Apply additional distortion based on mouse distance
      vec2 adjustedMouse = uMouse * 2.0 - 1.0;
      float dist = length(distortedUv - adjustedMouse);
      color = mix(paleLeaf, color, 1.0 - smoothstep(0.0, 1.0, dist));
      
      // Add subtle time-based color variation
      color += vec3(sin(uTime * 0.2) * 0.05, cos(uTime * 0.15) * 0.05, sin(uTime * 0.1) * 0.05);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

// Extend the PlaneShaderMaterial
extend({ PlaneShaderMaterial })


const FullscreenPlane = () => {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const [mouse, setMouse] = useState([0, 0])
  const { viewport, size } = useThree()

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(1, 1)
  }, [])

  useEffect(() => {
    const updateSize = () => {
      if (meshRef.current) {
        meshRef.current.scale.set(viewport.width, viewport.height, 1)
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [viewport.width, viewport.height])

  const handlePointerMove = useCallback((event) => {
    setMouse([event.uv?.x ?? 0, event.uv?.y ?? 0])
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime()
      materialRef.current.uMouse.set(mouse[0], mouse[1])
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} onPointerMove={handlePointerMove}>
      <planeShaderMaterial ref={materialRef} />
    </mesh>
  )
}




export const Landing = () => {
  
  return (
    <Canvas
    camera={{ position: [0, 0, 1] }}
    gl={{ antialias: true }}
  >
    <FullscreenPlane />
  </Canvas>
  );
};
