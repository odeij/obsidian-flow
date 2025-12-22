import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseRef {
  x: number;
  y: number;
}

function NeuralNodes({ count = 80, mouse }: { count?: number; mouse: React.MutableRefObject<MouseRef> }) {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, velocities, connections] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const conn: number[][] = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    // Create connection pairs
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (Math.random() > 0.97) {
          conn.push([i, j]);
        }
      }
    }

    return [pos, vel, conn];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Apply velocity
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse repulsion
      const mouseX = mouse.current.x * viewport.width * 0.5;
      const mouseY = mouse.current.y * viewport.height * 0.5;
      const dx = mouseX - posArray[i3];
      const dy = mouseY - posArray[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2.5) {
        const force = (2.5 - dist) * 0.015;
        posArray[i3] -= dx * force;
        posArray[i3 + 1] -= dy * force;
      }

      // Gentle wave motion
      posArray[i3 + 1] += Math.sin(time * 0.3 + posArray[i3] * 0.2) * 0.003;
      posArray[i3] += Math.cos(time * 0.2 + posArray[i3 + 1] * 0.15) * 0.002;

      // Boundary soft bounce
      if (Math.abs(posArray[i3]) > 6) velocities[i3] *= -0.9;
      if (Math.abs(posArray[i3 + 1]) > 4) velocities[i3 + 1] *= -0.9;
      if (Math.abs(posArray[i3 + 2]) > 2) velocities[i3 + 2] *= -0.9;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a855f7"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NeuralConnections({ nodeCount = 80, mouse }: { nodeCount?: number; mouse: React.MutableRefObject<MouseRef> }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const connectionCount = 60;
    const pos = new Float32Array(connectionCount * 6);
    const origPos = new Float32Array(connectionCount * 6);

    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;
      const x1 = (Math.random() - 0.5) * 10;
      const y1 = (Math.random() - 0.5) * 6;
      const z1 = (Math.random() - 0.5) * 3;
      
      pos[i6] = x1;
      pos[i6 + 1] = y1;
      pos[i6 + 2] = z1;
      pos[i6 + 3] = x1 + (Math.random() - 0.5) * 3;
      pos[i6 + 4] = y1 + (Math.random() - 0.5) * 2;
      pos[i6 + 5] = z1 + (Math.random() - 0.5) * 1;

      origPos[i6] = pos[i6];
      origPos[i6 + 1] = pos[i6 + 1];
      origPos[i6 + 2] = pos[i6 + 2];
      origPos[i6 + 3] = pos[i6 + 3];
      origPos[i6 + 4] = pos[i6 + 4];
      origPos[i6 + 5] = pos[i6 + 5];
    }

    return [pos, origPos];
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;

    const posArray = linesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < posArray.length / 6; i++) {
      const i6 = i * 6;

      // Mouse influence on lines
      const mouseX = mouse.current.x * viewport.width * 0.5;
      const mouseY = mouse.current.y * viewport.height * 0.5;

      for (let j = 0; j < 2; j++) {
        const offset = j * 3;
        const dx = mouseX - posArray[i6 + offset];
        const dy = mouseY - posArray[i6 + offset + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 3) {
          const force = (3 - dist) * 0.01;
          posArray[i6 + offset] -= dx * force;
          posArray[i6 + offset + 1] -= dy * force;
        } else {
          // Return to original position
          posArray[i6 + offset] += (originalPositions[i6 + offset] - posArray[i6 + offset]) * 0.02;
          posArray[i6 + offset + 1] += (originalPositions[i6 + offset + 1] - posArray[i6 + offset + 1]) * 0.02;
        }

        // Subtle animation
        posArray[i6 + offset + 1] += Math.sin(time * 0.5 + i * 0.3) * 0.002;
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.rotation.z = Math.sin(time * 0.1) * 0.02;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function PulsingCore({ mouse }: { mouse: React.MutableRefObject<MouseRef> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Pulse effect
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);

    // Follow mouse gently
    const targetX = mouse.current.x * viewport.width * 0.1;
    const targetY = mouse.current.y * viewport.height * 0.1;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
    </mesh>
  );
}

export default function HeroNeuralNetwork() {
  const mouse = useRef<MouseRef>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
        <NeuralNodes count={100} mouse={mouse} />
        <NeuralConnections nodeCount={100} mouse={mouse} />
        <PulsingCore mouse={mouse} />
      </Canvas>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/50 pointer-events-none" />
    </div>
  );
}
