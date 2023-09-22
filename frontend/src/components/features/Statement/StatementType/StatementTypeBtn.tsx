import * as S from './StatementTypeBtn.styled';
import { StatementType, companyProps } from 'types/types';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Star from 'assets/img/star.png';
import Starred from 'assets/img/starred.png';
import { RefObject, forwardRef, useEffect } from 'react';

type ChildProps = {
  type: StatementType;
  handleClickType: (val: StatementType) => void;
  handleHoverType: (val: StatementType) => void;
  handleLeaveType: (val: StatementType) => void;
};

// Parent의 useRef를 받아와서 사용하기 위해서 forwardRef 사용
// 뭔지 잘 몰겠음
const StatementTypeBtn = forwardRef<HTMLDivElement, ChildProps>(
  ({ type, handleClickType, handleHoverType, handleLeaveType }, ref) => {
    const theme: themeProps = useTheme();

    const handleClick = () => {
      handleClickType(type);
    };
    const handleHover = () => {
      handleHoverType(type);
    };
    const handleLeave = () => {
      handleLeaveType(type);
    };
    return (
      <S.Container
        theme={theme}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        ref={ref}
      >
        <S.Title>{type.name}</S.Title>
      </S.Container>
    );
  }
);

export default StatementTypeBtn;
