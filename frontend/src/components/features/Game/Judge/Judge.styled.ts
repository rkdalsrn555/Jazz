import { color } from 'framer-motion';
import styled from '@emotion/styled';

export const JudgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1134px;
  height: 708px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 30px 7px #fff;

  & p {
    font-size: 200px;
    font-weight: 900;
    color: #fff;
  }
`;

export const AwardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  & .award {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    & p {
      font-size: 100px;
    }
  }

  & .content {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
`;

export const AcceptButton = styled.button`
  width: 370px;
  height: 70px;
  padding: 18px 32px;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #ffe259 15%, #ffa751 85%);
`;
