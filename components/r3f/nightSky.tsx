"use client";
import React, { MouseEventHandler, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

interface StarProps {
  position: [number, number, number];
}

const Star: React.FC<StarProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.25]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

const CameraControls: React.FC = () => {
  const { camera, mouse } = useThree();

  // useFrame(({ }) => {
  //   camera.rotation.set(mouse.y / 3, -mouse.x / 3, 0);
  // });

  useEffect(() => {
    let rawX: number, rawY: number;
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!rawX) rawX = clientX;
      if (!rawY) rawY = clientY;
      camera.rotation.set((clientY - rawY) / 3000, (rawX - clientX) / 3000, 0);
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return null;
};

const StarField: React.FC<{ className?: string; }> = ({ className }) => {
  const [stars] = React.useState<StarProps[]>(() => {
    const starCount = 100;
    const spread = 200;

    return Array.from({ length: starCount }, (_, index) => {
      const position: [number, number, number] = [
        (Math.random() * spread) * (Math.random() > 0.5 ? 1 : -1),
        (Math.random() * spread) * (Math.random() > 0.5 ? 1 : -1),
        (Math.random() * spread + 100) * -1
      ];
      return { position };
    });
  });

  return (
    <Canvas camera={{ fov: 30 }} className={className}>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {stars.map((star, index) => (
        <Star key={index} position={star.position} />
      ))}
    </Canvas>
  );
};

export default StarField;
