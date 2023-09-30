import styled from '@emotion/styled';

export const QuizContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 90vh;
  max-height: 530px;
`;

export const QuizResultIcon = styled.img`
  position: absolute;
  top: -37%;
  left: -15%;
  right: 0;
`;

export const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
  margin-top: 10%;
  margin-right: auto;
  width: 100%;
  height: 100%;
  border-radius: 21px;
  background-color: #fff;
`;

export const AwardTitle = styled.h2`
  font-size: 30px;
  font-weight: 800;
  color: #000;
  margin-top: 5%;
  margin-bottom: 11px;
`;

export const AwardBox = styled.ul`
  text-align: center;
  width: 375px;
  padding: 10px 0 10px 0;
  border-radius: 16px;
  background-color: #c2fdff;
  margin-bottom: 10px;
`;

export const AwardBoxLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 40px;
  font-weight: 700;
  color: #228aed;
  list-style: none;
`;

export const OkBtn = styled.button`
  position: relative;
  width: 100%;
  border-radius: 33px;
  border: none;
`;

export const OkBtnTitle = styled.p`
  position: relative;
  margin: 0 auto;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  z-index: 99;
  padding-top: 35%;
`;

export const OkBtnBgImg = styled.img`
  position: absolute;
  top: 17%;
  left: -50%;
  right: 0;
  z-index: 0;
`;
