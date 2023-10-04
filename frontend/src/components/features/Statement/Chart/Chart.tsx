import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';
import { ChartCoordinateType, ChartDataType, Serie } from 'types/types';
import * as S from './Chart.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

const Chart = ({ data }: { data: ChartDataType[] }) => {
  const theme: themeProps = useTheme();

  // 총 자본 그래프
  const totalAssetGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        const length = element.totalAssets.toString().length;
        let one = 1;
        for (let i = 0; i < length; i++) {
          one = one * 10;
        }
        return element.totalAssets / one;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 자본',
      color: 'hsl(199, 70%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

  // 총 자산 그래프
  const totalCapitalGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        const length = element.totalCapital.toString().length;
        let one = 1;
        for (let i = 0; i < length; i++) {
          one *= 10;
        }
        return element.totalCapital / one;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 자산',
      color: 'hsl(117, 70%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };
  // 총 포괄손익 그래프
  const totalIncomeGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        const length = element.totalComprehensiveIncome.toString().length;
        let one = 1;
        for (let i = 0; i < length; i++) {
          one *= 10;
        }
        return element.totalComprehensiveIncome / one;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 포괄손익',
      color: 'hsl(37.87709497206704, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };
  // 총 부채 그래프
  const totalDebtGraph = () => {
    const Coordinate: ChartCoordinateType[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const convertedVal = () => {
        const length = element.totalDebt.toString().length;
        let one = 1;
        for (let i = 0; i < length; i++) {
          one *= 10;
        }
        return element.totalDebt / one;
      };
      Coordinate.push({ x: element.pointTimeName, y: convertedVal() });
    }
    const returnValue: Serie = {
      id: '총 부채',
      color: 'hsl(301.00558659217876, 70.19607843137256%, 50%)',
      data: Coordinate,
    };
    return returnValue;
  };

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
        data={[
          totalAssetGraph(),
          totalCapitalGraph(),
          totalDebtGraph(),
          totalIncomeGraph(),
        ]}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
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
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
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
