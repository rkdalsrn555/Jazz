import styled from '@emotion/styled';

export const ProgressBarContainer = styled.div`
  position: relative;
  width: 1454px;
  height: 70px;
  border-radius: 100px;
  background-color: #e1ebfa;
  padding: 10px;
  box-sizing: border-box;
`;

export const ProgressBarGauge = styled.div<{ gaugeStatus: number }>`
  width: ${(props) => props.gaugeStatus + '%'};
  height: 100%;
  background-color: #ffe27a;
  border-radius: 100px;
  box-shadow: 2px 0.5px 2px 0px #d7caab;
`;

export const ProgressBarText = styled.p`
  position: absolute;
  top: 16%;
  left: 20%;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0.5px 0.5px 0px rgba(0, 0, 0, 0.4);
`;
