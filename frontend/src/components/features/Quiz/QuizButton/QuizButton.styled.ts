import styled from '@emotion/styled';

export const ButtonContainer = styled.button<{ kind: string }>`
  width: 150px;
  height: 150px;
  border-radius: 24px;
  border: none;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  background-color: ${(props) => (props.kind === 'hint' ? '#FFAEAE' : '')};
  background-color: ${(props) =>
    props.kind === 'answerCheck' ? '#638EF3' : ''};
  background-color: ${(props) => (props.kind === 'next' ? '#638EF3' : '')};
  background-color: ${(props) => (props.kind === 'stop' ? '#B0B0B0' : '')};
  background-color: ${(props) => (props.kind === 'favorite' ? '#FF9D57' : '')};
  background-color: ${(props) => (props.kind === 'result' ? '#F36397' : '')};
`;

export const ButtonTitle = styled.p`
  padding: 0;
  margin: 0;
  margin-top: 10px;
`;
