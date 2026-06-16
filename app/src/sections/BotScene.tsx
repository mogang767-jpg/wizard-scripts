import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Error Fallback ─── */
export function BotFallback() {
  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[#0F0F12]">
      <img
        src="/images/hero-bot-main.png"
        alt="Bot"
        className="w-48 h-48 object-contain animate-bounce-slow"
      />
    </div>
  )
}

/* ─── Bot 1 — «Классический» (yellow) ─── */
function BotClassic({ position, color }: { position: [number, number, number]; color: string }) {
  const group = useRef<THREE.Group>(null)
  const baseY = position[1]
  const speed = 0.5 + Math.random() * 0.5

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * speed) * 0.3
    group.current.rotation.y += 0.005
  })

  const handleClick = () => {
    if (!group.current) return
    const colors = ['#FFD600', '#FF2D6E', '#00E5FF', '#00E676', '#FF9100']
    const newColor = colors[Math.floor(Math.random() * colors.length)]
    group.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        if (child.material.name === 'body') {
          child.material.color.set(newColor)
        }
      }
    })
    const startRot = group.current.rotation.y
    const startTime = performance.now()
    const spin = () => {
      const elapsed = (performance.now() - startTime) / 1000
      if (elapsed < 0.5 && group.current) {
        group.current.rotation.y = startRot + (elapsed / 0.5) * Math.PI * 2
        requestAnimationFrame(spin)
      }
    }
    spin()
  }

  return (
    <group ref={group} position={position} onClick={handleClick}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1.4, 0.8]} />
        <meshStandardMaterial name="body" color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.6]} />
        <meshStandardMaterial name="body" color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.15, 1.15, 0.31]}>
        <boxGeometry args={[0.12, 0.12, 0.05]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0.15, 1.15, 0.31]}>
        <boxGeometry args={[0.12, 0.12, 0.05]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#2E2E34" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#FFD600" emissive="#FFD600" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.65, 0.1, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial name="body" color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0.65, 0.1, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial name="body" color={color} roughness={0.4} />
      </mesh>
    </group>
  )
}

/* ─── Bot 2 — «Modern» (pink, octagonal) ─── */
function BotModern({ position, color }: { position: [number, number, number]; color: string }) {
  const group = useRef<THREE.Group>(null)
  const baseY = position[1]
  const speed = 0.4 + Math.random() * 0.4

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * speed + 1) * 0.25
    group.current.rotation.y += 0.004
  })

  return (
    <group ref={group} position={position}>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.4, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.12, 0.9, 0.32]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0.12, 0.9, 0.32]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3]} />
        <meshStandardMaterial color="#2E2E34" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#FF2D6E" emissive="#FF2D6E" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

/* ─── Bot 3 — «Mini» (cyan, round) ─── */
function BotMini({ position, color }: { position: [number, number, number]; color: string }) {
  const group = useRef<THREE.Group>(null)
  const baseY = position[1]
  const speed = 0.6 + Math.random() * 0.4

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * speed + 2) * 0.2
    group.current.rotation.y -= 0.006
  })

  return (
    <group ref={group} position={position}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.35]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.1, 0.6, 0.28]}>
        <boxGeometry args={[0.06, 0.06, 0.03]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0.6, 0.28]}>
        <boxGeometry args={[0.06, 0.06, 0.03]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.45, 0.32]}>
        <boxGeometry args={[0.2, 0.04, 0.02]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.25]} />
        <meshStandardMaterial color="#2E2E34" />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.035]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

/* ─── Bot 4 — «Tank» (orange, tracked) ─── */
function BotTank({ position, color }: { position: [number, number, number]; color: string }) {
  const group = useRef<THREE.Group>(null)
  const baseY = position[1]
  const speed = 0.35 + Math.random() * 0.3

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * speed + 3) * 0.15
    group.current.rotation.y += 0.003
  })

  return (
    <group ref={group} position={position}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.2, 0.8, 1]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.7, -0.1, 0]}>
        <boxGeometry args={[0.15, 0.6, 1.1]} />
        <meshStandardMaterial color="#2E2E34" roughness={0.6} />
      </mesh>
      <mesh position={[0.7, -0.1, 0]}>
        <boxGeometry args={[0.15, 0.6, 1.1]} />
        <meshStandardMaterial color="#2E2E34" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.7, 0.28]}>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#0F0F12" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#FF9100" emissive="#FF9100" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

/* ─── Scene ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#404040" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#FFD600" />
      <pointLight position={[3, 1, 3]} intensity={0.3} color="#00E5FF" />
      <fog attach="fog" args={['#0F0F12', 8, 25]} />
      <BotClassic position={[0, 0, 0]} color="#FFD600" />
      <BotModern position={[-2.5, 0.2, -1]} color="#FF2D6E" />
      <BotMini position={[2.5, -0.1, -1]} color="#00E5FF" />
      <BotTank position={[0, 0.1, -2.5]} color="#FF9100" />
      <Grid
        position={[0, -1.2, 0]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#2E2E34"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#3E3E44"
        fadeDistance={15}
        fadeStrength={2}
        infiniteGrid
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

/* ─── Main Export with WebGL check ─── */
export default function BotScene() {
  const webglAvailable = (() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
    } catch {
      return false
    }
  })()

  if (!webglAvailable) {
    return <BotFallback />
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Suspense fallback={<BotFallback />}>
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0F0F12')
          }}
          style={{ touchAction: 'none' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
