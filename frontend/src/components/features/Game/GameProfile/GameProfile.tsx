import React, { useState, Suspense } from 'react';
import * as S from './GameProfile.styled';
import { ReactComponent as BrokeHeartIcon } from '../../../../assets/svgs/Game/brokeHeart.svg';
import { ReactComponent as FullHeartIcon } from '../../../../assets/svgs/Game/fullHeart.svg';
import { CubeGuy } from 'components/features/Game/GameProfile/CubeGuy';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

type OwnProps = {
  heartCntProps: number;
  level: number;
  nickname: string;
};

const GameProfile = (props: OwnProps) => {
  const { heartCntProps, level, nickname } = props;
  const [heartCnt, setHeartCnt] = useState<number>(heartCntProps);

  return (
    <S.GameProfileContainerOut>
      <Canvas style={{ width: '250px', height: '250px' }}>
        <Suspense fallback={null}>
          <directionalLight intensity={10} />
          <ambientLight intensity={5} />
          <spotLight
            intensity={2}
            angle={2}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <CubeGuy />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
      <h2>Lv. {level}</h2>
      <h3>{nickname}</h3>
      <S.HeartGuageContainer>
        {Array(5)
          .fill(0)
          .map((_, i) =>
            i < heartCnt ? (
              <FullHeartIcon key={i} />
            ) : (
              <BrokeHeartIcon key={i} />
            )
          )}
      </S.HeartGuageContainer>
    </S.GameProfileContainerOut>
  );
};

export default GameProfile;
