import styled from '@emotion/styled';

export const ButtonContainer = styled.button<{ kind: string }>`
  width: 200px;
  height: 200px;
  border-radius: 24px;
  border: none;
  font-size: 30px;
  color: #fff;
  font-weight: 600;
  background-color: ${(props) => (props.kind === 'hint' ? '#FFAEAE' : '')};
  background-color: ${(props) =>
    props.kind === 'answerCheck' ? '#638EF3' : ''};
  background-color: ${(props) => (props.kind === 'next' ? '#638EF3' : '')};
  background-color: ${(props) => (props.kind === 'stop' ? '#B0B0B0' : '')};
  background-color: ${(props) => (props.kind === 'favorite' ? '#FF9D57' : '')};
`;

export const ButtonTitle = styled.p`
  padding: 0;
  margin: 0;
  margin-top: 10px;
`;
