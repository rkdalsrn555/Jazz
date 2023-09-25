import * as S from './DictionaryResult.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import DictionarySearchInput from 'components/features/DictionarySearchInput/DictionarySearchInput';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DictionaryResult = () => {
  const theme: themeProps = useTheme();
  // 검색어임 이거 이용해서 api로 검색어 결과 가져와야 함
  const { searchWord } = useParams<{ searchWord: string }>();
  const navigate = useNavigate();

  const [text, setText] = useState<String>(`${searchWord}`);

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
      <S.Title>'{searchWord}'로 검색한 결과</S.Title>
      <DictionarySearchInput
        props={{ onChangeText, handleEnter, handleSearch, setText }}
      />
      <S.ResultContainer>
        <S.ResultInnerContainer theme={theme}></S.ResultInnerContainer>
      </S.ResultContainer>
    </S.Container>
  );
};

export default DictionaryResult;
