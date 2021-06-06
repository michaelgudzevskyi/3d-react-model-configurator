import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { proxy, useSnapshot } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff"
  },
})

function Shoe(props) {
  const [hovered, setHovered] = useState(null)
  const group = useRef() 
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("shoe-draco.glb")
  
  return (
    <group 
      ref={group}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
    >
      <mesh material-color={snap.items.laces} material={materials.laces} geometry={nodes.shoe.geometry} />
      <mesh material-color={snap.items.mesh} material={materials.mesh} geometry={nodes.shoe_1.geometry} />
      <mesh material-color={snap.items.caps} material={materials.caps} geometry={nodes.shoe_2.geometry} />
      <mesh material-color={snap.items.inner} material={materials.inner} geometry={nodes.shoe_3.geometry} />
      <mesh material-color={snap.items.sole} material={materials.sole} geometry={nodes.shoe_4.geometry} />
      <mesh material-color={snap.items.stripes} material={materials.stripes} geometry={nodes.shoe_5.geometry} />
      <mesh material-color={snap.items.band} material={materials.band} geometry={nodes.shoe_6.geometry} />
      <mesh material-color={snap.items.patch} material={materials.patch} geometry={nodes.shoe_7.geometry} />
    </group>
  );
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div className="picker">{snap.current}</div>
  )
}

function App() {
  return (
    <>
      <Picker />
      <Canvas>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Shoe />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
