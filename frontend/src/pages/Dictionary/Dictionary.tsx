import * as S from './Dictionary.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from 'assets/JazzLogo.png';

import DictionarySearchInput from 'components/features/DictionarySearchInput/DictionarySearchInput';
import { Link } from 'react-router-dom';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

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

  const toHome = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <Enlarge>
        <S.Img src={Logo} onClick={toHome} />
      </Enlarge>
      <S.SearchInput theme={theme}>
        <DictionarySearchInput
          props={{ onChangeText, handleEnter, handleSearch, setText }}
        />
      </S.SearchInput>
    </S.Container>
  );
};

export default Dictionary;
