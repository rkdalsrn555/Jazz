import { themeProps } from '@emotion/react';

type btnProps = {
  title: string;
  content: string;
  color: string;
  img: React.HTMLAttributes;
  width: string;
  destination: string;
  onClickEvent?: () => void;
};

type innerContainerProps = {
  title: string;
  width: string;
  height: string;
  minWidth: string;
  minHeight: string;
  backgroundColor: string;
  content: React.HTMLAttributes;
};

type profileBlockInfoProps = {
  marathon: number;
  correctRate: number;
  solved: number;
  favorite: number;
};

type companyProps = {
  id: number;
  name: string;
  totalValue: number;
  totalSale: number;
  starred: boolean;
};

type StatementType = {
  name: string;
  ref: RefObject<HTMLDivElement>;
}