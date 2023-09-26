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
// import useJsonP from 'use-jsonp';
import jsonp from 'jsonp';
import useJsonP from 'use-jsonp';

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

  const getDefinition = async () => {
    await jsonp(
      `openapi/service/FnTermSvc/getFinancialTermMeaning?serviceKey=r4nr%2BOHhRKhV2p9x4wWuxWYt01cfJaDJwuuTY36rRa%2FFDbQ3i%2BljBAUvLlX0Th0BFs97KYUWD1J4Jgdq%2B3UkKw%3D%3D&term=기`,
      (err, data) => {
        console.log(data);
      }
    );
  };

  const jsonNow = useJsonP({
    url: 'openapi/service/FnTermSvc/getFinancialTermMeaning?serviceKey=r4nr%2BOHhRKhV2p9x4wWuxWYt01cfJaDJwuuTY36rRa%2FFDbQ3i%2BljBAUvLlX0Th0BFs97KYUWD1J4Jgdq%2B3UkKw%3D%3D&term=기',
    id: '',
    callback: (res) => {
      console.log(res);
      console.log('왜 안되지');
    },
  });

  const getTest = () => {
    axios
      .get(
        // `/openapi/service/FnTermSvc/getFinancialTermMeaning?serviceKey=m5tfM2QGQ8fT91yb%2FXr%2FyglS96RS0BD4QCAL9oSMM10f4MNciyLdiHv5R8MgVDZrP08a8lJUn1htOZTEMZiGQg%3D%3D&term=기`
        `/openapi/service/FnTermSvc/getFinancialTermMeaning?serviceKey=m5tfM2QGQ8fT91yb/Xr/yglS96RS0BD4QCAL9oSMM10f4MNciyLdiHv5R8MgVDZrP08a8lJUn1htOZTEMZiGQg==&term=기`
      )
      .then((res) => {
        console.log('나는 리스펀스 데이터다!!', res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // jsonNow();
    // getDefinition();
    getTest();
    console.log(searchWord);
    //   const rawContent = data.data.response.body.items.item[0];
    //   console.log(rawContent);
    //   const decodedContent = iconv.decode(rawContent, 'euc-kr');
    //   console.log(decodedContent);
    //   // 데이터 상태 변수에 디코딩한 내용 설정
    //   setData(decodedContent);
    // };
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
