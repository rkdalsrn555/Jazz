import * as S from './RenderChart.styled';
import Chart from '../Chart/Chart';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { ChartDataType } from 'types/types';
import { useEffect, useState } from 'react';

const RenderChart = ({
  CD,
  clickedCategory,
  setClickedCategory,
}: {
  CD: ChartDataType[];
  clickedCategory: string;
  setClickedCategory: (val: string) => void;
}) => {
  const theme: themeProps = useTheme();

  console.log(CD);
  const [emitting, setEmitting] = useState<string>('ta');
  const handleClick = (category: string) => {
    setEmitting(category);
    console.log('자식 클릭 핸들링 ', category);
  };
  useEffect(() => {
    setClickedCategory(emitting);
  }, [emitting]);
  return (
    <S.Container>
      <S.ChartContainer>
        <Chart data={CD} clickedCategory={clickedCategory} />
        <S.ChartSelectBottonContainer>
          <S.ChartSelectBtn theme={theme} onClick={() => handleClick('ta')}>
            총 자본 그래프
          </S.ChartSelectBtn>
          <S.ChartSelectBtn theme={theme} onClick={() => handleClick('tc')}>
            총 자산 그래프
          </S.ChartSelectBtn>
          <S.ChartSelectBtn theme={theme} onClick={() => handleClick('ti')}>
            총 포괄손익 그래프
          </S.ChartSelectBtn>
          <S.ChartSelectBtn theme={theme} onClick={() => handleClick('td')}>
            총 부채 그래프
          </S.ChartSelectBtn>
          <S.ChartSelectBtn theme={theme} onClick={() => handleClick('avg')}>
            평균 대비 전체 그래프
          </S.ChartSelectBtn>
        </S.ChartSelectBottonContainer>
      </S.ChartContainer>
    </S.Container>
  );
};

export default RenderChart;
