import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import { ChartCoordinateType, ChartDataType, Serie } from 'types/types';
import * as S from './Chart.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { element } from 'prop-types';

const Chart = ({
  data,
  clickedCategory,
}: {
  data: ChartDataType[];
  clickedCategory: string;
}) => {
  const theme: themeProps = useTheme();

  // 총 자본 그래프(평균 전환값)
  const convertedTotalAssetGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    const avg = () => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sum += element.totalAssets;
      }
      return sum / 5;
    };

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        return (element.totalAssets / avg()) * 100;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 자본(평균값 대비)',
      color: 'hsl(199, 70%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

  // 총 자산 그래프(평균 전환값)
  const convertedTotalCapitalGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    const avg = () => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sum += element.totalCapital;
      }
      return sum / 5;
    };
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        return (element.totalCapital / avg()) * 100;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 자산(평균값 대비)',
      color: 'hsl(117, 70%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

  // 총 포괄손익 그래프(평균 전환값)
  const convertedTotalIncomeGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];

    const avg = () => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sum += element.totalComprehensiveIncome;
      }
      return sum / 5;
    };

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        return (element.totalComprehensiveIncome / avg()) * 100;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 포괄손익(평균값 대비)',
      color: 'hsl(37.87709497206704, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

  // 총 부채 그래프(평균 전환값)
  const convertedTotalDebtGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    const avg = () => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sum += element.totalDebt;
      }
      return sum / 5;
    };
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        return (element.totalDebt / avg()) * 100;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 부채(평균값 대비)',
      color: 'hsl(301.00558659217876, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

  // 총 자산
  const totalAssetGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      Coordinate.push({ x: element.pointTimeName, y: element.totalAssets });
    }
    const returnValue: Serie = {
      id: '총 자본',
      color: 'hsl(301.00558659217876, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };
  const totalCapitalGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      Coordinate.push({ x: element.pointTimeName, y: element.totalCapital });
    }
    const returnValue: Serie = {
      id: '총 자산',
      color: 'hsl(117, 70%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };
  const totalIncomeGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      Coordinate.push({
        x: element.pointTimeName,
        y: element.totalComprehensiveIncome,
      });
    }
    const returnValue: Serie = {
      id: '총 포괄손익',
      color: 'hsl(37.87709497206704, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };
  const totalDebtGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      Coordinate.push({ x: element.pointTimeName, y: element.totalDebt });
    }
    const returnValue: Serie = {
      id: '총 부채',
      color: 'hsl(301.00558659217876, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

  const [graphData, setGraphData] = useState<Serie[]>([totalAssetGraph()]);

  useEffect(() => {
    switch (clickedCategory) {
      case 'ta':
        setGraphData([totalAssetGraph()]);
        break;
      case 'tc':
        setGraphData([totalCapitalGraph()]);
        break;
      case 'ti':
        setGraphData([totalIncomeGraph()]);
        break;
      case 'td':
        setGraphData([totalDebtGraph()]);
        break;
      case 'avg':
        setGraphData([
          convertedTotalAssetGraph(),
          convertedTotalCapitalGraph(),
          convertedTotalIncomeGraph(),
          convertedTotalDebtGraph(),
        ]);
        break;
    }
  }, [clickedCategory]);

  return (
    <S.Container theme={theme}>
      <ResponsiveLine
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 11,
                fill: theme.font.deep,
                outlineWidth: 0,
                outlineColor: 'transparent',
              },
            },
          },
          legends: {
            text: {
              fill: theme.font.deep,
              outlineWidth: 0,
              outlineColor: 'transparent',
            },
          },
        }}
        colors={{ scheme: 'dark2' }}
        data={graphData}
        margin={{ top: 50, right: 190, bottom: 50, left: 130 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'grid.line.stroke' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        areaOpacity={0}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, 0.5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </S.Container>
  );
};

export default Chart;
