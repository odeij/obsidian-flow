import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseRef {
  x: number;
  y: number;
}

// Shared node positions that both components use
const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 2.8;

function useSharedNodes(mouse: React.MutableRefObject<MouseRef>) {
  const { viewport } = useThree();
  
  const nodeData = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    const originalPositions: THREE.Vector3[] = [];
    
    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4
      );
      positions.push(pos.clone());
      originalPositions.push(pos.clone());
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.002
      ));
    }
    
    return { positions, velocities, originalPositions };
  }, []);
  
  const updateNodes = (time: number) => {
    const mouseX = mouse.current.x * viewport.width * 0.5;
    const mouseY = mouse.current.y * viewport.height * 0.5;
    
    nodeData.positions.forEach((pos, i) => {
      const vel = nodeData.velocities[i];
      const orig = nodeData.originalPositions[i];
      
      // Apply velocity
      pos.add(vel);
      
      // Mouse repulsion
      const dx = pos.x - mouseX;
      const dy = pos.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3 && dist > 0.1) {
        const force = (3 - dist) * 0.02;
        pos.x += (dx / dist) * force;
        pos.y += (dy / dist) * force;
      }
      
      // Return to original position
      pos.x += (orig.x - pos.x) * 0.01;
      pos.y += (orig.y - pos.y) * 0.01;
      pos.z += (orig.z - pos.z) * 0.01;
      
      // Gentle wave motion
      pos.y += Math.sin(time * 0.4 + i * 0.2) * 0.003;
      pos.x += Math.cos(time * 0.3 + i * 0.15) * 0.002;
      
      // Boundary bounce
      if (Math.abs(pos.x) > 8) vel.x *= -0.8;
      if (Math.abs(pos.y) > 6) vel.y *= -0.8;
      if (Math.abs(pos.z) > 2.5) vel.z *= -0.8;
    });
  };
  
  return { nodeData, updateNodes };
}

function NeuralNetwork({ mouse }: { mouse: React.MutableRefObject<MouseRef> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  
  // Create node data
  const { positions, velocities, originalPositions, positionsArray, linePositions, lineColors } = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    const vel: THREE.Vector3[] = [];
    const orig: THREE.Vector3[] = [];
    const posArr = new Float32Array(NODE_COUNT * 3);
    
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 3;
      
      pos.push(new THREE.Vector3(x, y, z));
      orig.push(new THREE.Vector3(x, y, z));
      vel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.002
      ));
      
      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
    }
    
    // Max possible connections
    const maxConnections = NODE_COUNT * NODE_COUNT;
    const linePos = new Float32Array(maxConnections * 6);
    const lineCol = new Float32Array(maxConnections * 6);
    
    return { 
      positions: pos, 
      velocities: vel, 
      originalPositions: orig, 
      positionsArray: posArr,
      linePositions: linePos,
      lineColors: lineCol
    };
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mouseX = mouse.current.x * viewport.width * 0.5;
    const mouseY = mouse.current.y * viewport.height * 0.5;
    
    const pointsPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update node positions
    positions.forEach((pos, i) => {
      const vel = velocities[i];
      const orig = originalPositions[i];
      
      // Apply velocity
      pos.add(vel);
      
      // Mouse repulsion
      const dx = pos.x - mouseX;
      const dy = pos.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3.5 && dist > 0.1) {
        const force = (3.5 - dist) * 0.025;
        pos.x += (dx / dist) * force;
        pos.y += (dy / dist) * force;
      }
      
      // Return to original position
      pos.x += (orig.x - pos.x) * 0.008;
      pos.y += (orig.y - pos.y) * 0.008;
      pos.z += (orig.z - pos.z) * 0.008;
      
      // Gentle wave motion
      pos.y += Math.sin(time * 0.5 + i * 0.2) * 0.004;
      pos.x += Math.cos(time * 0.4 + i * 0.15) * 0.003;
      
      // Boundary handling
      if (Math.abs(pos.x) > 8) vel.x *= -0.85;
      if (Math.abs(pos.y) > 6) vel.y *= -0.85;
      if (Math.abs(pos.z) > 2) vel.z *= -0.85;
      
      // Update points geometry
      pointsPositions[i * 3] = pos.x;
      pointsPositions[i * 3 + 1] = pos.y;
      pointsPositions[i * 3 + 2] = pos.z;
    });
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update connections - draw lines between nearby nodes
    const linesGeometry = linesRef.current.geometry;
    const linePositionsAttr = linesGeometry.attributes.position.array as Float32Array;
    const lineColorsAttr = linesGeometry.attributes.color.array as Float32Array;
    
    let lineIndex = 0;
    
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        
        if (dist < CONNECTION_DISTANCE) {
          const idx = lineIndex * 6;
          
          // Line start point
          linePositionsAttr[idx] = positions[i].x;
          linePositionsAttr[idx + 1] = positions[i].y;
          linePositionsAttr[idx + 2] = positions[i].z;
          
          // Line end point
          linePositionsAttr[idx + 3] = positions[j].x;
          linePositionsAttr[idx + 4] = positions[j].y;
          linePositionsAttr[idx + 5] = positions[j].z;
          
          // Color based on distance (closer = brighter)
          const alpha = 1 - (dist / CONNECTION_DISTANCE);
          const intensity = 0.3 + alpha * 0.7;
          
          // Purple color with varying intensity
          lineColorsAttr[idx] = 0.58 * intensity;
          lineColorsAttr[idx + 1] = 0.23 * intensity;
          lineColorsAttr[idx + 2] = 0.93 * intensity;
          lineColorsAttr[idx + 3] = 0.58 * intensity;
          lineColorsAttr[idx + 4] = 0.23 * intensity;
          lineColorsAttr[idx + 5] = 0.93 * intensity;
          
          lineIndex++;
        }
      }
    }
    
    // Clear remaining lines
    for (let i = lineIndex; i < linePositions.length / 6; i++) {
      const idx = i * 6;
      linePositionsAttr[idx] = 0;
      linePositionsAttr[idx + 1] = 0;
      linePositionsAttr[idx + 2] = 0;
      linePositionsAttr[idx + 3] = 0;
      linePositionsAttr[idx + 4] = 0;
      linePositionsAttr[idx + 5] = 0;
    }
    
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;
    linesGeometry.setDrawRange(0, lineIndex * 2);
  });
  
  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>
      
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={positionsArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#a855f7"
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function PulsingCore({ mouse }: { mouse: React.MutableRefObject<MouseRef> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Pulse effect
    const scale = 1 + Math.sin(time * 2) * 0.15;
    meshRef.current.scale.setScalar(scale);
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 1.5);
    }

    // Follow mouse gently
    const targetX = mouse.current.x * viewport.width * 0.15;
    const targetY = mouse.current.y * viewport.height * 0.15;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.03;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.03;
    
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
      </mesh>
      
      {/* Core */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.95} />
      </mesh>
    </group>
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
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <NeuralNetwork mouse={mouse} />
        <PulsingCore mouse={mouse} />
      </Canvas>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 pointer-events-none" />
    </div>
  );
}
