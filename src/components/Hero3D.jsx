import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, ContactShadows } from '@react-three/drei'

const SPINE_COLORS = ['#7a2e2e', '#8a9b6e', '#b08d57', '#324b6b', '#6b3f57', '#9c4444']

function Book({ position, rotationY, color, height }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = rotationY + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.04
  })
  return (
    <RoundedBox ref={ref} args={[0.34, height, 1.15]} radius={0.02} position={position}>
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.08} />
    </RoundedBox>
  )
}

function BookStack() {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  const books = [1.7, 1.9, 1.5, 2.0, 1.6, 1.8].map((height, i) => ({
    height,
    position: [i * 0.4 - 1, height / 2 - 0.9, 0],
    rotationY: (i % 2 === 0 ? 0.02 : -0.02),
    color: SPINE_COLORS[i % SPINE_COLORS.length],
  }))

  return (
    <group ref={group}>
      {books.map((b, i) => (
        <Book key={i} {...b} />
      ))}
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="h-[320px] md:h-[420px] w-full">
      <Canvas camera={{ position: [3.2, 1.4, 4.2], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 2]} intensity={1.1} color="#f1e9d8" />
        <pointLight position={[-3, 1, -2]} intensity={0.4} color="#b08d57" />
        <Suspense fallback={null}>
          <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
            <BookStack />
          </Float>
        </Suspense>
        <ContactShadows position={[0, -0.95, 0]} opacity={0.45} scale={8} blur={2.4} far={2} />
      </Canvas>
    </div>
  )
}