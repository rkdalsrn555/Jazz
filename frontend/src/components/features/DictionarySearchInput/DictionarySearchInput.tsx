import * as S from './DictionarySearchInput.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import Magnifier from 'assets/img/magnifier.png';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type ChildProps = {
  onChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  setText: (val: String) => void;
};

const DictionarySearchInput = ({ props }: { props: ChildProps }) => {
  const theme: themeProps = useTheme();
  const navigate = useNavigate();
  const { searchWord } = useParams<{ searchWord: string }>();

  const [word, setWord] = useState('');

  const onChildChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    props.setText(word);
  };

  const handleChildSearch = () => {
    if (word === '') {
      alert('검색어를 입력해주세요');
    } else {
      navigate(`/dictionaryResult/${word}`);
    }
  };

  const handleChildEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChildSearch();
    }
  };

  return (
    <S.InputContainer>
      {searchWord ? (
        <S.Input
          type="text"
          theme={theme}
          defaultValue={searchWord}
          onChange={onChildChangeText}
          onKeyDown={handleChildEnter}
          required
        />
      ) : (
        <S.Input
          type="text"
          theme={theme}
          placeholder="모르는 금융 단어를 검색해보세요"
          onChange={onChildChangeText}
          onKeyDown={handleChildEnter}
          required
        />
      )}
      <S.Img src={Magnifier} onClick={handleChildSearch} />
    </S.InputContainer>
  );
};

export default DictionarySearchInput;
