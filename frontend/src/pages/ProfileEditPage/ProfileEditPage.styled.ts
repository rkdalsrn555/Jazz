import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  width: 80%;
  height: 90vh;
  margin: 0 auto;
  text-align: center;

  & h1 {
    font-size: 24px;
    font-weight: 800;
    padding-top: 2%;
    padding-bottom: 2%;
  }
`;

export const CharactorBox = styled.div`
  margin-top: 20px;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.5);
`;

export const ProfileContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 40px;
`;

export const ErrorMessage = styled.div<{ isError?: boolean }>`
  position: absolute;
  left: 120px;
  bottom: -25px;
  color: #ff0f0f;
  font-size: 14px;
  visibility: ${(props) => (props.isError ? 'visible' : 'hidden')};
`;

export const SuccessMessage = styled.div<{ isSuccess?: boolean }>`
  position: absolute;
  left: 15px;
  bottom: -25px;
  color: #54b03c;
  font-size: 14px;
  visibility: ${(props) => (props.isSuccess ? 'visible' : 'hidden')};
`;

export const CompleteMessage = styled.div<{ isComplete?: boolean }>`
  position: absolute;
  left: 115px;
  bottom: -25px;
  color: #54b03c;
  font-size: 14px;
  visibility: ${(props) => (props.isComplete ? 'visible' : 'hidden')};
`;

export const InputContaier = styled.div`
  position: relative;
`;

export const LabelContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  padding-top: 30px;

  & label {
    font-size: 18px;
    font-weight: 800;
    padding-right: 20px;
  }

  & input {
    width: 300px;
    height: 50px;
    border-radius: 8px;
    padding: 10px;
    margin-right: 20px;
  }

  & button {
    cursor: ${(props) => (props.isDisabled ? 'pointer' : '')};
    width: 60px;
    height: 50px;
    background-color: ${(props) => (props.isDisabled ? '#54b03c' : '#999')};
    color: #fff;
    border-radius: 8px;
  }
`;

export const CharactorListContaier = styled.div<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & h1 {
    padding-bottom: 20px;
  }

  & button {
    cursor: ${(props) => (props.isDisabled ? '' : 'pointer')};
    width: 200px;
    padding: 10px 20px;
    height: 50px;
    background-color: ${(props) => (props.isDisabled ? '#999' : '#54b03c')};
    border-radius: 8px;
    margin: 0 auto;
    color: #fff;
  }
`;

export const CharactorListBox = styled.div`
  cursor: pointer;
  width: 70%;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: flex-start;
  gap: 10px;

  & p {
    font-size: 16px;
    font-weight: 800;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
  }
`;

export const selectBox = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 200px;
  box-shadow: 1px 1px 10px 0.5px rgba(0, 0, 0, 0.25) inset;
  border-radius: 16px;
  background-color: ${(props) => (props.isSelected ? '#fff' : '')};
`;
