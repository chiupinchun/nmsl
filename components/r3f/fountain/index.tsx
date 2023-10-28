"use client";
import React, { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import * as Three from 'three';
import { Stats, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Model as Fountain } from './fountainModule';

interface Props { }
const page: FC<Props> = ({ }) => {

  return (
    <>
      <Canvas camera={{ fov: 30, near: 0.1, far: 3000 }} shadows>
        <ambientLight intensity={Math.PI / 2} />
        <Environment preset="park" background blur={1} />
        {process.env.NODE_ENV === 'production' && (
          <>
            <directionalLight
              position={[100, 50, 0]}
              intensity={0.5}
              castShadow
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
            />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} rotation={[-0.1, 0, 0]} />
            <Fountain
              position={[0, 0, 0]}
              rotation={[0.5, 0, 0]}
              scale={[5, 3, 5]}
              castShadow receiveShadow
            />
          </>
        )}
      </Canvas>
    </>
  );
};

export default page;
