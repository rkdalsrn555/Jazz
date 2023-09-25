import * as S from './Dictionary.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import DictionarySearchInput from 'components/features/DictionarySearchInput/DictionarySearchInput';

const Dictionary = () => {
  const theme: themeProps = useTheme();
  const navigate = useNavigate();

  const [text, setText] = useState<String>('');

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSearch = () => {
    if (text === '') {
      alert('검색어를 입력해주세요');
    } else {
      navigate(`/dictionaryResult/${text}`);
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.Container>
      <S.Title>금융 단어 검색</S.Title>
      <DictionarySearchInput
        props={{ onChangeText, handleEnter, handleSearch, setText }}
      />
    </S.Container>
  );
};

export default Dictionary;
