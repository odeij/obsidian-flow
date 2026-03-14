import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

interface MouseRef {
  x: number;
  y: number;
}

const POINT_COUNT = 500;
const CONNECTION_DISTANCE = 1.2;
const MAX_CONNECTIONS = 600;

// Generate points in an abstract sphere/cube hybrid shape
function generatePointCloud(): Float32Array {
  const positions = new Float32Array(POINT_COUNT * 3);
  
  for (let i = 0; i < POINT_COUNT; i++) {
    // Mix between sphere and cube distribution
    const t = Math.random();
    let x, y, z;
    
    if (t < 0.6) {
      // Sphere distribution (denser in center)
      const radius = Math.pow(Math.random(), 0.5) * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);
    } else {
      // Cube distribution (sparse edges)
      x = (Math.random() - 0.5) * 5;
      y = (Math.random() - 0.5) * 5;
      z = (Math.random() - 0.5) * 5;
      
      // Push to edges occasionally for asymmetry
      if (Math.random() > 0.7) {
        const axis = Math.floor(Math.random() * 3);
        if (axis === 0) x = (Math.random() > 0.5 ? 1 : -1) * 2.5;
        else if (axis === 1) y = (Math.random() > 0.5 ? 1 : -1) * 2.5;
        else z = (Math.random() > 0.5 ? 1 : -1) * 2.5;
      }
    }
    
    // Add slight asymmetry
    x += Math.sin(i * 0.1) * 0.2;
    y += Math.cos(i * 0.1) * 0.15;
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  
  return positions;
}

function PointCloudCore({ 
  mouse, 
  scrollProgress 
}: { 
  mouse: React.MutableRefObject<MouseRef>;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const { positions, linePositions, lineColors, originalPositions } = useMemo(() => {
    const pos = generatePointCloud();
    const orig = new Float32Array(pos);
    const linePos = new Float32Array(MAX_CONNECTIONS * 6);
    const lineCol = new Float32Array(MAX_CONNECTIONS * 6);
    
    return {
      positions: pos,
      originalPositions: orig,
      linePositions: linePos,
      lineColors: lineCol
    };
  }, []);
  
  // Store Vector3 versions for distance calculations
  const positionVectors = useMemo(() => {
    const vectors: THREE.Vector3[] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      vectors.push(new THREE.Vector3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      ));
    }
    return vectors;
  }, [positions]);
  
  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current || !linesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const scroll = scrollProgress.current;
    
    // Slow Y-axis rotation (base + scroll-reactive)
    const baseRotationSpeed = 0.08;
    const scrollBoost = scroll * 0.3;
    groupRef.current.rotation.y += (baseRotationSpeed + scrollBoost) * 0.016;
    
    // Subtle breathing scale (±2%)
    const breathe = 1 + Math.sin(time * 0.5) * 0.02;
    groupRef.current.scale.setScalar(breathe);
    
    // Update point positions with subtle movement
    const pointsPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < POINT_COUNT; i++) {
      const idx = i * 3;
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];
      
      // Subtle wave motion
      const wave = Math.sin(time * 0.3 + i * 0.02) * 0.05;
      
      pointsPositions[idx] = origX + wave;
      pointsPositions[idx + 1] = origY + Math.cos(time * 0.25 + i * 0.015) * 0.04;
      pointsPositions[idx + 2] = origZ + Math.sin(time * 0.2 + i * 0.01) * 0.03;
      
      // Update vector for line calculations
      positionVectors[i].set(
        pointsPositions[idx],
        pointsPositions[idx + 1],
        pointsPositions[idx + 2]
      );
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update sparse connections
    const linesGeometry = linesRef.current.geometry;
    const linePositionsAttr = linesGeometry.attributes.position.array as Float32Array;
    const lineColorsAttr = linesGeometry.attributes.color.array as Float32Array;
    
    let lineIndex = 0;
    const maxLines = MAX_CONNECTIONS;
    
    // Only check subset for sparse connections
    for (let i = 0; i < POINT_COUNT && lineIndex < maxLines; i += 3) {
      for (let j = i + 1; j < POINT_COUNT && lineIndex < maxLines; j += 2) {
        const dist = positionVectors[i].distanceTo(positionVectors[j]);
        
        if (dist < CONNECTION_DISTANCE && dist > 0.3) {
          const idx = lineIndex * 6;
          
          linePositionsAttr[idx] = positionVectors[i].x;
          linePositionsAttr[idx + 1] = positionVectors[i].y;
          linePositionsAttr[idx + 2] = positionVectors[i].z;
          linePositionsAttr[idx + 3] = positionVectors[j].x;
          linePositionsAttr[idx + 4] = positionVectors[j].y;
          linePositionsAttr[idx + 5] = positionVectors[j].z;
          
          // Faint emissive white/gray lines
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.4;
          
          lineColorsAttr[idx] = 0.4;
          lineColorsAttr[idx + 1] = 0.5;
          lineColorsAttr[idx + 2] = 0.6;
          lineColorsAttr[idx + 3] = 0.4 * alpha;
          lineColorsAttr[idx + 4] = 0.5 * alpha;
          lineColorsAttr[idx + 5] = 0.6 * alpha;
          
          lineIndex++;
        }
      }
    }
    
    // Clear remaining
    for (let i = lineIndex; i < maxLines; i++) {
      const idx = i * 6;
      for (let j = 0; j < 6; j++) {
        linePositionsAttr[idx + j] = 0;
        lineColorsAttr[idx + j] = 0;
      }
    }
    
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;
    linesGeometry.setDrawRange(0, lineIndex * 2);
    
    // Core pulse
    if (coreRef.current) {
      const coreScale = 0.3 + Math.sin(time * 0.8) * 0.05;
      coreRef.current.scale.setScalar(coreScale);
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Dark matte core shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial 
          color="#e4e4e7"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Connection lines - sparse, faint emissive */}
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
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Points - off-white/soft gray */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={POINT_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#64748b"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function NeuralPointCloud() {
  const mouse = useRef<MouseRef>({ x: 0, y: 0 });
  const scrollProgress = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      scrollProgress.current = v;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

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
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <PointCloudCore mouse={mouse} scrollProgress={scrollProgress} />
      </Canvas>

      {/* Clean light overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 pointer-events-none" />
    </div>
  );
}
