import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";

import { useGLTF, Preload, OrbitControls } from "@react-three/drei/native";
import { Suspense } from "react";

// import { Asset, useAssets } from "expo-asset";
// const [assets, error] = useAssets([
//   require("../../assets/3d-assets/saumurai.glb"),
// ]);
import { Asset } from "expo-asset";
import { Text, View } from "react-native";
import Samurai from "@/components/samurai";

const samuraiAsset = Asset.fromModule(
  require("../../assets/3d-assets/saumurai-optimized.glb")
).uri;

import useControls from "r3f-native-orbitcontrols";

//  <hemisphereLight
//  intensity={0.6}
//  position={[0, 5, 5]}
//  groundColor="black"
// />

// <pointLight
//  intensity={0.8}
//  position={[10, 10, 10]}
//  decay={2}
//  distance={50}
// />

// <spotLight
//  position={[0, 10, 10]}
//  angle={0.3}
//  penumbra={0.7}
//  intensity={500}
//  castShadow
//  shadow-mapSize-width={1024}
//  shadow-mapSize-height={1024}
//  shadow-radius={4}
// />

const SamuraiModel = () => {
  return (
    <mesh>
      <directionalLight
        position={[1, 0, 0]}
        intensity={1}
        args={["white", 5]}
      />
      <directionalLight
        position={[-1, 0, 0]}
        intensity={1}
        args={["white", 5]}
      />
      <directionalLight
        position={[0, 1, 0]}
        intensity={1}
        args={["white", 5]}
      />
      <directionalLight
        position={[0, -1, 0]}
        intensity={1}
        args={["white", 5]}
      />
      <directionalLight
        position={[0, 0, 1]}
        intensity={1}
        args={["white", 5]}
      />
      <directionalLight
        position={[0, 0, -1]}
        intensity={1}
        args={["white", 5]}
      />
      <ambientLight intensity={0.3} />
      <ambientLight intensity={0.3} />

      <Samurai />
    </mesh>
  );
};

export default function Profile() {
  const [OrbitControls, events] = useControls();
  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas
        frameloop="demand"
        shadows
        camera={{
          position: [20, 3, 5],
          fov: 25,
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Suspense fallback={null}>
          <SamuraiModel />
        </Suspense>
        <Preload all />
      </Canvas>
    </View>
  );
}
