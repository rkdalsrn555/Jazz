import React from 'react';
import * as S from './MatchingProfile.styled';

type OwnProps = {
  level: number;
  nickname: string;
  charactorNumber: 1 | 2 | 3 | 4 | 5;
};

const MatchingProfile = (props: OwnProps) => {
  const { level, nickname, charactorNumber } = props;

  const DrawCharactorBg = (charactorNumber: number) => {
    let charactorBg = '';
    switch (charactorNumber) {
      case 1:
        charactorBg = '#BD6598';
        break;
      case 2:
        charactorBg = '#F66639';
        break;
      case 3:
        charactorBg = '#FFC702';
        break;
      case 4:
        charactorBg = '#1FC9F1';
        break;
      case 5:
        charactorBg = '#EA7C71';
        break;
    }
    return charactorBg;
  };

  const DrawCharactor = (charactorNumber: number) => {
    let charactor = '';
    switch (charactorNumber) {
      case 1:
        charactor = 'circle.png';
        break;
      case 2:
        charactor = 'rectangle.png';
        break;
      case 3:
        charactor = 'triangle.png';
        break;
      case 4:
        charactor = 'rock.png';
        break;
      case 5:
        charactor = 'warrier.png';
        break;
    }
    return charactor;
  };

  return (
    <S.ProfileContainer>
      <S.UserCharactorContainer bgColor={DrawCharactorBg(charactorNumber)}>
        <div className="linearGradient">
          <img
            src={`/assets/img/modelAsset/${DrawCharactor(charactorNumber)}`}
            alt="유저캐릭터"
            width={250}
          />
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
