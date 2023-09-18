import styled from '@emotion/styled';

export const QuizContainer = styled.div`
  position: relative;
  width: 748px;
  height: auto;
  padding-top: 1px;
`;

export const QuizResultIcon = styled.img`
  position: absolute;
  top: 50px;
  left: 8px;
  right: 0;
`;

export const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  margin-top: 350px;
  margin-left: auto;
  margin-right: auto;
  width: 578px;
  height: 656px;
  border-radius: 21px;
  background-color: #fff;
`;

export const AwardTitle = styled.h2`
  font-size: 40px;
  color: #60cfff;
  margin-top: 15px;
  margin-bottom: 11px;
`;

export const AwardBox = styled.ul`
  text-align: center;
  width: 375px;
  padding: 10px 0 10px 0;
  border-radius: 32px;
  background-color: #c2fdff;
  margin-bottom: 10px;
`;

export const AwardBoxLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 50px;
  font-weight: 700;
  color: #228aed;
  list-style: none;
`;

export const OkBtn = styled.button`
  position: relative;
  width: 260px;
  height: 106px;
  margin: 30px auto;
  border-radius: 33px;
  border: none;
`;

export const OkBtnTitle = styled.p`
  position: relative;
  margin: 0 auto;
  color: #fff;
  font-weight: 700;
  font-size: 40px;
  z-index: 99;
`;

export const OkBtnBgImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;
