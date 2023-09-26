import * as S from './DictionaryResult.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import DictionarySearchInput from 'components/features/DictionarySearchInput/DictionarySearchInput';
import { userApis } from 'hooks/api/userApis';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import axios from 'axios';

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

  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get(
        `http://api.seibro.or.kr/openapi/service/FnTermSvc/getFinancialTermMeaning?serviceKey=r4nr%2BOHhRKhV2p9x4wWuxWYt01cfJaDJwuuTY36rRa%2FFDbQ3i%2BljBAUvLlX0Th0BFs97KYUWD1J4Jgdq%2B3UkKw%3D%3D&term=기`
      )
      .then((res) => {
        console.log(res);
        // console.log(
        //   res.data.response.body.items.item[0].ksdFnceDictDescContent
        // );
        // const rawContent = Buffer.from(
        //   res.data.response.body.items.item[0].ksdFnceDictDescContent,
        //   'binary'
        // );
        // const rawContent =
        //   res.data.response.body.items.item[0].ksdFnceDictDescContent;
        const rawContent = res.data.response.body.items.item[0];
        console.log(rawContent);
        const decodedContent = iconv.decode(rawContent, 'euc-kr');
        console.log(decodedContent);

        // 데이터 상태 변수에 디코딩한 내용 설정
        setData(decodedContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchWord]);

  return (
    <S.Container>
      <S.Title>'{searchWord}'로 검색한 결과</S.Title>
      <DictionarySearchInput
        props={{ onChangeText, handleEnter, handleSearch, setText }}
      />
      <S.ResultContainer>
        <S.ResultInnerContainer theme={theme}>{data}</S.ResultInnerContainer>
      </S.ResultContainer>
    </S.Container>
  );
};

export default DictionaryResult;
