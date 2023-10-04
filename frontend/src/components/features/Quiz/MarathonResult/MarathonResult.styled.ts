import styled from '@emotion/styled';

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
  max-height: 600px;
  height: 80%;
  margin: 0 auto;
`;

export const MarathonResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 16px 24px 24px 24px;
  background: #638ef3;
  text-align: center;
  padding: 50px;
`;

export const MarathonResultTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  & p {
    text-align: center;
    color: #ffbd3c;
    font-size: 200px;
    font-weight: 700;
    line-height: 20px;
    z-index: 999;
  }
  & img {
    position: absolute;
  }
`;

export const MarathonResultContent = styled.p`
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  line-height: 20px;
`;
