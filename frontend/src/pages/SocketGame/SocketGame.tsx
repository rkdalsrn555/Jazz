import React, { Suspense } from 'react';
import GameProfile from 'components/features/Game/GameProfile/GameProfile';
import { CubeGuy } from 'components/features/Game/GameProfile/CubeGuy';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const SocketGame = () => {
  return (
    <div>
      <GameProfile heartCntProps={3} level={15} nickname="재린이"></GameProfile>
    </div>
  );
};

export default SocketGame;
