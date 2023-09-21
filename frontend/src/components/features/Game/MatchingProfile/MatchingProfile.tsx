import React from 'react';
import * as S from './MatchingProfile.styled';

type OwnProps = {
  level: number;
  nickname: string;
  charactor: string;
  bgColor: string;
};

const MatchingProfile = (props: OwnProps) => {
  const { level, nickname, charactor, bgColor } = props;

  return (
    <S.ProfileContainer>
      <S.UserCharactorContainer bgColor={bgColor}>
        <div className="linearGradient">
          <img src={`/assets/img/modelAsset/${charactor}`} alt="유저캐릭터" />
        </div>
      </S.UserCharactorContainer>
      <S.UserContentContainer>
        <h2>Lv. {level}</h2>
        <h3>{nickname}</h3>
      </S.UserContentContainer>
    </S.ProfileContainer>
  );
};

export default MatchingProfile;
