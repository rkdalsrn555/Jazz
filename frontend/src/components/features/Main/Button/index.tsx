import { Link } from 'react-router-dom';
import * as S from './Button.styled';
import { btnProps } from 'types/types';
import { useState } from 'react';

const MainButton = (feature: btnProps) => {
  let BigButton = false;
  let Battle = false;
  let Shop = false;
  if (feature.title === '금융 배틀' || feature.title === '상점') {
    BigButton = true;
    if (feature.title === '금융 배틀') {
      Battle = true;
    } else {
      Shop = true;
    }
  }
  const [glow, setGlow] = useState({ display: 'none' });

  return (
    <>
      {BigButton ? (
        <S.BigBtnBox
          prop={feature}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.05 }}
          onMouseEnter={() => setGlow({ display: 'flex' })}
          onMouseLeave={() => setGlow({ display: 'none' })}
        >
          {Battle ? (
            <S.AnimDiv id="forAnimation" style={glow}>
              <S.GlowDiv1 id="animationDiv"></S.GlowDiv1>
              <S.GlowDiv2 id="animationDiv"></S.GlowDiv2>
            </S.AnimDiv>
          ) : null}
          <Link
            to={feature.destination}
            style={{ padding: '1rem', width: '100%', height: '100%' }}
          >
            <S.InnerBox>
              {Battle ? (
                <S.BattleText>
                  <S.BattleTitle>{feature.title}</S.BattleTitle>
                  <S.BattleContent>
                    금융 지식에 자신이 있으신가요?
                  </S.BattleContent>
                  <S.BattleContent>
                    배틀을 통해 랭크를 올려보세요!!
                  </S.BattleContent>
                </S.BattleText>
              ) : (
                <S.Text>
                  <S.ShopTitle>{feature.title}</S.ShopTitle>
                </S.Text>
              )}
              {Battle ? (
                <S.BattleImg>{feature.img}</S.BattleImg>
              ) : (
                <S.ShopImg>{feature.img}</S.ShopImg>
              )}
            </S.InnerBox>
          </Link>
        </S.BigBtnBox>
      ) : (
        <S.BtnBox
          prop={feature}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.05 }}
        >
          <Link
            to={feature.destination}
            style={{ padding: '1rem', width: '100%', height: '100%' }}
          >
            <S.InnerBox>
              <S.Text>
                <S.Title>{feature.title}</S.Title>
                <S.Content>{feature.content}</S.Content>
              </S.Text>
              {feature.img}
            </S.InnerBox>
          </Link>
        </S.BtnBox>
      )}
    </>
  );
};

export default MainButton;
