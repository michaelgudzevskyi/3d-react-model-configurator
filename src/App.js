import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { proxy, useProxy } from 'valtio'

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
    patch: "#ffffff",
  },
})
function Shoe(props) {
  const group = useRef() 
  const { nodes, materials } = useGLTF("shoe-draco.glb")
  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials.laces} geometry={nodes.shoe.geometry} />
      <mesh material={materials.mesh} geometry={nodes.shoe_1.geometry} />
      <mesh material={materials.caps} geometry={nodes.shoe_2.geometry} />
      <mesh material={materials.inner} geometry={nodes.shoe_3.geometry} />
      <mesh material={materials.sole} geometry={nodes.shoe_4.geometry} />
      <mesh material={materials.stripes} geometry={nodes.shoe_5.geometry} />
      <mesh material={materials.band} geometry={nodes.shoe_6.geometry} />
      <mesh material={materials.patch} geometry={nodes.shoe_7.geometry} />
    </group>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
    </Canvas>
  );
}

export default App;
